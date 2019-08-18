'use strict'

import * as utils from '@/ciphers/utils'

// =============================================================================
//
//  Affine
//  A simple shift cipher based on the Caesar cipher
//
// -----------------------------------------------------------------------------

const __ALLOWED_COPRIMES = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]

export const KEY = 'affine'
export const NAME = 'Affine'
export const ABOUT = {
  text: `The affine cipher is a type of monoalphabetic substitution cipher, wherein each letter in an alphabet is mapped to its numeric equivalent, encrypted using a simple mathematical function, and converted back to a letter.`,
  source: {
    title: 'Wikipedia',
    url: 'http://en.wikipedia.org/wiki/Affine_cipher'
  }
}

export const DEFAULTS = {
  isEncoding: true,
  inputStr: '',
  inputs: {
    shift: 2,
    coprime: 5
  }
}

export const INPUTS = [
  {
    type: 'select',
    name: 'coprime',
    label: 'Co-prime',
    description: 'The coprimes of 26 are: ' + __ALLOWED_COPRIMES.join(', '),
    value: DEFAULTS.inputs.coprime,
    options: __ALLOWED_COPRIMES,
    validate (n) {
      return __ALLOWED_COPRIMES.indexOf(parseInt(n, 10)) >= 0
    }
  },
  {
    type: 'number',
    name: 'shift',
    label: 'Shift',
    description: 'Enter a number (positive/negative) to shift the alphabet by.',
    value: DEFAULTS.inputs.shift
  }
]

export function run (args) {
  let isEncoding = (args && typeof args.isEncoding === 'boolean')
    ? args.isEncoding
    : DEFAULTS.isEncoding

  let inputStr = (args && typeof args.inputStr === 'string')
    ? args.inputStr
    : DEFAULTS.inputStr

  let inputs = (args && typeof args.inputs !== 'undefined')
    ? args.inputs
    : {}

  if (typeof DEFAULTS.inputs !== 'undefined') {
    inputs = Object.assign({}, DEFAULTS.inputs, inputs)
  }

  const alpha = utils.ALPHA
  const shift = utils.makeValidInt(inputs.shift, DEFAULTS.inputs.shift)
  const coprime = utils.makeValidInt(inputs.coprime, DEFAULTS.inputs.coprime)

  let output = ''

  utils.forEachCharacter(inputStr, (i, char, isUpper) => {
    // If the current character is a letter, get the new position
    // of the letter in the alphabet based on if we are encoding/decoding
    if (utils.isLetter(char)) {
      let letterPos = alpha.indexOf(char.toLowerCase())
      let newLetterPos = 0

      if (isEncoding) {
        newLetterPos = (coprime * letterPos) + shift
      } else {
        newLetterPos = (utils.TOTAL_ALPHA - coprime) * (letterPos - shift)
      }

      // The new letter position may be out of bounds,
      // mod the letter to get the valid position.
      newLetterPos = utils.mod(newLetterPos, utils.TOTAL_ALPHA)
      char = alpha[newLetterPos]
    }

    // If the character was originally uppercase, make it uppercase again
    output += utils.setCase(char, isUpper)
  })

  return output
}
