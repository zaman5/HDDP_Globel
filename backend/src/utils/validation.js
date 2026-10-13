// Server-side checks shared by the public forms (the browser checks too, but can be bypassed).
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LONG_TEXT_FIELDS = new Set(['message', 'notes', 'additional_notes', 'description', 'requirements']);

exports.isEmail = value => typeof value === 'string' && value.length <= 254 && EMAIL.test(value.trim());

// Returns the name of the first field that is longer than allowed, or null
exports.fieldTooLong = body => {
  for (const [key, value] of Object.entries(body || {})) {
    if (typeof value !== 'string') continue;
    const max = LONG_TEXT_FIELDS.has(key) ? 5000 : 300;
    if (value.length > max) return key;
  }
  return null;
};
