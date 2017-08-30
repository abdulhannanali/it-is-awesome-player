/**
 * File Worker
 * Performs file related operations within the application
 * and allows for a Publish/Subscribe Interface
 * 
 * It's important to keep the state functional here, since, it's 
 * very hard to maintain state around parallel processes so functional 
 * programming can solve this problem for us
 *
 * Read the file as ArrayBuffer and createObjectURI
 * Delegating boring functionality to this file.worker.js
 * 
 * Concept of identification within the worker scope.
 * Identification allows to identify different messages between Main Thread and Worker Thread
 * and process them accordingly. This is not required in all cases.
 */
import mm from './lib/musicmetadata.js'
import lookupMime from './lib/mime-lookup'

const createObjectURL = URL.createObjectURL;
const DEFAULT_TAGS_VALUE = {};

/**
 * Worker Message Handler whenever an event is required
 * this function is called
 */
self.onmessage = onMessage;

function createPictureURL(picture) {
    const blob = new Blob([ picture.data.buffer ], { type: lookupMime(picture.format) });
    return createObjectURL(blob);
}

function processPictureTag(pictureTag) {
    pictureTag.forEach(p => {
        p.url = createPictureURL(p);
    });
}

/**
 * Process Tags to simplify a few things within the worker,
 * to keep the Main thread performant, by delegating these
 * process tags operations 
 * @param {*} tags 
 */
function processTags(tags) {
    if (!tags) {
        throw new TypeError('Invalid "tags" value provided');
    }

    if (tags.picture) processPictureTag(tags.picture);
}

/**
 * Main message event handler reading the event
 */
function onMessage(event) {
    const type = event.data.type;
    const file = event.data.fileObject;

    if (type === 'parseAudio') {
        sendParsedAudio(file);
    } else {
        console.log('Message of unknown type received by the worker');
        console.log(event);
    }
}

function sendParsedAudio(file) {
    parseAudio(file)
        .then(function (audioData) {
            processTags(audioData.tags);

            self.postMessage({
                type: 'audio',
                data: audioData
            });
        })
        .catch(function (error) {
            if (isMetadata404(error)) {
                self
            }

            sendError(error);
        });
}

/**
 * Efficiently parses an MP3 File and returns a promise
 * @param {File} file
 * @return {Promise<Object>} object containing the data regarding the mp3 
 */
function parseAudio(file) {
    return new Promise(function (resolve, reject) {
        const audioURL = createObjectURL(file);
        
        // Replace the MusicMetadata Implementation with my own 
        // smaller and faster implementaiton, dedicated for the web
        mm(file, function (error, tags) {
            if (error && isMetadata404(error)) {
                tags = DEFAULT_TAGS_VALUE;
            } else if (error) {
                return reject(error);
            }
            
            resolve({ url: audioURL, tags: tags || DEFAULT_TAGS_VALUE });
        });
    });
}

/**
 * Checks if the certain error is for metadata not found
 * in the application
 */
function isMetadata404(error) {
    return error.message.match(/not find metadata/ig) !== null;
}

function sendError(error) {
    self.postMessage({
        type: 'audio',
        error: true,
        message: (error && error.message) || 'Error occured',
    });
}