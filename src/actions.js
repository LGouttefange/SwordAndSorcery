var actions = {
    "updateFalsePseudo": updateFalsePseudo,
    "setClassicTheme": setClassicTheme,
    "setGameTheme": setGameTheme,
    "newCheckpoint": newCheckpoint,
    "die": die,
    "updatePlayerNameInView": updatePlayerNameInView,
    "hit": hit
};

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
    moonMoon.goToDefaultPosition().done(moonMoon.waddle);
    gotoSection("death");
}

