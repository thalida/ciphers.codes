'use strict'

import * as utils from '@/ciphers/utils'

// =============================================================================
//
//  Atbash
//  A simple cipher wherein the alphabet is reversed.
//
// =============================================================================
//  About this Cipher
// -----------------------------------------------------------------------------
export const KEY = 'atbash'
export const NAME = 'Atbash'
export const ABOUT = {
  text: `A simple substitution cipher originally created for the Hebrew alphabet, when converted to work with the Latin Alphabet (abc), this cipher reverses the alphabet so that the cipher alphabet is now "zyxwvutsrqponmlkjihgfedcba".`,
  source: {
    title: 'Wikipedia',
    url: 'http://en.wikipedia.org/wiki/Atbash'
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
export function run (args) {
  let { inputStr } = utils.parseCipherArgs(args, DEFAULTS)

  if (inputStr.match(/([a-zA-Z]+)/gm) === null) {
    return {
      isSuccess: false,
      outputStr: null,
      errorStr: `${NAME} requires an input with at least one letter.`
    }
  }

  let output = ''
  const alpha = utils.ALPHA

  utils.forEachCharacter(inputStr, (i, char, isUpper) => {
    if (utils.isLetter(char)) {
      // Get the current position in the alphabet
      const letterPos = alpha.indexOf(char.toLowerCase())

      // Get the position from the other end of the alphabet
      const newLetterPos = utils.TOTAL_ALPHA - letterPos - 1

      char = utils.setCase(alpha[newLetterPos], isUpper)
    }

    // If the character was uppercase, make it so again
    output += char
  })

  return {
    isSuccess: true,
    outputStr: output,
    errorStr: null
  }
}
