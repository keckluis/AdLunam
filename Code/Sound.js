"use strict";
var AdLunam;
(function (AdLunam) {
    class Sound {
        static init() {
            let audioElements = document.querySelectorAll("audio");
            for (let element of audioElements)
                Sound.sounds[element.id] = element;
            Sound.sounds["jump"].volume = 0.2;
        }
        static play(_id) {
            if (!this.muted)
                Sound.sounds[_id].play();
        }
        static playMusic() {
            Sound.sounds["music"].loop = true;
            Sound.sounds["music"].play();
            Sound.sounds["music"].volume = 0.2;
        }
        static pauseMusic() {
            Sound.sounds["music"].pause();
        }
        static continueMusic() {
            Sound.sounds["music"].play();
        }
    }
    Sound.muted = false;
    Sound.sounds = {};
    AdLunam.Sound = Sound;
})(AdLunam || (AdLunam = {}));
//# sourceMappingURL=Sound.js.map