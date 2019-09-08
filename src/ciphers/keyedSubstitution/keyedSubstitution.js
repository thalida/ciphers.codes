'use strict'

import * as utils from '@/ciphers/utils'

// =============================================================================
//
//  Keyed Substitution
//  A key is placed in the beginning of the alphabet and the strings are
//  encoded based on the position of the letters in this keyed alphabet.
//
// =============================================================================
//  About this Cipher
// -----------------------------------------------------------------------------
export const KEY = 'keyed_substitution'
export const NAME = 'Keyed Substitution'
export { default as ABOUT_TEMPLATE } from 'raw-loader!./keyedSubstitution.md'
export * from '@/ciphers/examples'
//  Default Arguments
// -----------------------------------------------------------------------------
export const DEFAULTS = {
  isEncoding: true,
  inputStr: '',
  inputs: {
    key: ''
  }
}

//  Sample Inputs
// -----------------------------------------------------------------------------
export const SAMPLE_INPUTS = {
  key: 'lorem'
}

//  Inputs
// -----------------------------------------------------------------------------
export const INPUTS = [
  {
    type: 'text',
    name: 'key',
    label: 'Key',
    description: 'Create a key by entering text without using duplicate letters.',
    placeholder: '',
    value: SAMPLE_INPUTS.key,
    forceToValidKey: true
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

  // Create an alphabet w/ this key in the beginning of it
  const keyedAlpha = utils.makeKeyedAlpha(inputs.key, DEFAULTS.inputs.key)

  utils.forEachCharacter(inputStr, (i, char, isUpper) => {
    if (utils.isLetter(char)) {
      // Figure out what alphabet the current string is based on
      let letterArr = (isEncoding) ? alpha : keyedAlpha

      // What alphabet are we converting the string to
      let encodedLetterArr = (isEncoding) ? keyedAlpha : alpha

      // Get the current position of the letter in the array
      let letterPos = letterArr.indexOf(char.toLowerCase())

      // Get the letter in the same position of the encoded Alphabet
      char = utils.setCase(encodedLetterArr[letterPos], isUpper)
    }

    output += char
  })

  return {
    isSuccess: true,
    outputStr: output,
    errorStr: null
  }
}
