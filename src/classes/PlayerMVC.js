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
}