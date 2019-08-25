'use strict'

import * as utils from '@/ciphers/utils'

// =============================================================================
//
//  Mason
//  Converts each letter into a symbol based on its position in a grid
//  A special font is being used for this cipher, so it currently
//  just return the letter as is
//
// =============================================================================
//  About this Cipher
// -----------------------------------------------------------------------------
export const KEY = 'masonic'
export const NAME = 'Masonic'
export const ABOUT = {
  text: `A geometric simple substitution cipher which exchanges letters for symbols which are fragments of a grid.`,
  source: {
    title: 'Wikipedia',
    url: 'http://en.wikipedia.org/wiki/Pigpen_cipher'
  }
}

//  Default Arguments
// -----------------------------------------------------------------------------
export const DEFAULTS = {
  isEncoding: true,
  inputStr: ''
}

//  Main Run Function
//  Returns the encoded / decoded string based on the cipher rules
// -----------------------------------------------------------------------------
export function run (args, useFont) {
  useFont = (typeof useFont === 'boolean') ? useFont : true

  let { isEncoding, inputStr } = utils.parseCipherArgs(args, DEFAULTS)
  let output = ''
  let results = {
    isSuccess: true,
    outputStr: null,
    errorStr: null
  }

  // Masonic cipher can't be represented by a plaintext string
  // Return the input string if we'll use a font to represent the cipher
  if (useFont) {
    results.outputStr = inputStr
    return results
  }

  // Otherwise loop over each letter and wrap in a span for visual rendering
  utils.forEachCharacter(inputStr, (i, char) => {
    char = char.toLowerCase()
    if (isEncoding && char.match(/^[a-z]$/)) {
      char = `<span class="masonic">${char}</span>`
    }
    output += char
  })

  results.outputStr = output
  return results
}
