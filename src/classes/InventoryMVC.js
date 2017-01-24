class InventoryView {
    constructor(inventory) {
        this.view = $("body > #inventory");
        this.description_elem = this.view.find(".description");
        this.inventory = inventory;
    }

    refreshView() {
        var inventoryView = this;
        var i = 0;
        $.each(this.inventory, function (index, item) {
            inventoryView.view.find(">table td:eq(" + i + ")")
                .css('background-image', "url(" + item.iconPath + ")")
                .text(item.numberOfUses);
            i++;
        })
    }

    showDescription(item) {
        this.description_elem.text(item.description);
    }

    emptyDescription() {
        this.description_elem.text("");
    }
}

class InventoryController {
    constructor(options) {
        this.view = options.view;
        this.inventory = options.inventory;
    }

    refreshActions() {
        var inventoryView = this.view;
        var i = 0;
        inventoryView.view.find("td").removeAttr('data-item_key');
        $.each(this.inventory, function (key) {
            inventoryView.view.find("td:eq(" + i + ")")
                .attr('data-item_key', key)
            i++;
        })
    }

    useItemByKey(item_key) {
        this.find(item_key).use();
        this.view.refreshView();
    }


    refreshState() {
        this.view.refreshView();
        this.refreshActions();
    }

    find(key) {
        return this.inventory[key] || null;
    }

    refill(key) {
        this.find(key).refill();
        this.refreshState();
    }

    add(item) {
        if (!item instanceof Item)
            return;
        var key = item.key;
        this.inventory[key] = item
    }

    remove(key) {
        this.inventory = this.inventory.filter(item => item !== key);
    }

    showDescriptionOfItem(item_key) {
        this.view.showDescription(this.find(item_key))
    }

    emptyDescription() {
        this.view.emptyDescription()
    }

}
