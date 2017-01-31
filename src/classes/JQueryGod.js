class JQueryGod {
    constructor() {
        this.health = 400;
        this.nb_actions = 1;
        this.attacks = {
            'strike': function () {
                playerController.hit(40);
                sebastienBenard.scream('SIMPLE MAIS EFFICACE')
            },
            'drain': function () {
                playerController.hit(30);
                sebastienBenard.health += 10;
                sebastienBenard.scream('JE VAIS VOLER TON SANG')
            },
            'repos': function () {
                sebastienBenard.nb_actions = 1;
                sebastienBenard.scream('ALLEZ UNE PETITE PAUSE')
            },
            'qcm': function () {
                playerController.hit(player.health - 1)
                sebastienBenard.nb_actions -= 1;
                sebastienBenard.scream('PRENDS MON COUP ROUX')
            },
            'dodged': function () {
                sebastienBenard.scream('NON ! J\'AI RATE')

            }
        }
    };

    hit(damage) {
        damage = Math.floor(damage);
        this.health -= damage;
        this.showDamageTaken(damage)
    }

    healToMax() {
        this.health = 400;
    }

    scream(line) {
        $("#final-boss").find("> .dialog-box").text(line);
        setTimeout(function () {
            $("#final-boss").find("> .dialog-box").text('');
        }, 1000)
    }

    isAlive() {
        return this.health > 0;
    }

    ia_chosen_attack() {
        if (this.nb_actions == 1)
            return this.attacks['qcm'];
        else {
            var rnd_nb = Math.floor(Math.random() * 100);
            switch (true) {
                case (rnd_nb < 25):
                    return this.attacks['repos'];
                case (rnd_nb < 60):
                    return this.attacks['strike'];
                case (rnd_nb < 80):
                    return this.attacks['drain'];
                case (rnd_nb < 100):
                    return this.attacks['dodged'];
            }
        }
    };

    act() {
        this.ia_chosen_attack()();
    }

    showDamageTaken(damage) {
        $("#final-boss").find('.damage').text('-' + damage)
            .css('top', '100px')
            .css('opacity', 1)
            .animate({top: '180px', opacity: 0}, 1000);
    }

}