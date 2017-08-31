/**
 * ErrorDisplay.js
 * Generic placeholder to display errors
 */
const DEFAULT_ERROR_HEADER = 'hard to play this';
const DEFAULT_ERROR_MESSAGE = `
double check the file please, or contact the <span class="developer"><a href="https://twitter.com/@computistic" rel="noopener" target="_blank">@computistic</a></span>
`.trim();

function ErrorDisplay(container, options) {
    if (!container) {
        throw new Error('"container" is not valid');
    }
    
    let wrapper, header, message; 
    
    _initError();
    hide();

    function show () {
        wrapper.style.display = 'block';
    }

    function hide () {
        wrapper.style.display = 'none';
    }

    /**
     * Initializes error for the wrapper
     */
    function _initError() {
        wrapper = document.createElement('div');
        header = document.createElement('div');
        message = document.createElement('div');

        wrapper.classList.add('error-display');
        header.classList.add('error-header');
        message.classList.add('error-message');

        wrapper.appendChild(header);
        wrapper.appendChild(message);
    
        header.textContent = DEFAULT_ERROR_HEADER;
        message.innerHTML = DEFAULT_ERROR_MESSAGE;

        container.appendChild(wrapper);
    }

    /**
     * Sets the Message within the container and unhides the error container,
     * in order to keep the wrapper hidden, explicitly pass false as 
     * the second argument
     */
    function setMessage(message, show = true) {
        if (show) {
            show();
        } else {
            hide();
        }

        message.innerHTML = message;
    }

    return { show, hide, setMessage };
}

export default ErrorDisplay;