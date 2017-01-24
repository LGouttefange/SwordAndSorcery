function elemToAnimate() {
    return this.elem || this;
}

class MoonMoon {
    constructor() {
        var self = this;
        this.elem = $("#moon-moon");
        this.defaultPosition = {bottom: "-100px"};
    }

    goToDefaultPosition(speed) {
        return elemToAnimate.call(this)
            .animate({left: "20px"}, 100)
            .animate({bottom: "-50px"}, speed || 1000)
            .promise();
    }

    appearAndDisappear() {
        return this.goToDefaultPosition().done(this.bark);
    }

    bark() {
        var moonmoon = elemToAnimate.call(this)
            .delay(600)
            .animate({bottom: "+=50px"}, 100)
            .animate({bottom: "-=50px"}, 100)
            .delay(200)
            .promise();

        moonmoon.done(function () {
            setTimeout(function () {
                audioPlayers["moonmoon"].play("WOOF");
            }, 550);

            this
                .animate({bottom: "-500px"})
                .promise();

        }.call(this));
        return moonmoon;
    }

    waddle() {
        elemToAnimate.call(this)
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


}