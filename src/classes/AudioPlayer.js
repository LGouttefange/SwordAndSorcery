class AudioPlayer {

    constructor(name) {
        this.name = name;
        this.$elem = AudioPlayer.newAudioElement(name);
        this.elem = this.$elem[0]; //objet JS classique pour les fonctions play/stop
    }


    static newAudioElement(name) {
        return $("<audio/>",
            {id: name})
            .prependTo($('body'));

    }

    play(src) {
        this.stop();
        this.$elem.attr('src', this.srcFromfileName(src))
        this.elem.load();
        this.elem.play();
    }

    stop() {
        this.elem.pause();
        this.elem.currentTime = 0;
    }

    srcFromfileName(src) {
        return "audio/" + this.name + "/" + src + ".mp3";
    }
}