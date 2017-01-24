class Item {


    constructor(options) {
        options = options || {};
        this.key = options.key;
        this.name = options.name || "placeholder";
        this.max_use = options.max_use || 0;
        this.description = options.description;
        this.effect = options.effect || function () {
            };
        this.iconPath = Item.icon_path(options.iconName) || Item.icon_path("placeholder");
        this.numberOfUses = options.numberOfUses || options.max_use;
    }

    static icon_path(name) {
        return "img/icons/" + name + ".png";
    }

    use() {
        if (this.numberOfUses > 0) {
            this.effect();
            --this.numberOfUses;
        }
    }
}

class RefillableItem extends Item {
    refill() {
        this.numberOfUses = this.max_use;
    }
}

class QuestItem extends Item {
    constructor(options) {
        super(options);
        this.numberOfUses = "";
    }

    use() {
        this.effect()
    }
}
