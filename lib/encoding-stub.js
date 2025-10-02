'use strict';

/**
 * Minimal stub for the optional `encoding` dependency required by node-fetch.
 * We only need the `convert` helper which should gracefully fall back to
 * returning a UTF-8 Buffer when other encodings are unavailable.
 */
function convert(input, toEncoding) {
  if (input == null) {
    return Buffer.from('');
  }

  if (Buffer.isBuffer(input)) {
    return input;
  }

  if (typeof input === 'string') {
    return Buffer.from(input, toEncoding || 'utf-8');
  }

  if (ArrayBuffer.isView(input)) {
    return Buffer.from(input.buffer, input.byteOffset, input.byteLength);
  }

  if (input instanceof ArrayBuffer) {
    return Buffer.from(input);
  }

  return Buffer.from(String(input));
}

module.exports = { convert };
