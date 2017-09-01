import placeholderImage from '../assets/music-placeholder.jpg';

const DEFAULT_TRACK_CLASS = 'track-image';
const DEFAULT_ALT = 'Placeholder Image for the Track';

/**
 * AudioImage 
 * 
 * @param {*} wrapper
 * @param {*} options 
 */
function AudioImage(wrapper, options) {
    options = options || {};

    const emitter = options.emitter;
    const currentImage = document.createElement('img');

    const imageOverlay = document.createElement('div');
    const imageContainer = document.createElement('div');
    
    imageContainer.className = options.className || DEFAULT_TRACK_CLASS;
    imageOverlay.className = 'image-overlay';
    
    imageContainer.appendChild(imageOverlay);
    imageContainer.appendChild(currentImage);

    fade();

    function _attachListeners() {
        emitter.on('play', _onPlay);
        emitter.on('pause', _onPause);
    }

    function _onPlay() {
        removeFade();
    }

    function _onPause() {
        fade();
    }


    /**
     * Fade the image by adding the appropriate class to the image
     */
    function fade() {
        imageContainer.classList.add('fade');
    }

    function removeFade() {
        imageContainer.classList.remove('fade');
    }

    if (emitter) {
        _attachListeners();
    }

    /**
     * setImage
     * Sets the Image src in file
     */
    function setImage(tags) {
        tags = tags || {};
        const pictureTag = tags.picture;

        if (pictureTag && pictureTag[0]) {
            currentImage.src = pictureTag[0].url;
            currentImage.alt = 'Album Art for ' + tags.title;
        } else {
            _setDefaultImage();
        }
    }

    function _setDefaultImage() {
        currentImage.src = placeholderImage;
        currentImage.alt = DEFAULT_ALT;
    }

    _setDefaultImage();
    wrapper.appendChild(imageContainer);

    return {
        setImage,
    };
}

export default AudioImage;