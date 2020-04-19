export default class AudioController {


    static soundImg = document.querySelector('.sound__image img');
    static soundContainer = document.querySelector('.volume');
    static soundController = document.querySelector('.volume input');
    static volume = this.soundController.value;


    static showControllerSound() {
        this.soundContainer.classList.toggle('volume_hidden');
    }

    static changeVolume() {
        this.soundController.focus();
        this.volume = this.soundController.value;
        // this.playAudio();
    }
    static playAudio(link) {
        let audio = new Audio(link);
        audio.volume = this.volume * 0.01;
        audio.play();
    }

    static init() {
        this.soundImg.addEventListener('click', this.showControllerSound.bind(this));
        this.soundController.addEventListener('change', this.changeVolume.bind(this));
    }

}