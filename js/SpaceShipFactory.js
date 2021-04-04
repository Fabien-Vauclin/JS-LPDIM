/**
 *
 * Permet de créer des vaisseaux spatiaux de la
 * résistance ou de l'empire
 *
 * @class SpaceShipFactory
 */
function SpaceShipFactory() {

    /** @type {HTMLImageElement[]} */
    this.spaceShipsLight = [];

    /** @type {HTMLImageElement[]} */
    this.spaceShipsDark = [];

    /** @type {HTMLAudioElement} */
    this.sound = null;

    /** @type {HTMLVideoElement} */
    this.video = null;

    /** @type {HTMLImageElement} */
    this.cockpit = null;

    /** @type {this} */
    let self = this;

    /**
     * Permet de créer les vaisseaux (image)
     * 
     * @type {string} type - Valeurs attendues : 'light' ou 'dark'
     * @type {number} number - Nombre de vaisseaux à générer
     * @returns {this}
     */
    this.create = function (type, number) {
        for (let i = 0; i < number; i++) {

            let img = document.createElement('img');
            img.classList.add('spaceship');
            if (type === 'light') {
                img.src = 'img/battleship.svg';
                img.classList.add('light');
                this.spaceShipsLight.push(img)
            } else {
                img.src = 'img/aircraft.svg';
                img.classList.add('dark');
                this.spaceShipsDark.push(img)
            }

            document.body.appendChild(img)
        }

        return this
    };

    /**
     * Lancer la séquence d'animation spatiale
     * 
     * @returns {this}
     */
    this.animate = function () {
        if (this.sound) {
            this.sound.currentTime = 0;
            this.sound.play()
        }

        gsap.timeline()
            .to(this.spaceShipsLight, { top: "-100px", left: "100%", duration: 1, ease: Power2.easeInOut })
            .set(this.spaceShipsLight, { clearProps: 'all' });

        gsap.timeline({
            onComplete: function () {
                try {
                    self.video.pause();
                    self.video.style.opacity = '0'
                } catch (e) { }
            }
        })
            .to(this.spaceShipsDark, { delay: .25, top: "-100px", left: "100%", duration: 1, stagger: .2, ease: Power2.easeInOut })
            .set(this.spaceShipsDark, { clearProps: 'all' });

        return this
    };

    /**
     * Joue la vidéo du voyage vitesse lumière
     * 
     * @returns {this}
     */
    this.travel = function () {
        if (this.video) this.video.play();

        return this
    };

    /**
     * Affiche le cockpit
     * 
     * @returns {this}
     */
    this.showCockpit = function () {
        if (this.video) self.video.style.opacity = '';
        if (this.cockpit) this.cockpit.style.opacity = '1';

        return this
    };

    /**
     * Cache le cockpit
     * 
     * @returns {this}
     */
    this.hideCockpit = function () {
        if (this.cockpit) this.cockpit.style.opacity = 0;

        return this
    };


    /**
     * Crée l'élément audio pour jouer les sons
     * 
     * @returns {this}
     */
    this._createSound = function () {
        let audio = document.createElement('audio');
        audio.src = "sounds/falcon.mp3";
        audio.style.display = "none";

        document.body.appendChild(audio);

        audio.addEventListener('canplay', function () {
            self.sound = audio
        });

        return this
    };

    /**
     * Crée l'élément vidéo pour le voyage vitesse lumière
     * 
     * @returns {this} 
     */
    this._createVideo = function () {
        let video = document.createElement('video');
        video.poster = 'img/stars_background.png';
        video.src = 'video/background.mp4';
        video.id = 'bgvid';
        video.setAttribute('playsinline', '');
        video.setAttribute('muted', '');
        video.setAttribute('loop', '');

        video.addEventListener('canplay', function () {
            self.video = video
        });

        document.body.appendChild(video);

        return this
    };

    /**
     * Crée l'image du cockpit pour le voyage vitesse lumière
     * 
     * @returns {this}
     */
    this._createCockpit = function () {
        let img = document.createElement('img');
        img.src = 'img/cockpit.png';
        img.id = 'cockpit';
        img.onload = function () {
            self.cockpit = img
        };

        document.body.appendChild(img);

        return this
    };

    this._createSound()._createVideo()._createCockpit()
}