'use strict'

import * as utils from '@/ciphers/utils'

// =============================================================================
//
//  Vigenère
//
// =============================================================================
//  About this Cipher
// -----------------------------------------------------------------------------
export const KEY = 'vigenere'
export const NAME = 'Vigenère'
export const ABOUT = {
  text: `A simple polyalphabetic substitution cipher which uses a tableau composed of each of the 26 options for a Caesar Cipher.`,
  source: {
    title: 'Wikipedia',
    url: 'http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher'
  }
}

//  Default Arguments
// -----------------------------------------------------------------------------
export const DEFAULTS = {
  isEncoding: true,
  inputStr: '',
  inputs: {
    key: 'dolor'
  }
}

//  Sample Inputs
// -----------------------------------------------------------------------------
export const SAMPLE_INPUTS = {
  key: 'hide'
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

  if (inputStr.match(/([a-zA-Z]+)/gm) === null) {
    return {
      isSuccess: false,
      outputStr: null,
      errorStr: `${NAME} requires an input with at least one letter.`
    }
  }

  let output = ''

  const alpha = utils.ALPHA
  const keyBase = utils.makeValidKey(inputs.key, DEFAULTS.inputs.key)

  // Generate the key by looping over keyBase until key is === the length of
  // the input string. ex. string == 'helloworld' and keyBase = 'hide'
  // then key = hidehidehi
  let key = ''
  while (key.length < inputStr.length && keyBase.length > 0) {
    utils.forEachCharacter(keyBase, (i, char) => {
      if (key.length >= inputStr.length) {
        return
      }
      key += char
    })
  }

  utils.forEachCharacter(inputStr, (i, char, isUpper) => {
    if (utils.isLetter(char)) {
      const direction = (isEncoding) ? 1 : -1

      // Get the position of the character in the alphabet
      const alphaPos = alpha.indexOf(char.toLowerCase())

      // Get the char in the key at this position
      // Then get the position of that character in the regular alphabet
      let keyPos = alpha.indexOf(key.charAt(i))
      keyPos = (keyPos === -1) ? 0 : keyPos

      const pos = alphaPos + (direction * keyPos)
      char = utils.setCase(alpha[utils.mod(pos, utils.TOTAL_ALPHA)], isUpper)
    }

    output += char
  })

  return {
    isSuccess: true,
    outputStr: output,
    errorStr: null
  }
}
