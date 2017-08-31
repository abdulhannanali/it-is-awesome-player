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

import '../styles/metadata-styles.css';

const audioControls = document.createElement('div');
audioControls.classList.add('audio-controls');

const interactiveContainer = document.createElement('div');
interactiveContainer.classList.add('interactive-controls');

const containerFragment = document.createDocumentFragment();

const uploader = Uploader(interactiveContainer, {});
const audioImage = AudioImage(audioControls);
const trackInfo = TrackInfo(audioControls);
const audioPlayer = AudioPlayer(audioControls);

interactiveContainer.appendChild(audioControls);
containerFragment.appendChild(interactiveContainer);

const metadata = new Metadata(containerFragment);
const errorContainer = ErrorDisplay(containerFragment);

const workerClient = FileWorkerClient();

// Therapeutic ASCII ART feels amazing

/**************************************|
 **************************************|
 ***** CENTRALIZED EVENT HANDLERS******|
 **************************************|
 **************************************|*/

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

function _onPlayVideo(event) {

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