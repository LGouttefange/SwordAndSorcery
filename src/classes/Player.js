class Player {
    constructor(options) {
        options = options || {};
        this.name = options.name;
        this.max_health = options.max_health;
        this.health = this.max_health;
    }

    heal(amount) {
        this.health = Math.min(this.health + amount, this.max_health);
    }

    hit(damage) {
        this.applyDamage(damage);
        if (this.health <= 0)
            this.die();
    }

    applyDamage(damage) {
        this.health = Math.max(this.health - damage, 0);
    }
}