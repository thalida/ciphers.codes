'use strict'

import * as utils from '@/ciphers/utils'

// =============================================================================
//
//  Mason
//  Converts each letter into a symbol based on its position in a grid
//  A special font is being used for this cipher, so it currently
//  just return the letter as is
//
// -----------------------------------------------------------------------------
const __USE_FONT = true

export const KEY = 'masonic'
export const NAME = 'Masonic'
export const ABOUT = {
  text: `A geometric simple substitution cipher which exchanges letters for symbols which are fragments of a grid.`,
  source: {
    title: 'Wikipedia',
    url: 'http://en.wikipedia.org/wiki/Pigpen_cipher'
  }
}

export const DEFAULTS = {
  isEncoding: true,
  inputStr: ''
}

export function run ({ isEncoding, inputStr }) {
  if (__USE_FONT) {
    return inputStr
  }

  isEncoding = (typeof isEncoding === 'boolean')
    ? isEncoding
    : DEFAULTS.isEncoding

  let output = ''

  utils.forEachCharacter(inputStr, (i, char) => {
    char = char.toLowerCase()
    if (isEncoding && char.match(/^[a-z]$/)) {
      char = '<span class="mason_text">' + char + '</span>'
    }
    output += char
  })

  return output
}
