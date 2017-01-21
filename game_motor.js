$(function () {

    class Item {


        constructor(options) {
            options = options || {};
            this.key = options.key;
            this.name = options.name || "placeholder";
            this.max_use = options.max_use || 0;
            this.effect = options.effect || function () {
                };
            this.iconPath = this.icon_path(options.iconName) || this.icon_path("placeholder");
            this.numberOfUses = options.numberOfUses || options.max_use;
        }

        icon_path(name) {
            return "img/icons/" + name + ".png";
        }

        use() {
            if (this.numberOfUses > 0) {
                this.effect();
                --this.numberOfUses;
            }
        }
    }

    class RefillableItem extends Item {
        refill() {
            this.numberOfUses = this.max_use;
        }
    }

    class Inventory {
        constructor() {
            this.items = {};
        }

        add(item) {
            var key = item.key;
            this.items[key] = item
        }

        remove(key) {
            this.items = this.items.filter(item => item !== key);
        }

        find(key) {
            return this.items[key] || null;
        }

    }

    function healPlayer() {
        console.log("healed for 40HP");
    }


    function elemToAnimate(){
        return this.elem ||this;
    }
    class MoonMoon {
        constructor() {
            var self = this;
            this.elem = $("#moon-moon");
            this.defaultPosition = {bottom: "-100px"};
        }

        goToDefaultPosition(speed) {
            return elemToAnimate.call(this)
                .animate({left: "20px"}, 100)
                .animate({bottom: "-50px"},speed || 1000)
                .promise();
        }

        appearAndDisappear(){
            return this.goToDefaultPosition().done(this.bark);
        }

        bark() {
            var moonmoon = elemToAnimate.call(this)
                .delay(600)
                .animate({bottom: "+=50px"}, 100)
                .animate({bottom: "-=50px"}, 100)
                .delay(200)
                .promise();

            moonmoon.done(function(){
                audioPlayers["moonmoon"].play("WOOF");

                this
                .animate({bottom: "-500px"})
                .promise();

            }.call(this));
            return moonmoon;
        }

        waddle() {
            elemToAnimate.call(this)
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
            this.stop();
            this.$elem.attr('src', this.srcFromfileName(src))
            this.elem.load();
            this.elem.play();
        }

        stop() {
            this.elem.pause();
            this.elem.currentTime = 0;
        }

        srcFromfileName(src) {
            return "audio/" + this.name + "/" + src + ".mp3";
        }
    }

    class InventoryView {
        constructor(inventory) {
            this.view = $("body > #inventory > table");
            this.inventory = inventory;
        }

        refreshView() {
            var inventoryView = this;
            var items = this.inventory.items;
            var i = 0;
            $.each(items, function (index, item) {
                inventoryView.view.find("td:eq(" + i + ")")
                    .css('background-image', "url(" + item.iconPath + ")")
                    .text(item.numberOfUses)
                i++;
            })
        }
    }

    class InventoryController {
        constructor(options) {
            this.view = options.view;
            this.inventory = options.inventory;
        }

        refreshActions() {
            var inventoryView = this.view;
            var items = this.inventory.items;
            var i = 0;
            inventoryView.view.find("td").removeAttr('data-item_key');
            $.each(items, function (key) {
                inventoryView.view.find("td:eq(" + i + ")")
                    .attr('data-item_key', key)
                i++;
            })
        }

        useItemByKey(item_key) {
            this.find(item_key).use();
            this.view.refreshView();
        }

        refreshState(){
            this.view.refreshView();
            this.refreshActions();
        }

        find(key){
            return this.inventory.items[key] || null;
        }

        refill(key) {
            this.find(key).refill();
            this.refreshState();
        }
    }

    var inventory = new Inventory();

    inventory.add(new RefillableItem({
        key: "EST",
        name: "Fiole d'Estus",
        max_use: 5,
        effect: healPlayer,
        iconName: "Estus"
    }));

    var moonMoon = new MoonMoon();

    function resetMoonMoonPosition() {
        moonMoon.appearAndDisappear();
    }

    inventory.add(new Item({
        key:"MOON",
        name: "Moon Moon",
        max_use: 99,
        effect: resetMoonMoonPosition,
        iconName: "moonmoon"
    }));


    var inventoryView = new InventoryView(inventory);
    var inventoryController = new InventoryController({inventory: inventory, view: inventoryView});
    inventoryController.refreshActions();
    inventoryView.refreshView();

    var buttons = $('.section button');
    var buttonsWithGo = buttons.filter("button[go]");
    var buttonsWithoutGo = buttons.filter("button:not(button[go])");
    var status = $("#status");
    var currentSection = $(".section").first();
    var moonMoon = new MoonMoon();
    var minNumberOfWordsForDescription = 300;
    var falsePseudo;
    var pseudo;
    var checkPoint = "wakeUp"
    var actions = {
        "updateFalsePseudo": updateFalsePseudo,
        "setClassicTheme": setClassicTheme,
        "setGameTheme": setGameTheme,
        "newCheckpoint": newCheckpoint,
        "die": die
    };

    var interactions = {
        "loadDescription": loadDescription,
        "setPlayerSexToMale": setPlayerSexToMale,
        "setPlayerSexToFemale": setPlayerSexToFemale,
        "goToCheckpoint": goToCheckpoint
    };

    var audioPlayers = {
        "sound": new AudioPlayer("sound"),
        "music": new AudioPlayer("music"),
        "moonmoon": new AudioPlayer("moonmoon")
    };

    function newCheckpoint() {
        checkPoint = $(this).closest(".section").attr('id');
        console.log(checkPoint);
    }


    function goToCheckpoint() {
        inventoryController.refill('EST');
        inventoryController.refreshState();
        gotoSection(checkPoint);
    }


    function playAssociatedSound() {
        audioPlayers['sound'].play($(this).attr("sound"));
    }

    function playSelectSound() {
        audioPlayers['sound'].play("SELECT");
    }

    $('*[sound]').click(playAssociatedSound);
    $("body > .section interaction.toggle").click(playSelectSound)

    buttonsWithGo.click(function () {
        gotoSection($(this).attr("go"))
    });

    buttonsWithoutGo.click(function () {
        gotoNextSection();
    });
    $(".section > checkpoint").on('set', newCheckpoint)
    $("input#input-pseudo").change(updateFalsePseudo);
    $("input#input-real-pseudo")
        .change(updatePseudo)
        .keydown(updatePseudo);

    $(".section > action").on("doAction", function () {
        actions[$(this).attr("name")]();
    });

    $(".section interaction").click(function () {
        interactions[$(this).data("action")]();
    });
    $(".section interaction.toggle").click(toggleActiveInteraction);

    $(".section audioplayer").on('play', function () {
            var audioPlayer = audioPlayers[$(this).attr("name")];
        if ($(this).text() === "stop")
                audioPlayer.stop();
            else
                audioPlayer.play($(this).text())
        }
    );
    function tryUseSelectedItem() {
        var item_key = $(this).data('item_key');
        if (item_key) {
            inventoryController.useItemByKey(item_key);
        }
    }

    $("#inventory > table td").click(tryUseSelectedItem)


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


    function die() {
        moonMoon.goToDefaultPosition().done(moonMoon.waddle);
        gotoSection("death");
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
        currentSection.find("checkpoint").trigger("set");
    }

    $(".section +.section").hide();
    setPlayerSexToFemale();
    updateFalsePseudo();

});