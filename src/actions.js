var actions = {
    "updateFalsePseudo": updateFalsePseudo,
    "setClassicTheme": setClassicTheme,
    "setGameTheme": setGameTheme,
    "newCheckpoint": newCheckpoint,
    "die": die
};


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
    console.log(checkPoint);
}

function die() {
    moonMoon.goToDefaultPosition().done(moonMoon.waddle);
    gotoSection("death");
}

