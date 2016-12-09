$(function () {
    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    class MoonMoon {
        constructor() {
            self = this;
            this.elem = $("#moon-moon");
            this.defaultPosition = {bottom: "-100px"};
            this.elem.animate(this.defaultPosition, 1000, function (e) {
                self.waddle();
            })
        }

        goToDefaultPosition(speed) {
            this.elem.animate({bottom: "-50px"}, speed || 1000);
        }

        bark() {
            this.elem
                .animate(this.defaultPosition, 200)
                .animate({bottom: "-50px"}, 200);
        }

        waddle() {
            self = this.elem;
            this.elem
                .animate({bottom: "-=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "+=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "-=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "+=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "-=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "+=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "-=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "+=30px", left: "+=50px"}, 100, 'linear')
                .animate({bottom: "-=30px", left: "+=50px"}, 100, 'linear')
                .delay(1000)
                .animate({bottom: "-=400px", left: "+=50px"}, 500, 'linear')
                .promise();
        }

        startRandomBarks() {
            self = this; //for animate callback
            this.bark();
            setTimeout(function () {
                self.startRandomBarks(200)
            }, getRandomInt(4000, 6000));
        }
    }

    var DEFAULT_LIFE = 3;

    var life;
    var buttons = $(".section button");
    var status = $("#status");
    var currentSection = $(".section").first();
    var actionsHistory = [];
    var moonMoon = new MoonMoon();
    var actions = {
        "hit": loseOneLife,
        "reset": resetGame,
        "start": startGame
    };

    function initActionsList() {
        actions["hit"] = loseOneLife;
        actions["start"] = startGame;
        actions["reset"] = resetGame;
    }

    initActionsList();


    buttons.click(function () {
        gotoSection($(this).attr("go"))
    });

    $(".section > action").on("doAction", function () {
        actions[$(this).attr("name")]();
    });
    $(".section > action[name='reset']").on("doAction", resetGame);
    $(".section > action[name='start']").on("doAction", startGame);


    function gotoSection(key) {
        currentSection.hide();
        currentSection = $("#" + key);
        actionsHistory.push(currentSection.contents().first().text().replace(/(\r\n|\n|\r)/gm, ""));
        currentSection.show();
        currentSection.find("action").trigger("doAction");
    }

    function getLife() {
        return life;
    }

    function resetLife() {
        life = DEFAULT_LIFE;
        displayLife();
    }

    function playerIsDead() {
        return life <= 0;
    }

    function loseOneLife() {
        life--;
        displayLife();
        if (playerIsDead())
            endGame();
    }

    function startGame() {
        displayLife();
        resetLife();
    }

    function resetGame() {
        resetLife();
        gotoSection("wakeUp");
    }

    function endGame() {
        gotoSection("death");
        console.log(actionsHistory);
    }


    function displayLife() {
        status.find("> .life > .value").text(life);
    }


    $(".section +.section").hide();


});