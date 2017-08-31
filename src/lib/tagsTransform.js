import upperFirst from 'lodash-es/upperFirst';
import isString from 'lodash-es/isString';
import isArray from 'lodash-es/isArray';
import isEmpty from 'lodash-es/isEmpty';

const ORDERED_SUPPORTED_FIELDS = [
    'title',
    'album',
    'genre',
    'year',
    'rating',
    'artist',
    'albumartist',
];

const DEFAULT_NOT_AVAILABLE_VALUE = 'Metadata not provided for this tag';
const OPTIONAL_FIELD_TEXT_MAP = { 'albumartist': 'Album Artist' };

const ARRAY_JOINER = '& ';

/**
 * Transforms the tags to provide output in array like format
 * which can be displayed to the user.
 * 
 * This currently supports ceratin values,
 * other values are omitted from the returned transformed values
 * array
 * 
 * @param {*} tags 
 * @param {*} options 
 */
export default function transform(tags, options) {
    return ORDERED_SUPPORTED_FIELDS.map(field => {
        return transformField(field, tags[field]);
    })
    .filter(transformed => transformed);
}

/**
 * Transforms the field and value according to their datatypes and 
 * provides useful information about them
 *
 * @param {string} field 
 * @param {*} value
 * 
 * @return {Array | null} 
 */
export function transformField(field, value) {
    const fieldLabel = OPTIONAL_FIELD_TEXT_MAP[field] || upperFirst(field);
    
    if (value && isString(value)) {
        return [ fieldLabel, value ];
    } else if (isArray(value) && !isEmpty(value)) {
        return [ fieldLabel, value.join(ARRAY_JOINER) ];
    } else {
        return null;
    }
}
