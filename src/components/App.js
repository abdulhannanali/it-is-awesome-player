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

const workerClient = FileWorkerClient();


// Therapeutic ASCII ART feels amazing

/**************************************|
 **************************************|
 ***** CENTRALIZED EVENT HANDLERS******|
 **************************************|
 **************************************|*/

/**
 * Event call when the video starts playing to add 
 * some useful animation effects within the application
 */
function _onPlayVideo () {}

/**
 * Upload handler to handle the music uploads
 */
function _onChange(file) {
    setLoading();
    resetPlayer();
    
    workerClient.processAudio(file)
    .then(function (audioEvent) {
        const url = audioEvent.data.url;
        const tags = audioEvent.data.tags;
        
        setAudio(url, tags, file);
    })
    .catch(function (error) {
        console.error(error);
    });
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
    metadata.setInitialPlaceholder();
    audioImage.setImage();
}

/** Sets the loading state within the application */
function setLoading(loaded = false) {
    uploader.setLoader(loaded);
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
export {
    displayError
}