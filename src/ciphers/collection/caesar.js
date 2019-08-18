'use strict'

import * as utils from '../utils'

// =============================================================================
//
//  Caesar Cipher
//  This cipher shifts the letters in the alphabet by x (user defined value)
//
// -----------------------------------------------------------------------------
export const KEY = 'caesar'
export const NAME = 'Caesar'
export const ABOUT = {
  text: `A simple substitution cipher in which the alphabet is shifted up or down a specified number of positions.`,
  source: {
    title: 'Wikipedia',
    url: 'http://en.wikipedia.org/wiki/Caesar_cipher'
  }
}

export const DEFAULTS = {
  isEncoding: true,
  inputStr: '',
  inputs: {
    shift: 2
  }
}

export const INPUTS = [
  {
    type: 'number',
    name: 'shift',
    label: 'Shift by',
    description: 'Enter a number (positive/negative) to shift the alphabet by.',
    value: DEFAULTS.inputs.shift
  }
]

export function run ({ isEncoding, inputStr, inputs }) {
  isEncoding = (typeof isEncoding === 'boolean')
    ? isEncoding
    : DEFAULTS.isEncoding

  inputStr = (typeof inputStr === 'string')
    ? inputStr
    : DEFAULTS.inputStr

  if (typeof DEFAULTS.inputs !== 'undefined') {
    inputs = Object.assign({}, DEFAULTS.inputs, inputs)
  } else {
    inputs = null
  }

  const alpha = utils.ALPHA
  const shift = utils.makeValidInt(inputs.shift, DEFAULTS.inputs.shift)

  let output = ''

  utils.forEachCharacter(inputStr, (i, char, isUpper) => {
    if (utils.isLetter(char)) {
      // The current position of the letter in the alphabet
      const letterPos = alpha.indexOf(char.toLowerCase())

      // Which direction are we moving? (addition/subtraction)
      const direction = (isEncoding) ? 1 : -1

      // Get the new letter position by shifting in the given direction
      let newLetterPos = letterPos + (direction * shift)

      // Mod the new position in case we've gone past the bounds of the alphabet
      newLetterPos = utils.mod(newLetterPos, utils.TOTAL_ALPHA)

      char = alpha[newLetterPos]
    }

    output += utils.setCase(char, isUpper)
  })

  return output
}
