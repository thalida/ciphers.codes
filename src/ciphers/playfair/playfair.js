'use strict'

import * as utils from '@/ciphers/utils'

// =============================================================================
//
//  Playfair
//  Converts the alphabet into a 5x5 grid of letters and encrypts based
//  on the position of a pair of letters w/ respect to each other in the grid
//
// =============================================================================
//  About this Cipher
// -----------------------------------------------------------------------------
export const KEY = 'playfair'
export const NAME = 'Playfair'
export { default as ABOUT_TEMPLATE } from 'raw-loader!./playfair.md'
export * from '@/ciphers/examples'

//  Private Variables
// -----------------------------------------------------------------------------
const __PLACEHOLDER_CHAR = 'x'
const __KEYED_ARR_SIZE = 5

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
  key: 'private'
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

  // a grid based keyed version of the alphabet
  const alpha = utils.makeKeyedAlpha(inputs.key, DEFAULTS.inputs.key, KEY)

  // Replace any j's with i's
  inputStr = inputStr.replace(/[j]+/g, 'i').replace(/[J]+/g, 'I')

  let letter1 = null
  let letter2 = null
  let skipped = ''
  let i = -1

  while (true) {
    i += 1 // always grab the next character at the start
    const currChar = inputStr[i]

    // We don't have a unprocessed letter AND the current char is undefined
    // EXIT THE WHILE LOOP
    if (letter1 === null && typeof currChar === 'undefined') {
      break
    }

    // handle non-letters
    if (currChar && !utils.isLetter(currChar)) {
      // We have no valid chars, update the output
      if (letter1 === null) {
        output += currChar
        continue
      }

      skipped += currChar
      continue
    }

    // We don't have a first letter yet, lets set one!
    // Then move on to grab the next letter
    if (letter1 === null) {
      letter1 = currChar
      continue
    }

    // Yas! We've made it to a state where we have the second letter!!
    const isValidLetter2 = currChar && letter1 !== currChar
    letter2 = (isValidLetter2) ? currChar : __PLACEHOLDER_CHAR

    // Get transform the chars into their encoded/decoded state
    let { char1Idx, char2Idx } = _getNewCharIndexes(isEncoding, letter1, letter2, alpha)
    const newLetter1 = utils.matchCase(alpha[char1Idx], letter1)
    const newLetter2 = utils.matchCase(alpha[char2Idx], letter2)

    if (isValidLetter2) {
      output += `${newLetter1}${skipped}${newLetter2}`
    } else {
      output += `${newLetter1}${newLetter2}${skipped}`
    }

    // Resets!
    letter1 = (letter1 !== currChar) ? null : currChar
    letter2 = null
    skipped = ''
  }

  return {
    isSuccess: true,
    outputStr: output,
    errorStr: null
  }
}

//  HELPER FUNCTIONS for THIS CIPHER ONLY!!
// =============================================================================
//  _getNewCharIndexes
//  Calculate the new index of the character being transformed
// -----------------------------------------------------------------------------
function _getNewCharIndexes (isEncoding, char1, char2, keyedAlpha) {
  const char1Pos = getCoords(char1.toLowerCase(), keyedAlpha)
  const char2Pos = getCoords(char2.toLowerCase(), keyedAlpha)

  let char1Idx = null
  let char2Idx = null

  // If the two letters are on the same row
  if (char1Pos.x === char2Pos.x) {
    const x = (char1Pos.x * __KEYED_ARR_SIZE)
    char1Idx = x + calcNewCoord(char1Pos.y, isEncoding)
    char2Idx = x + calcNewCoord(char2Pos.y, isEncoding)

  // If the two letters share the same column
  } else if (char1Pos.y === char2Pos.y) {
    char1Idx = (calcNewCoord(char1Pos.x, isEncoding) * __KEYED_ARR_SIZE) + char1Pos.y
    char2Idx = (calcNewCoord(char2Pos.x, isEncoding) * __KEYED_ARR_SIZE) + char1Pos.y

  // The two letters are on a diagonal from one another
  } else {
    char1Idx = (char1Pos.x * __KEYED_ARR_SIZE) + char2Pos.y
    char2Idx = (char2Pos.x * __KEYED_ARR_SIZE) + char1Pos.y
  }

  return { char1Idx, char2Idx }
}

//  getCoords
//  Get the current coordinates of the letter in the array
// -----------------------------------------------------------------------------
export function getCoords (char, keyedAlpha) {
  const idx = keyedAlpha.indexOf(char)
  return {
    x: Math.floor(idx / __KEYED_ARR_SIZE),
    y: utils.mod(idx, __KEYED_ARR_SIZE)
  }
}

//  calcNewCoord
//  Calculate the new coordinate based on if we're encoding/decoding
// -----------------------------------------------------------------------------
export function calcNewCoord (coord, isEncoding) {
  // Add/subtract based on the action we're performing
  let newCoord = (isEncoding) ? (coord + 1) : (coord - 1)
  return utils.mod(newCoord, __KEYED_ARR_SIZE)
}
