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