namespace AdLunam {
    interface Sounds {
        [id: string]: HTMLAudioElement;
    }
    export class Sound {
        public static muted: boolean = false;
        private static sounds: Sounds = {};
    
        public static init(): void {
            let audioElements: NodeListOf<HTMLAudioElement> = document.querySelectorAll("audio");
            for (let element of audioElements)
            Sound.sounds[element.id] = element;    
        }
    
        public static play(_id: string): void {
            if (!this.muted)
                Sound.sounds[_id].play();
        }
    
        public static playMusic(): void {
            Sound.sounds["music"].loop = true;
            Sound.sounds["music"].play();
            Sound.sounds["music"].volume = 0.2;
        }

        public static pauseMusic(): void {
            Sound.sounds["music"].pause();
        }
        public static continueMusic(): void {
            Sound.sounds["music"].play();
        }
      }
}