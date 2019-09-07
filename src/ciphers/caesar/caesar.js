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
export { default as ABOUT_TEMPLATE } from 'raw-loader!./caesar.md'

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
