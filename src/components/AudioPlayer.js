/**
 * AudioPlayer.js
 * 
 * Simple AudioPlayer to take in the URL and play it using the 
 * given method. Also, exposes functions from the <audio> element
 * which is used under the hood to make this all less code by hand
 * and much faster to work.
 */

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
    
    container.appendChild(audioElement);

    return {
        resetSrc,
        setSrc,
        audioElement,
    }
}

export default AudioPlayer;