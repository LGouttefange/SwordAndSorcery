var buttons = $('.section button');
var buttonsWithGo = buttons.filter("button[go]");
var buttonsWithoutGo = buttons.filter("button:not(button[go])");
var status = $("#status");
var currentSection = $(".section").first();
var minNumberOfWordsForDescription = 300;
var falsePseudo;
var pseudo;
var checkPoint = "wakeUp";

function updatePseudo() {

    pseudo = $("#input-real-pseudo").val();
    $("pseudo").text(pseudo);
    enableIfPseudoIsFree();
}


function playAssociatedSound() {
    audioPlayers['sound'].play($(this).attr("sound"));
}

function playSelectSound() {
    audioPlayers['sound'].play("SELECT");
}


function tryUseSelectedItem() {
    var item_key = $(this).data('item_key');
    if (item_key) {
        inventoryController.useItemByKey(item_key);
    }
}

function tryShowDescriptionOfSelectedItem() {
    var item_key = $(this).data('item_key');
    if (item_key) {
        inventoryController.showDescriptionOfItem(item_key);
    }
}


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function placeholder() {
    console.log('Function not implemented yet');
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

function showDeathBanner() {

    $('#death-banner')
        .show()
        .animate({"display": 'block'}, 0)
        .css("transform", 'scale(1.2)')
        .animate({opacity: "1"}, 3000)
        .delay(1000)
        .animate({opacity: 0}, 3000)
        .animate({"transform": 'scale(1.2)'}, 0)
    setTimeout(function () {

        $('#death-banner').css("display", 'none')
    }, 7000)
}

function hideSeb() {
    audioPlayers.music.stop();
    $("#final-boss")
        .animate({bottom: "-500px", opacity: 0}, {duration: 2000, queue: false});

}

function changeSection(nextSection) {
    currentSection.hide();
    currentSection = nextSection;
    currentSection.show();
    currentSection.find("action").trigger("doAction");
    currentSection.find("audioPlayer").trigger("play");
    currentSection.find("checkpoint").trigger("set");
}

function checkMDP() {
    mdp = $("#mdp").val();
    if (/([T/t]he)?.*[C/c]ake.*[I/i]s.*[A/a].*[L/l]ie.*/g.test(mdp))
        $("#digicode").append('<button sound="OK" onclick="gotoSection(\'ouverturePorte\')"> Ouvrir la porte ! </button>');

}
class InventoryView {
    constructor(inventory) {
        this.view = $("body > #inventory");
        this.description_elem = this.view.find(".description");
        this.inventory = inventory;
    }

    refreshView() {
        var inventoryView = this;
        var i = 0;
        $.each(this.inventory, function (index, item) {
            inventoryView.view.find(">table td:eq(" + i + ")")
                .css('background-image', "url(" + item.iconPath + ")")
                .text(item.numberOfUses);
            i++;
        })
    }

    showDescription(item) {
        this.description_elem.text(item.description);
    }

    emptyDescription() {
        this.description_elem.text("");
    }
}

class InventoryController {
    constructor(options) {
        this.view = options.view;
        this.inventory = options.inventory;
    }

    refreshActions() {
        var inventoryView = this.view;
        var i = 0;
        inventoryView.view.find("td").removeAttr('data-item_key');
        $.each(this.inventory, function (key) {
            inventoryView.view.find("td:eq(" + i + ")")
                .attr('data-item_key', key)
            i++;
        })
    }

    useItemByKey(item_key) {
        this.find(item_key).use();
        this.view.refreshView();
    }


    refreshState() {
        this.view.refreshView();
        this.refreshActions();
    }

    find(key) {
        return this.inventory[key] || null;
    }

    refill(key) {
        this.find(key).refill();
        this.refreshState();
    }

    add(item) {
        if (!item instanceof Item)
            return;
        var key = item.key;
        this.inventory[key] = item
    }

    remove(key) {
        this.inventory = this.inventory.filter(item => item !== key);
    }

    showDescriptionOfItem(item_key) {
        this.view.showDescription(this.find(item_key))
    }

    emptyDescription() {
        this.view.emptyDescription()
    }

}

class JQueryGod {
    constructor() {
        this.health = 400;
        this.nb_actions = 1;
        this.attacks = {
            'strike': function () {
                playerController.hit(40);
                sebastienBenard.scream('SIMPLE MAIS EFFICACE')
            },
            'drain': function () {
                playerController.hit(30);
                sebastienBenard.health += 10;
                sebastienBenard.scream('JE VAIS VOLER TON SANG')
            },
            'repos': function () {
                sebastienBenard.nb_actions = 1;
                sebastienBenard.scream('ALLEZ UNE PETITE PAUSE')
            },
            'qcm': function () {
                playerController.hit(player.health - 1)
                sebastienBenard.nb_actions -= 1;
                sebastienBenard.scream('PRENDS MON COUP ROUX')
            },
            'dodged': function () {
                sebastienBenard.scream('NON ! J\'AI RATE')

            }
        }
    };

    hit(damage) {
        damage = Math.floor(damage);
        this.health -= damage;
        this.showDamageTaken(damage)
    }

    healToMax() {
        this.health = 400;
    }

    scream(line) {
        $("#final-boss").find("> .dialog-box").text(line);
        setTimeout(function () {
            $("#final-boss").find("> .dialog-box").text('');
        }, 1000)
    }

    isAlive() {
        return this.health > 0;
    }

    ia_chosen_attack() {
        if (this.nb_actions == 1)
            return this.attacks['qcm'];
        else {
            var rnd_nb = Math.floor(Math.random() * 100);
            switch (true) {
                case (rnd_nb < 25):
                    return this.attacks['repos'];
                case (rnd_nb < 60):
                    return this.attacks['strike'];
                case (rnd_nb < 80):
                    return this.attacks['drain'];
                case (rnd_nb < 100):
                    return this.attacks['dodged'];
            }
        }
    };

    act() {
        this.ia_chosen_attack()();
    }

    showDamageTaken(damage) {
        $("#final-boss").find('.damage').text('-' + damage)
            .css('top', '100px')
            .css('opacity', 1)
            .animate({top: '180px', opacity: 0}, 1000);
    }

}
class Item {


    constructor(options) {
        options = options || {};
        this.key = options.key;
        this.name = options.name || "placeholder";
        this.max_use = options.max_use || 0;
        this.description = options.description;
        this.effect = options.effect || function () {
            };
        this.iconPath = Item.icon_path(options.iconName) || Item.icon_path("placeholder");
        this.numberOfUses = options.numberOfUses || options.max_use;
    }

    static icon_path(name) {
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

class QuestItem extends Item {
    constructor(options) {
        super(options);
        this.numberOfUses = "";
    }

    use() {
        this.effect()
    }
}

class Player {
    constructor(options) {
        options = options || {};
        this.name = options.name;
        this.max_health = options.max_health;
        this.health = this.max_health;
    }


}

class PlayerController {

    constructor(options) {
        this.view = options.view;
        this.player = options.player;
    }

    heal(amount) {
        this.player.health = Math.min(this.player.health + amount, this.player.max_health);
        this.refreshHealth();
    }

    healToFull() {
        this.heal(this.player.max_health);
    };

    hit(damage) {
        this.applyDamage(damage);
        this.refreshHealth();
        if (this.player.health <= 0)
            die();
        this.view.showDamageTaken(damage);
    }

    applyDamage(damage) {
        this.player.health = Math.max(this.player.health - damage, 0);
        this.refreshHealth();
    }

    setName(name) {
        this.player.name = name;
        this.view.refreshName(name)
    }

    refreshHealth() {
        this.view.refreshHealth(this.healthRatioAsPercentage());
    }

    healthRatioAsPercentage() {
        return (this.player.health / this.player.max_health) * 100;
    }

}

class PlayerView {
    constructor() {
        this.view = $("body > #player");
    }

    refreshName(name) {
        this.view.find(".name").text(name)
    }

    refreshHealth(health_ratio) {
        var view = this.view;

        view.find(".health-bar-fill").css('width', health_ratio + "%");
    }

    showDamageTaken(damage) {
        this.view.find('.damage').text('-' + damage)
            .css('top', '0px')
            .css('opacity', 1)
            .animate({top: '80px', opacity: 0}, 1000);
    }
}
function elemToAnimate() {
    return this.elem || this;
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
            .animate({bottom: "-50px"}, speed || 1000)
            .promise();
    }

    appearAndDisappear() {
        return this.goToDefaultPosition().done(this.bark);
    }

    bark() {
        var moonmoon = elemToAnimate.call(this)
            .delay(600)
            .animate({bottom: "+=50px"}, 100)
            .animate({bottom: "-=50px"}, 100)
            .delay(200)
            .promise();

        moonmoon.done(function () {
            setTimeout(function () {
                audioPlayers["moonmoon"].play("WOOF");
            }, 550);

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
            {class: name})
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
var actions = {
    "updateFalsePseudo": updateFalsePseudo,
    "setClassicTheme": setClassicTheme,
    "setGameTheme": setGameTheme,
    "newCheckpoint": newCheckpoint,
    "die": die,
    "updatePlayerNameInView": updatePlayerNameInView,
    "hit": hit,
    "showPhone": showPhone,
    "hidePhone": hidePhone,
    "showSeb": showSeb,
    "killSeb": killSeb
};

function showSeb() {
    audioPlayers.music.play("FINALBOSS");
    $("#final-boss")
        .css('opacity', 100)
        .animate({bottom: "-10px"}, 8000);
}

function killSeb() {
    audioPlayers.music.stop();
    audioPlayers.sound.play("VICTORY");
    $("#final-boss")
        .animate({bottom: "-500px", opacity: 0}, {duration: 5000, queue: false})
        .animate({left: "+=10px"})
        .animate({left: "-=10px"})
        .animate({left: "+=10px"})
        .animate({left: "-=10px"})
        .animate({left: "+=10px"})
        .animate({left: "-=10px"})
        .animate({left: "+=10px"})
        .animate({left: "-=10px"})
        .animate({left: "+=10px"})
        .animate({left: "-=10px"})
        .animate({left: "+=10px"})
        .animate({left: "-=10px"})
        .animate({left: "+=10px"})
        .animate({left: "-=10px"})
        .animate({left: "+=10px"})
        .animate({left: "-=10px"})
        .animate({left: "+=10px"})
        .animate({left: "-=10px"})

    gotoNextSection();

}

function hidePhone() {
    $("#telephone").animate({bottom: "-800px"}, 1000, 'linear')

}
function showPhone() {
    $("#telephone").animate({bottom: "-40px"}, 800)
}

function hit() {
    console.log($(this));
    playerController.hit($(this).data('damage'));
}

function updatePlayerNameInView() {
    playerController.setName($("#input-real-pseudo").val());
}

function updateFalsePseudo() {
    falsePseudo = $("#input-pseudo").val();
    $("#input-real-pseudo").val(falsePseudo);
    $("falsepseudo").text(falsePseudo);
    updatePseudo();
}

function setClassicTheme() {
    $('body').removeClass("dark-souls");
}

function setGameTheme() {
    $('body').addClass("dark-souls");
}

function newCheckpoint() {
    checkPoint = $(this).closest(".section").attr('id');
}

function die() {
    if ($(this).closest('.section').attr('id') != "death")
        gotoSection("death");
    audioPlayers.music.stop();
    moonMoon.goToDefaultPosition().done(moonMoon.waddle);
    showDeathBanner();
    hideSeb();
    sebastienBenard.healToMax();
    audioPlayers['death'].play('DEATH');

}


var interactions = {
    "loadDescription": loadDescription,
    "setPlayerSexToMale": setPlayerSexToMale,
    "setPlayerSexToFemale": setPlayerSexToFemale,
    "goToCheckpoint": goToCheckpoint,
    'checkMDP': checkMDP
};

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

function setPlayerSexToMale() {
    $("m").show();
    $("f").hide();
}

function setPlayerSexToFemale() {
    $("f").show();
    $("m").hide();
}


function goToCheckpoint() {
    console.log("DEATH");
    playerController.healToFull();
    inventoryController.refill('EST');
    inventoryController.refreshState();
    gotoSection(checkPoint);
}
var attacks = {
    "giffle": slap,
    "giffle_sensuelle": sexySlap,
    "tout_ou_rien": allOrNothing
}


function slap() {
    sebastienBenard.hit(30);
}

function allOrNothing() {
    var max_damage = 60;
    var damage = ( (player.max_health - player.health) / player.max_health ) * max_damage;
    sebastienBenard.hit(damage);
}

function sexySlap() {
    sebastienBenard.hit(20);
    playerController.heal(25);
}
$("#inventory").find("> table td")
    .click(tryUseSelectedItem)
    .mouseenter(tryShowDescriptionOfSelectedItem)
    .mouseleave(function () {
        inventoryController.emptyDescription()
    });
buttonsWithGo.click(function () {
    gotoSection($(this).attr("go"))
});

buttonsWithoutGo.click(function () {
    gotoNextSection();
});
$(".section > checkpoint").on('set', newCheckpoint);
$("input#input-pseudo").change(updateFalsePseudo);
$("input#input-real-pseudo")
    .change(updatePseudo)
    .keyup(updatePseudo);

$(".section > action").on("doAction", function () {
    actions[$(this).attr("name")].call(this);
});

$(".section > button[data-attack]").click(function () {
    $("#final-boss")
        .animate({right: "-=10px"}, 50)
        .animate({right: "+=10px"}, 50)
    attacks[$(this).data('attack')]();
    if (sebastienBenard.isAlive())
        sebastienBenard.act();
    else
        killSeb();

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

$('*[sound]').click(playAssociatedSound);
$("body > .section interaction.toggle").click(playSelectSound)

$("#description").keyup(updateWordCountOfDescription);
var inventory = {};
var moonMoon = new MoonMoon();

var player = new Player({name: 'Bertrand de Sombremort', max_health: 150});
var playerView = new PlayerView();
var playerController = new PlayerController({player: player, view: playerView});

var inventoryView = new InventoryView(inventory);
var inventoryController = new InventoryController({inventory: inventory, view: inventoryView});

var sebastienBenard = new JQueryGod();

var audioPlayers = {
    "sound": new AudioPlayer("sound"),
    "music": new AudioPlayer("music"),
    "moonmoon": new AudioPlayer("moonmoon"),
    "death": new AudioPlayer("death")
};

function healPlayer() {
    playerController.heal(70);
}

function resetMoonMoonPosition() {
    moonMoon.appearAndDisappear();
}


inventoryController.add(new RefillableItem({
    key: "EST",
    name: "Fiole d'Estus",
    description: "Les fioles d'Estus sont liées aux feux de camp. Leur utilisation permet à l'utilisateur de se soigner",
    max_use: 5,
    effect: healPlayer,
    iconName: "Estus"
}));
inventoryController.add(new QuestItem({
    key: "MOON",
    name: "Moon Moon",
    description: "Fidèle compagnon à quatre pattes. Joueur et potentiellement bruyant",
    effect: resetMoonMoonPosition,
    iconName: "moonmoon"
}));

inventoryController.add(new Item({
    key: "HOMEBONE",
    name: "Os du retour",
    description: "Os permettant de revenir au dernier feu de camp",
    max_use: 5,
    numberOfUses: 2,
    effect: goToCheckpoint,
    iconName: "homeward_bone"
}));

setPlayerSexToFemale();
updateFalsePseudo();
inventoryController.refreshState();


