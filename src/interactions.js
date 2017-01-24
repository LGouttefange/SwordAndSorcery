var interactions = {
    "loadDescription": loadDescription,
    "setPlayerSexToMale": setPlayerSexToMale,
    "setPlayerSexToFemale": setPlayerSexToFemale,
    "goToCheckpoint": goToCheckpoint
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
    inventoryController.refill('EST');
    inventoryController.refreshState();
    gotoSection(checkPoint);
}