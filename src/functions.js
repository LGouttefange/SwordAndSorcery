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