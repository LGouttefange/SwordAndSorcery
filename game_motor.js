$(function () {



    class MoonMoon {
        constructor() {
            self = this;
            this.elem = $("#moon-moon");
            this.defaultPosition = {bottom: "-100px"};
            this.elem.animate(this.defaultPosition, 1000, function (e) {
                self.waddle();
            })
        }

        goToDefaultPosition(speed) {
            this.elem.animate({bottom: "-50px"}, speed || 1000);
        }

        bark() {
            this.elem
                .animate(this.defaultPosition, 200)
                .animate({bottom: "-50px"}, 200);
        }

        waddle() {
            self = this.elem;
            this.elem
                .animate({bottom: "-=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "+=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "-=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "+=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "-=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "+=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "-=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "+=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "-=30px", left: "+=50px"}, 100, 'linear')
                .delay(1000)
                .animate({bottom: "-=400px", left: "+=50px"}, 500, 'linear')
                .promise();
        }

        startRandomBarks() {
            self = this; //for animate callback
            this.bark();
            setTimeout(function () {
                self.startRandomBarks(200)
            }, getRandomInt(4000, 6000));
        }
    }

    class AudioPlayer {

        constructor(name) {
            this.name = name;
            this.$elem = AudioPlayer.newAudioElement(name);
            this.elem = this.$elem[0]; //objet JS classique pour les fonctions play/stop
        }


        static newAudioElement(name) {
            return $("<audio/>",
                {id: name})
                .prependTo($('body'));

        }

        play(src) {
            this.$elem.attr('src', this.srcFromfileName(src))
            this.elem.play();
        }

        srcFromfileName(src) {
            return "audio/" + this.name + "/" + src + ".mp3";
        }
    }


    var life;
    var buttons = $('.section button')
    var buttonsWithGo = buttons.filter("button[go]");
    var buttonsWithoutGo = buttons.filter("button:not(button[go])");
    var status = $("#status");
    var currentSection = $(".section").first();
    var actionsHistory = [];
    var moonMoon = new MoonMoon();
    var minNumberOfWordsForDescription = 300;
    var falsePseudo;
    var pseudo;
    var DEFAULT_LIFE = 3;
    var actions = {
        "hit": loseOneLife,
        "reset": resetGame,
        "start": startGame,
        "updateFalsePseudo": updateFalsePseudo,
        "setClassicTheme": setClassicTheme,
        "setGameTheme": setGameTheme
    };

    var interactions = {
        "loadDescription": loadDescription,
        "setPlayerSexToMale": setPlayerSexToMale,
        "setPlayerSexToFemale": setPlayerSexToFemale
    };
    var audioPlayers = {
        "sound": new AudioPlayer("sound"),
        "music": new AudioPlayer("music")
    };


    buttonsWithGo.click(function () {
        gotoSection($(this).attr("go"))
    });
    buttonsWithoutGo.click(function () {
        gotoNextSection();
    });
    $("input#input-pseudo").change(updateFalsePseudo);
    $("input#input-real-pseudo").change(updatePseudo);

    $(".section > action").on("doAction", function () {
        actions[$(this).attr("name")]();
    });

    $(".section interaction").click(function () {
        interactions[$(this).data("action")]();
    });
    $(".section interaction.toggle").click(toggleActiveInteraction);

    $(".section audioplayer").on('play', function () {
            audioPlayers[$(this).attr("name")].play($(this).text())
        }
    );

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }


    function setClassicTheme() {
        $('body').removeClass("dark-souls");
    }

    function setGameTheme() {
        $('body').addClass("dark-souls");
    }

    function placeholder() {
        console.log('Function not implemented yet');
    }

    function setPlayerSexToMale() {
        $("m").show();
        $("f").hide();
    }

    function setPlayerSexToFemale() {
        $("f").show();
        $("m").hide();
    }


    function enableIfPseudoIsFree() {
        var inputPseudo = $("#input-real-pseudo");
        var pseudoIsNotFree = pseudo === falsePseudo;
        inputPseudo.closest(".section").find("button").attr('disabled', pseudoIsNotFree);
        if (pseudoIsNotFree)
            inputPseudo.addClass("invalid");
        else
            inputPseudo.removeClass("invalid");
    }

    function updatePseudo() {

        pseudo = $("#input-real-pseudo").val();
        $("pseudo").text(pseudo);
        enableIfPseudoIsFree();
    }

    function updateFalsePseudo() {
        falsePseudo = $("#input-pseudo").val();
        $("#input-real-pseudo").val(falsePseudo);
        $("falsepseudo").text(falsePseudo);
        updatePseudo();
    }


    function toggleActiveInteraction() {
        $(this).parent().children("interaction.toggle").removeClass("active");
        $(this).addClass("active");
    }


    function updateWordCountOfDescription() {

        var numberOfWordsOfDescription = minNumberOfWordsForDescription - numberOfWords($("#description").val());
        $("#compteur-mots").text(numberOfWordsOfDescription);
        if (numberOfWordsOfDescription <= 0)
            $("#description").closest('.section').find('button').removeAttr('disabled');
    }

    $("#description").keydown(updateWordCountOfDescription);

    function loadDescription() {

        $(this).remove();

        $("#description")
            .attr("disabled", true);
        $.ajax("description")
            .done(function (texte) {
                $("#description").val(texte);
                updateWordCountOfDescription();
            })
    }

    function numberOfWords(str) {
        return str.split(' ').length;
    }


    function gotoSection(key) {
        var nextSection = $("#" + key);
        changeSection(nextSection);
    }

    function gotoNextSection() {
        changeSection(currentSection.next());
    }

    function getLife() {
        return life;
    }

    function resetLife() {
        life = DEFAULT_LIFE;
        displayLife();
    }

    function playerIsDead() {
        return life <= 0;
    }

    function loseOneLife() {
        life--;
        displayLife();
        if (playerIsDead())
            endGame();
    }

    function startGame() {
        resetLife();
        displayLife();
    }

    function resetGame() {
        resetLife();
        gotoSection("wakeUp");
    }

    function endGame() {
        gotoSection("death");
        console.log(actionsHistory);
    }


    function displayLife() {
        status.find("> .life > .value").text(life);
    }


    function changeSection(nextSection) {
        currentSection.hide();
        currentSection = nextSection;
        currentSection.show();
        currentSection.find("action").trigger("doAction");
        currentSection.find("audioPlayer").trigger("play");
    }

    $(".section +.section").hide();
    setPlayerSexToFemale();
    updateFalsePseudo();

});