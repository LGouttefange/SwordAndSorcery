var actions = {
    "updateFalsePseudo": updateFalsePseudo,
    "setClassicTheme": setClassicTheme,
    "setGameTheme": setGameTheme,
    "newCheckpoint": newCheckpoint,
    "die": die,
    "updatePlayerNameInView": updatePlayerNameInView,
    "hit": hit,
    "showPhone": showPhone,
    "hidePhone": hidePhone
};
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
    gotoSection("death");
    moonMoon.goToDefaultPosition().done(moonMoon.waddle);
    showDeathBanner();
    audioPlayers['death'].play('DEATH');
    gotoSection("death");

}

