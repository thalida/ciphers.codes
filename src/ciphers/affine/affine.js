'use strict'

import * as utils from '@/ciphers/utils'

// =============================================================================
//
//  Affine
//  A simple shift cipher based on the Caesar cipher
//
// =============================================================================
//  About this Cipher
// -----------------------------------------------------------------------------
export const KEY = 'affine'
export const NAME = 'Affine'
export { default as ABOUT_TEMPLATE } from 'raw-loader!./affine.md'

//  Custom Variables
// -----------------------------------------------------------------------------
export const ALLOWED_COPRIMES = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]

//  Default Arguments
// -----------------------------------------------------------------------------
export const DEFAULTS = {
  isEncoding: true,
  inputStr: '',
  inputs: {
    shift: 0,
    coprime: ALLOWED_COPRIMES[0]
  }
}

//  Sample Inputs
// -----------------------------------------------------------------------------
export const SAMPLE_INPUTS = {
  shift: 6,
  coprime: ALLOWED_COPRIMES[1]
}

//  Inputs
// -----------------------------------------------------------------------------
export const INPUTS = [
  {
    type: 'select',
    name: 'coprime',
    label: 'Co-prime',
    value: SAMPLE_INPUTS.coprime,
    options: ALLOWED_COPRIMES,
    validate (n) {
      return ALLOWED_COPRIMES.indexOf(parseInt(n, 10)) >= 0
    }
  },
  {
    type: 'number',
    name: 'shift',
    label: 'Shift',
    value: SAMPLE_INPUTS.shift
  }
]

export const INPUTS_BY_NAME = INPUTS.reduce((obj, input) => {
  obj[input.name] = input
  return obj
}, {})

//  Main Run Function
//  Returns the encoded / decoded string based on the cipher rules
// -----------------------------------------------------------------------------
export function run (args) {
  let { isEncoding, inputStr, inputs } = utils.parseCipherArgs(args, DEFAULTS)

  if (inputStr.match(/([a-zA-Z]+)/gm) === null) {
    return {
      isSuccess: false,
      outputStr: null,
      errorStr: `${NAME} requires an input with at least one letter.`
    }
  }

  let output = ''

  const alpha = utils.ALPHA
  const shift = utils.makeValidInt(inputs.shift, DEFAULTS.inputs.shift)
  const coprime = utils.makeValidInt(inputs.coprime, DEFAULTS.inputs.coprime)

  utils.forEachCharacter(inputStr, (i, char, isUpper) => {
    // If the current character is a letter, get the new position
    // of the letter in the alphabet based on if we are encoding/decoding
    if (utils.isLetter(char)) {
      let letterPos = alpha.indexOf(char.toLowerCase())
      let newLetterPos = 0

      if (isEncoding) {
        newLetterPos = (coprime * letterPos) + shift
      } else {
        newLetterPos = modInverse(coprime) * (letterPos - shift)
      }

      // The new letter position may be out of bounds,
      // mod the letter to get the valid position.
      newLetterPos = utils.mod(newLetterPos, utils.TOTAL_ALPHA)
      char = utils.setCase(alpha[newLetterPos], isUpper)
    }

    // If the character was originally uppercase, make it uppercase again
    output += char
  })

  // This cipher will always be successful
  // it can cleanly ignore characters it doesn't know how to handle
  return {
    isSuccess: true,
    outputStr: output,
    errorStr: null
  }
}

//  HELPER FUNCTIONS for THIS CIPHER ONLY!!
// =============================================================================

//  modInverse
//  takes: coprime
//  returns: the modular multiplicative inverse of the coprime
// -----------------------------------------------------------------------------
export function modInverse (coprime) {
  let mod = utils.TOTAL_ALPHA
  let inverse = 1
  let y = 0

  while (coprime > 1) {
    let origMod = mod
    let origY = y
    let quotient = Math.floor(coprime / mod)

    mod = coprime % mod
    coprime = origMod
    y = inverse - quotient * y
    inverse = origY

    if (inverse < 0) {
      inverse += utils.TOTAL_ALPHA
    }
  }

  return inverse
}

export const SAMPLE_STRING = `Hello World! \r\n ABCDEFGHIJKLMNOPQRSTUVWXYZ \r\n abcdefghijklmnopqrstuvwxyz \r\n 0123456789 \r\n !@#$`
export function sampleEncoding () {
  return run({
    isEncoding: true,
    inputStr: SAMPLE_STRING,
    inputs: utils.flattenCipherInputs(INPUTS)
  }).outputStr
}

export function sampleDecoding () {
  return run({
    isEncoding: false,
    inputStr: sampleEncoding(SAMPLE_STRING),
    inputs: utils.flattenCipherInputs(INPUTS)
  }).outputStr
}
