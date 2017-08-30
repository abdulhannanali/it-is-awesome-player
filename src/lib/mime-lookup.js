/**
 * Looks up mime type for the given format
 * mime-lookup.js
 */
const IMAGE_LOOKUP_MAP = {
    'jpg': 'image/jpeg',
    'jpeg': 'image/jpeg',
    'png': 'image/png',
    'gif': 'image/gif',
    'bmp': 'image/bmp',
    'webp': 'image/webp',
};

/**
 * Looks up the format for mime type
 */
export default function lookupMIME(format) {
    return IMAGE_LOOKUP_MAP[format];
}