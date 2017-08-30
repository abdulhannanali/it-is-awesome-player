/**
 * FileWorker Client makes it simple enough
 * to parse the audio data using the help of FileWorker
 * without any overhead or complications
 * 
 * Contributions that can be made to this application:
 * - add performance api integration
 */
import FileWorker from './file.worker.js';

const AUDIO_PARSE_MESSAGE_TYPE = 'parseAudio';

function _createAudioMessage(file) {
    if (!file) {
        throw new Error('"file" is required to be passed in the audio processing message')
    }

    return { type: AUDIO_PARSE_MESSAGE_TYPE, fileObject: file };
}

function FileWorkerClient(worker) {
    worker = worker || new FileWorker();

    /**
     * Helper Function to process the audio and provide a promise
     * to get the data
     * 
     * Function is vulnerable to race conditions as there's no UUID specified 
     * with each request
     */
    function processAudio(file) {
        return new Promise((resolve, reject) => {
            const audioMessage = _createAudioMessage(file);
            worker.postMessage(audioMessage);
            worker.addEventListener('message', function onClick(event) {
                const eventData = event.data;

                if (eventData.type !== 'audio') {
                    return;
                }

                eventData.error ?
                    reject(eventData) :
                    resolve(eventData);
                
                worker.removeEventListener('message', onClick);
            });
        })
    }

    return {
        worker,
        processAudio
    }
}

export default FileWorkerClient;