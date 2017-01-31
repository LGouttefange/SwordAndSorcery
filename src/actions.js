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
        .css('background-image', 'url(img/themes/darksouls/demoniaque.png)')
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

