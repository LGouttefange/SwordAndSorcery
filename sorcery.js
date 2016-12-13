$(function () {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

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

    var DEFAULT_LIFE = 3;

    var life;
    var buttons = $('.section button')
    var buttonsWithGo = buttons.filter("button[go]");
    var buttonsWithoutGo = buttons.filter("button:not(button[go])");
    var status = $("#status");
    var currentSection = $(".section").first();
    var actionsHistory = [];
    var moonMoon = new MoonMoon();
    var minNumberOfWordsForDescription = 300;
    var actions = {
        "hit": loseOneLife,
        "reset": resetGame,
        "start": startGame
    };


    buttonsWithGo.click(function () {
        gotoSection($(this).attr("go"))
    });
    buttonsWithoutGo.click(function () {
        gotoNextSection();
    });

    $(".section > action").on("doAction", function () {
        actions[$(this).attr("name")]();
    });


    $("#description").keydown(function () {
        var numberOfWordsOfDescription = minNumberOfWordsForDescription - numberOfWords($(this).val());
        $("#compteur-mots").text(numberOfWordsOfDescription)
        if (numberOfWordsOfDescription <= 0)
            $(this).closest('.section').find('button').removeAttr('disabled');
        ;
    });

    function numberOfWords(str) {
        return str.split(' ').length;
    }

    function changeSection(nextSection) {
        currentSection.hide();
        currentSection = nextSection;
        currentSection.show();
        currentSection.find("action").trigger("doAction");
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


    $(".section +.section").hide();


});