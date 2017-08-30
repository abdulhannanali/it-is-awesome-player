/**
 * Metadata.js
 * 
 * Redesigned Metadata Component to contain all the Metadata
 * fields in a nice Spotify Formatted way
 * to make for a nice sound effect
 *
 * In order to write a good UI Component, we are going to make use of `this`
 * since it's what is going to be the difference between 
 * a Component having it's data accessible to all the prototype 
 * methods, we are still welcome to keep the 
 * related functionality we think shouldn't be exposed to the Prototype Function globally 
 * using the local scope
 * 
 * Link with Metabrainz, Metabrainz provides a lot of the useful and accessible information for 
 * the purpose of making this application worth using, we can take in this information.
 */
import transformTags from '../lib/tagsTransform';
import { isEmpty } from 'lodash-es';


/**
 * `disk` and `track` are not supported unless there's a better Metadata parser
 * Current one, does not fulfill the needs
 */
const FIELDS_NOT_SUPPORTED = ['picture', 'disk', 'track'];

const NO_TAGS_PLACEHOLDER = 'Track does not contain any Metadata information along with it';
const DEFAULT_INITIAL_PLACEHOLDER = 'Metadata will appear here once file is loaded';

function Metadata(container, options) {
    // TODO Validate the container here
    this.container = container;
    options = {};

    if (options.notSupportedFields) {
        this.notSupportedFields = FIELDS_NOT_SUPPORTED.concat(options.notSupportedFields);
    }

    this._create();
    this._append();
}

/**
 * Sets the Data within this Metadata component
 * for the given fields
 */
Metadata.prototype.setTags = function setTags(tags) {
    if (!tags || isEmpty(tags)) {
        return this.setNoTagsPlaceholder();
    }

    const transformedTags = this._transformTagsData(tags);
    const fields = this._metadataFields(transformedTags);

    this.metadataPlaceholder.innerHTML = '';
    this.fieldsContainer.innerHTML = '';

    this.fieldsContainer.appendChild(fields);
}

/**
 * Sets a no tags placeholder within the application
 */
Metadata.prototype.setNoTagsPlaceholder = function setNoTagsPlaceholder() {
    this.fieldsContainer.innerHTML = '';
    this.metadataPlaceholder.textContent = NO_TAGS_PLACEHOLDER;
}

Metadata.prototype._transformTagsData = function _transformTagsData(tags) {
    return transformTags(tags);
}

/**
 * Generates a single field for the metadata
 */
Metadata.prototype._metadataField = function _metadataField(title, value) {
    const fieldContainer = document.createElement('div');
    fieldContainer.classList.add('metadata-field');

    const fieldLabel = document.createElement('div');
    const fieldValue = document.createElement('div');

    fieldLabel.classList.add('field-label');
    fieldValue.classList.add('field-value');

    fieldLabel.textContent = upperFirst(title);
    fieldValue.textContent = value;

    fieldContainer.appendChild(fieldValue);
    fieldContainer.appendChild(fieldLabel);

    return fieldContainer;
}

/**
 * Generates multiple fields for the given set of tags,
 * takes in an ordered array and returns a fragment containing 
 * fields in that ordered
 */
Metadata.prototype._metadataFields = function _metadataFields(fields) {
    const docFragment = document.createDocumentFragment();
    fields.forEach(field => docFragment.appendChild(this._metadataField(field[0], field[1])));
    return docFragment;
}

/**
 * Creates a container to contain all the data related to Metadata
 */
Metadata.prototype._create = function _create() {
    const metadataContainer = document.createElement('div');
    const metadataPlaceholder = document.createElement('div');
    const fieldsContainer = document.createElement('div');
    const fieldsHeader = document.createElement('div');

    fieldsHeader.textContent = 'Metadata';

    metadataContainer.classList.add('metadata');
    fieldsContainer.classList.add('metadata-fields');
    fieldsHeader.classList.add('metadata-header');
    
    metadataContainer.appendChild(fieldsHeader);
    metadataContainer.appendChild(metadataPlaceholder);
    metadataContainer.appendChild(fieldsContainer);

    this.metadataContainer = metadataContainer;
    this.metadataPlaceholder = metadataPlaceholder;
    this.fieldsContainer = fieldsContainer;
    this.fieldsHeader = fieldsHeader;

    this.fieldsContainer.addEventListener('click', this._onClickField);
    this.setInitialPlaceholder();
}

/**
 * Resets the Metadata Fields
 * to contain the required data
 */
Metadata.prototype._reset = function _resetMetadata() {
    this.fieldContainer.innerHTML = '';
}

Metadata.prototype._onClickField = function _onClickField(event) {
    const targetElement = event.target;
    const elementLabel = targetElement.textContent;

    if (targetElement.classList.contains('field-value')) {
        window.open('https://lmgtfy.com?q=' + targetElement.textContent, '_blank');
    }
}

/**
 * Sets the initial placeholder metadata displayed only once
 */
Metadata.prototype.setInitialPlaceholder = function setInitialPlaceholder() {
    this.metadataPlaceholder.innerHTML = DEFAULT_INITIAL_PLACEHOLDER;
    this.fieldsContainer.innerHTML = '';
}

Metadata.prototype.hide = function hide() {
    this.metadataContainer.style.display = 'none';
}

Metadata.prototype.show = function show() {
    this.metadataContainer.style.display = '';
}

/**
 * Appends the given metadata to the container
 */
Metadata.prototype._append = function _append() {
    this.container.appendChild(this.metadataContainer);
}

export default Metadata;
