/**
 * AudioPlayer.js
 * 
 * Simple AudioPlayer to take in the URL and play it using the 
 * given method. Also, exposes functions from the <audio> element
 * which is used under the hood to make this all less code by hand
 * and much faster to work.
 */
import mitt from 'mitt';

/**
 * Creates an Element using <audio> tag
 */
function createAudio(src) {
    const audio = document.createElement('audio');

    audio.controls = true;
    audio.src = src;
    return audio;
}

function AudioPlayer(container, src, options) {
    const emitter = mitt();
    const audioElement = createAudio(src);
    audioElement.autoplay = true;
    
    /**
     * Sets the source of the audio element
     * that has been created
     */
    function setSrc(src) {
        audioElement.src = src;
    }

    function resetSrc(src) {
        audioElement.src = '';
    }

    /**
     * Media Event Handler for 'pause'
     * @param {*} event 
     */
    function _onPause(event) {
        emitter.emit('pause', event);
    }

    /**
     * Media Event handler for 'play'
     * @param {*} event
     */
    function _onPlay(event) {
        emitter.emit('play', event);
    }

    audioElement.addEventListener('pause', _onPause);
    audioElement.addEventListener('play', _onPlay);

    
    function removeListeners() {
        audioElement.removeEventListener('pause', _onPause);
        audioElement.removeEventListener('play', _onPlay);
    }
    
    container.appendChild(audioElement);

    return {
        resetSrc,
        setSrc,
        audioElement,
        removeListeners
    };
}

export default AudioPlayer;