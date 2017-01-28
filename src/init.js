var inventory = {};
var moonMoon = new MoonMoon();

var player = new Player({name: 'Bertrand de Sombremort', max_health: 150});
var playerView = new PlayerView();
var playerController = new PlayerController({player: player, view: playerView});

var inventoryView = new InventoryView(inventory);
var inventoryController = new InventoryController({inventory: inventory, view: inventoryView});

var audioPlayers = {
    "sound": new AudioPlayer("sound"),
    "music": new AudioPlayer("music"),
    "moonmoon": new AudioPlayer("moonmoon"),
    "death": new AudioPlayer("death")
};

function healPlayer() {
    playerController.heal(40);
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
    iconName: "moonmoon"
}));

setPlayerSexToFemale();
updateFalsePseudo();
inventoryController.refreshState();


