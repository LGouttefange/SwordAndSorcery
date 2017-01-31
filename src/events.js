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