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
export const ABOUT = {
  text: `A monoalphabetic substitution cipher, where a keyword placed into beginning of the alphabet, and any duplicated letters are removed.`,
  source: {
    title: 'Wikipedia',
    url: 'http://en.wikipedia.org/wiki/Keyword_cipher'
  }
}

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

//  Main Run Function
//  Returns the encoded / decoded string based on the cipher rules
// -----------------------------------------------------------------------------
export function run (args) {
  let { isEncoding, inputStr, inputs } = utils.parseCipherArgs(args, DEFAULTS)
  let output = ''

  const alpha = utils.ALPHA
  const key = utils.makeValidKey(inputs.key, DEFAULTS.inputs.key)

  // Create an alphabet w/ this key in the beginning of it
  var keyedAlpha = utils.makeKeyedAlpha(key)

  utils.forEachCharacter(inputStr, (i, char, isUpper) => {
    if (utils.isLetter(char)) {
      // Figure out what alphabet the current string is based on
      var letterArr = (isEncoding) ? alpha : keyedAlpha

      // What alphabet are we converting the string to
      var encodedLetterArr = (isEncoding) ? keyedAlpha : alpha

      // Get the current position of the letter in the array
      var letterPos = letterArr.indexOf(char.toLowerCase())

      // Get the letter in the same position of the encoded Alphabet
      char = encodedLetterArr[letterPos]
    }

    output += utils.setCase(char, isUpper)
  })

  return {
    isSuccess: true,
    outputStr: output,
    errorStr: null
  }
}
