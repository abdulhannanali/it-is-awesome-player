/**
 * Brief information provided about the tracks 
 * above the Audio Player
 */
const DEFAULT_TRACK_INFO_CLASS = 'track-info'

const UNKNOWN_TRACK_INFO = '?';
const DEFAULT_TRACK_INFO = 'Lorem Ipsum Dolor Sit Amet....';
const DEFAULT_TRACK_AUTHOR = 'Unknown Author';

function TrackInfo(container, options = {}) {
    const displaySize = options.displaySize || false;
    const displayText = options.displayText || true;

    const infoElement = document.createElement('div');
    infoElement.classList.add('track-info');

    const trackTitle = document.createElement('p');
    const artistName = document.createElement('p');
    const trackYear = document.createElement('span');

    trackTitle.classList.add('track-title')
    artistName.classList.add('artist-name');
    trackYear.classList.add('track-year');

    infoElement.appendChild(trackTitle)
    infoElement.appendChild(artistName);

    /**
     * Sets the basic information to be displayed about the track
     * @param {*} tags 
     * @param {*} file 
     */
    function setTrackInfo(tags, file) {
        const title = tags.title || file.name;
        const artist = tags.artist && tags.artist[0];
        const year = tags.year;
        
        trackTitle.textContent = title;

        if (year) {
            trackYear.textContent = `(${year})` || '';
            trackTitle.appendChild(trackYear); 
        }

        artistName.textContent = artist;
    }

    function _setPlaceholderInfo() {
        const pl1 = document.createElement('span');
        const pl2 = document.createElement('span');
        const pl3 = document.createElement('span');

        pl1.classList.add('placeholder');
        pl2.classList.add('placeholder');
        pl3.classList.add('small-placeholder');

        trackTitle.appendChild(pl1);
        trackTitle.appendChild(pl3);
        artistName.appendChild(pl2);
    }

    function resetTrackInfo () {
        artistName.textContent = '';
        trackTitle.textContent = '';

        _setPlaceholderInfo();
    }

    _setPlaceholderInfo();

    container.appendChild(infoElement);

    return { setTrackInfo, resetTrackInfo };
}

export default TrackInfo;