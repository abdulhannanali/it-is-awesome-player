/**
 * Uploader.js
 * 
 * File Uploader for the application with all the related mehtods
 * 
 * Default class for the uploader will be `file-uploader` which can be changed
 * as needed, Uploader will be appended as a child to the container passed
 * encapsulated within it's own div.
 * 
 * Module Pattern is actually very much like Object creation pattern
 * since many of the concepts that go wth prototype are still 
 * valid when we are creating objects
 *
 */
const DEFAULT_UPLOADER_CLASS = 'file-uploader';
const DEFAULT_UPLOADER_TEXT = 'Select a File to <span class="spotify-text">Play</i>';

// DOM Related Constants
const DEFAULT_FILE_ACCEPT_ATTRIBUTE = 'audio/mpeg,audio/mp3';
const DEFAULT_INVALID_MESSAGE = 'Failed to play this file, try a different file maybe :)';

function defaultValidator(file) {
    if (!file.type.match(/audio\/.*/ig)) {
        return {
            result: false,
            message: 'Unable to read the file, please try again with another file',
        }
    } else if (file.type > 10e7) {
        return {
            result: false,
            message: 'That is a big file, pass in something lesser than 10 MB'
        }
    }

    return { result: true };
}

function Uploader(container, options) {
    options = options || {};
    
    const inputType = 'file';

    let className = options.className || DEFAULT_UPLOADER_CLASS;
    let label = options.label || DEFAULT_UPLOADER_TEXT;
    let validator = options.validator || defaultValidator;
    let wrapper;
    // Tracking the _currentFileInput within application
    // Helps with resetting it to improve the user experience
    let _currentFileInput, _header;
    
    if (!container) {
        throw new Error('"container" passed to Uploader is not valid')
    }
    
    _currentFileInput = _createFileInput();
    _header = _createTextInput(label);

    if (!options.hasOwnProperty('attach') || options.attach === true) _attachUploader();
    
    /**
     * event handler for the file change event
     * @param {Function} callback 
     */
    function onChange(callback) {
        _currentFileInput.wrapper.addEventListener('change', event => {
            const targetFile =  event.target.files[0];
            _validateFile(targetFile, callback);
        });
    }

    /**
     * Set Header Text and optionally a color along with it
     * to make it look prettier
     * @param {string} text 
     * @param {string} color
     */
    function _setHeader(text, color) {
        _header.textContent = text;
        _header.style.color = color;
    }

    /**
     * Vaidates file and calls the callback if valid,
     * if the file is invalid provides appropriate invalidation
     * message from a set.
     * 
     * @param {*} file 
     * @param {*} callback 
     */
    function _validateFile(file, callback) {
        const validation = validator(file);
        const result = validation.result;

        console.log(wrapper);
        if (result) {
            // Calling the callback the first thing
            callback(file);
            
            wrapper.classList.remove('invalid');
            _header.setMessage(file.name);
        } else {
            wrapper.classList.add('invalid');
            _header.setMessage(result.message || DEFAULT_INVALID_MESSAGE);
        }
    }

    /**
     * returns the local _currentFileInput
     */
    function getFileInput() {
        return _currentFileInput;
    }

    /**
     * Attaches the element to the given DOM Container
     */
    function _attachUploader() {
        wrapper = document.createElement('div');
        wrapper.classList.add(className);
        
        wrapper.appendChild(_currentFileInput.wrapper);
        wrapper.appendChild(_header.wrapper);
        container.appendChild(wrapper);
    }

    /**
     * Sets the loader to be used within the application
     * @param {*} loaded 
     */
    function setLoader(loaded) {
        if (loaded) {
            wrapper.classList.remove('loading');
        } else {
            wrapper.classList.add('loading');
        }
    }

    return {
        onChange: onChange,
        getFileInput: getFileInput,
        setLoader,
    }
}

/**
 * Create a file input
 */
function _createFileInput() {
    const fileInputContainer = document.createElement('div');
    const borderDiv = document.createElement('div');
    const inputLabel = document.createElement('label');
    const inputElement = document.createElement('input');

    inputElement.type = 'file';
    inputElement.accept = DEFAULT_FILE_ACCEPT_ATTRIBUTE;

    inputLabel.innerHTML = `<i class="material-icons">file_upload</i>`;
    borderDiv.className = 'button-border';

    inputLabel.appendChild(inputElement);
    
    fileInputContainer.classList.add('file-input');

    fileInputContainer.appendChild(inputLabel);
    fileInputContainer.appendChild(borderDiv);

    function setBottomColor(color) {
        return borderDiv.style.borderColor = color;
    }

    function setButtonColor(color) {
        return inputLabel.style.borderColor = color;
    }

    function addClass(className) {
        fileInputContainer.classList.add(className);
    }

    function removeClass(className) {
        fileInputContainer.classList.remove(className);
    }

    function toggleClass(className) {
        fileInputContainer.classList.toggle(className);
    }

    return { 
        wrapper: fileInputContainer,
        addClass,
        removeClass,
        toggleClass,
        setBottomColor,
        setButtonColor,
    };
}


/**
 * Create Text Input for useful information
 * to input useful information
 */
function _createTextInput(text) {
    const header = document.createElement('div');
    header.className = 'header-text'
    header.innerHTML = text;

    /**
     * Sets the text of the message
     * @param {string} message 
     * @param {*} options 
     */
    function setMessage(message, options = {}) {
        const color = options.color;

        if (color) {
            header.style.color = color;
        }

        header.innerHTML = message || '';
    }

    /**
     * Sets the color of the header
     * @param {*} color 
     */
    function setColor(color) {
        return header.style.color = color;
    }

    return { wrapper: header, setMessage, };
}

// TODO: Implement a Factory for creating an uploader

export default Uploader
