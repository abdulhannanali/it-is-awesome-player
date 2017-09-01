/**
 * App.js
 * Contains the Main App.js component with all the associated
 * initializations to create the component and make it interactive
 * including initializing all the related components and connecting each other
 * 
 * App.js is a standalone file and is not designed to talk with
 * other applications
 */
import Uploader from './Uploader';
import AudioPlayer from './AudioPlayer';
import FileWorkerClient from '../fileWorker.client';
import AudioImage from './AudioImage';
import TrackInfo from './TrackInfo';
import Metadata from './Metadata';
import ErrorDisplay from './ErrorDisplay'; 
import mitt from 'mitt';

import '../styles/metadata-styles.css';

/**
 * Event Emitter to be used within the application
 * named as mitt.
 */
const emitter = mitt();

const audioControls = document.createElement('div');
audioControls.classList.add('audio-controls');

const interactiveContainer = document.createElement('div');
interactiveContainer.classList.add('interactive-controls');

const containerFragment = document.createDocumentFragment();

const uploader = Uploader(interactiveContainer, { emitter });
const audioImage = AudioImage(audioControls, { emitter });
const trackInfo = TrackInfo(audioControls);
const audioPlayer = AudioPlayer(audioControls);

interactiveContainer.appendChild(audioControls);
containerFragment.appendChild(interactiveContainer);

const metadata = new Metadata(containerFragment);
const errorContainer = ErrorDisplay(containerFragment);

const workerClient = FileWorkerClient();

/**************************************|
 **************************************|
 ***** CENTRALIZED EVENT HANDLERS******|
 **************************************|
 **************************************|*/

/**
 * Approaches to Event Handling within the application 
 * we are building
 * 
 * First:
 * 
 *  Create a centralized event handler that's passed to 
 *  the each component and the events are emitted from the App.js.
 * 
 *  What are the pros of this approach?
 *  Creating such an event handling mechanism can lead to logic decoupling 
 *  between various components where App doesn't make an assumption of what methods are 
 *  called for various components providing much more flexibility.
 * 
 *  However, this will lead to dependance of an external event emitter
 *  but based on our program that might not be a huge issue, so this approach can considerably 
 *  improve the flow for us in the application.
 * 
 * Second Approach:
 *   
 *  Proxies between the observers in the applications. Proxies are going to be helpful in calling
 *  different functions.
 *  
 *  Since an emitter object is not pased, logic related to implementing the listeners between
 *  application will have to be implemented ourselves.
 * 
 *  Pros of this approach:
 *    Less memory overhead, straightforward implementation,
 *    no need of playing with event emitters and complicating lives,
 *    using an external interface.
 * 
 *  Cons of this approach:
 *    How are the events going to be removed if needed?
 *    Boilerplate code within the application that can be eliminated to an extent using 
 *    our Emitter approach
 * 
 * Based on the flexibility and less boilerplate code, I am going for the first more simple approach
 * since, it'll give us an event emitter that can be used to talk through the whole application 
 * without making the flow more complicated. 
 * 
 * However in the future the second approach can also be considered, if I am ready to undertake this huge task.
 */

function _attachAudioEvents() {
    const element = audioPlayer.audioElement;

    function onPlay(event) {
        emitter.emit('play', event);
    }
    
    function onPause() {
        emitter.emit('pause', event);
    }


    audioPlayer.audioElement.addEventListener('play', onPlay);
    audioPlayer.audioElement.addEventListener('pause', onPause);
}

_attachAudioEvents();

/**
 * Upload handler to handle the music uploads
 */
function _onChange(file) {
    resetPlayer();
    setLoading();
    
    // Bootstrapping process to throw an error a single time

    workerClient.processAudio(file)
    .then(function (audioEvent) {
        const url = audioEvent.data.url;
        const tags = audioEvent.data.tags;
        setAudio(url, tags, file);
    })
    .catch(function (error) {
        setLoading(true);
        displayError(error);
    });
}

/**
 * Prepares the UI to display the error
 */
function displayError(error) {
    console.log('Logging error to the display');
    console.error(error);

    metadata.hide();
    errorContainer.show();
}

/**
 * Sets the Audio within the application,
 * after we receive the processed data from the Web Worker
 */
function setAudio(url, tags, file) {
    tags = tags || {};

    audioImage.setImage(tags);
    trackInfo.setTrackInfo(tags, file);
    audioPlayer.setSrc(url);
    metadata.setTags(tags);

    setLoading(true);
}

/**
 * Resets the Application player
 */
function resetPlayer() {
    audioPlayer.resetSrc();
    trackInfo.resetTrackInfo();
    metadata.reset();
    errorContainer.hide();
    audioImage.setImage();
}

/** Sets the loading state within the application */
function setLoading(loaded = false) {
    uploader.setLoader(loaded);
    metadata.setLoader(loaded);
}

/**
 * Initialization function for the App
 */
function App() {
    const appContainer = document.querySelector('.app');
    
    appContainer.appendChild(containerFragment);
    uploader.onChange(_onChange);
}

export default App