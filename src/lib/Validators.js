/**
 * Validators to make the life easier
 */

/**
 * Validates the element provided in the DOM and checks it's state 
 * accordingly
 */
function validateDOMElement(element) {
    if (!element || element instanceof HTMLElement) {
        throw new TypeError('"element" provided is not valid');
    }
}
