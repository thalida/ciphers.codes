'use strict'

import * as utils from '@/ciphers/utils'

// =============================================================================
//
//  Caesar Cipher
//  This cipher shifts the letters in the alphabet by x (user defined value)
//
// =============================================================================
//  About this Cipher
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

//  Default Arguments
// -----------------------------------------------------------------------------
export const DEFAULTS = {
  isEncoding: true,
  inputStr: '',
  inputs: {
    shift: 0
  }
}

//  Sample Inputs
// -----------------------------------------------------------------------------
export const SAMPLE_INPUTS = {
  shift: 5
}

//  Inputs
// -----------------------------------------------------------------------------
export const INPUTS = [
  {
    type: 'number',
    name: 'shift',
    label: 'Shift by',
    description: 'Enter a number (positive/negative) to shift the alphabet by.',
    value: SAMPLE_INPUTS.shift
  }
]

//  Main Run Function
//  Returns the encoded / decoded string based on the cipher rules
// -----------------------------------------------------------------------------
export function run (args) {
  let { isEncoding, inputStr, inputs } = utils.parseCipherArgs(args, DEFAULTS)
  let output = ''

  const alpha = utils.ALPHA
  const shift = utils.makeValidInt(inputs.shift, DEFAULTS.inputs.shift)

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

      char = utils.setCase(alpha[newLetterPos], isUpper)
    }

    output += char
  })

  return {
    isSuccess: true,
    outputStr: output,
    errorStr: null
  }
}
