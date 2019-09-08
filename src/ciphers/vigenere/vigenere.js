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
export { default as ABOUT_TEMPLATE } from 'raw-loader!./vigenere.md'
export * from '@/ciphers/examples'

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
  const key = makeKey(inputs.key, inputStr.length)

  utils.forEachCharacter(inputStr, (i, char, isUpper) => {
    if (utils.isLetter(char)) {
      const direction = (isEncoding) ? 1 : -1

      // Get the position of the character in the alphabet
      const alphaPos = alpha.indexOf(char.toLowerCase())

      // get the character at the same position in the key
      // If there is no key, default key pos to 0
      const keyPos = (key) ? alpha.indexOf(key.charAt(i)) : 0

      let letterPos = alphaPos + (direction * keyPos)
      letterPos = utils.mod(letterPos, utils.TOTAL_ALPHA)
      char = utils.setCase(alpha[letterPos], isUpper)
    }

    output += char
  })

  return {
    isSuccess: true,
    outputStr: output,
    errorStr: null
  }
}

export function makeKey (keyPart, targetKeyLength) {
  keyPart = utils.makeValidKey(keyPart, DEFAULTS.inputs.key, KEY)

  if (typeof keyPart !== 'string' || keyPart.length <= 0) {
    return ''
  }

  const keyPartLength = keyPart.length
  let key = keyPart.repeat(Math.ceil(targetKeyLength / keyPartLength))

  if (key.length > targetKeyLength) {
    key = key.substring(0, targetKeyLength)
  }

  return key
}
