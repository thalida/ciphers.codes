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
export const ABOUT = {
  text: `The playfair cipher combines the letters i and j so that the alphabet can fit on a 5x5 grid, as a result any "j" you use in your text, will be treated like an "i". Read more on how the Playfair cipher is encoded and decoded.`,
  source: {
    title: 'Wikipedia',
    url: 'http://en.wikipedia.org/wiki/Playfair_cipher'
  }
}

//  Private Variables
// -----------------------------------------------------------------------------
const __PLACEHOLDER_CHAR = 'x'
const __KEYED_ARR_SIZE = 5
const __KEYED_ALPHAS = []

//  Default Arguments
// -----------------------------------------------------------------------------
export const DEFAULTS = {
  isEncoding: true,
  inputStr: '',
  inputs: {
    key: ''
  }
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
    value: DEFAULTS.inputs.key,
    postProcess: utils.removeDuplicateChars.bind(this)
  }
]

//  Main Run Function
//  Returns the encoded / decoded string based on the cipher rules
// -----------------------------------------------------------------------------
export function run (args) {
  let { isEncoding, inputStr, inputs } = utils.parseCipherArgs(args, DEFAULTS)
  let output = ''

  const key = utils.makeValidKey(inputs.key, DEFAULTS.inputs.key)
  // Replace any j's with i's in the key
  const keyword = key.replace(/[j]+/gi, 'i').toLowerCase()
  // Created a grid based keyed version of the alphabet
  const alpha = _getKeyedAlpha(keyword)

  // Remove any non letter character
  inputStr = inputStr.replace(/[^A-Za-z]+/gi, '').toLowerCase()
  // Replace any j's with i's
  inputStr = inputStr.replace(/[j]+/gi, 'i').toLowerCase()

  // Convert the string to an array of pairs
  const str = _strToPairs(inputStr, isEncoding)

  for (let i = 0; i < str.length; i++) {
    // Get the info for the first + second characters of the pair
    const char1 = _formatChar(alpha, str[i][0])
    const char2 = _formatChar(alpha, str[i][1])

    // If the two letters are on the same row
    if (char1.coords.x === char2.coords.x) {
      // Keep the same x coords
      char1.newCoords.x = char2.newCoords.x = char1.coords.x
      // Calculate the new y coord for each letter
      char1.newCoords.y = _calcNewCoord(char1.coords.y, isEncoding)
      char2.newCoords.y = _calcNewCoord(char2.coords.y, isEncoding)

    // If the two letters share the same column
    } else if (char1.coords.y === char2.coords.y) {
      // Keep the same y coords
      char1.newCoords.y = char2.newCoords.y = char1.coords.y
      // Calculate the the nex x coord for each letter
      char1.newCoords.x = _calcNewCoord(char1.coords.x, isEncoding)
      char2.newCoords.x = _calcNewCoord(char2.coords.x, isEncoding)

    // The two letters are on a diagonal from one another
    } else {
      char1.newCoords = { x: char1.coords.x, y: char2.coords.y }
      char2.newCoords = { x: char2.coords.x, y: char1.coords.y }
    }

    // Get the letters corresponding to each coord in the grid
    const letter1 = alpha[char1.newCoords.x][char1.newCoords.y]
    const letter2 = alpha[char2.newCoords.x][char2.newCoords.y]
    output += `${letter1}${letter2}`
  }

  if (isEncoding) {
    output = output.replace(/(.{4})/g, '$1 ').trim()
  }

  return output
}

//  HELPER FUNCTIONS for THIS CIPHER ONLY!!
// =============================================================================

//  _getKeyedAlpha
//  Add the key to the alphabet and then convert into a 5x5 array
// -----------------------------------------------------------------------------
function _getKeyedAlpha (key) {
  // Return if we've already generated the grided keyed alphabet
  if (typeof __KEYED_ALPHAS[key] !== 'undefined') {
    return __KEYED_ALPHAS[key]
  }

  // Create the flat keyed alphabet
  const keyedAlpha = utils.makeKeyedAlpha(key)

  // The current index of the keyedAlphabet
  let keyedIdx = 0

  // What size grid are we making
  let alphaGrid = new Array(__KEYED_ARR_SIZE)

  for (let x = 0; x < __KEYED_ARR_SIZE; x += 1) {
    alphaGrid[x] = new Array(__KEYED_ARR_SIZE)

    for (let y = 0; y < __KEYED_ARR_SIZE; y += 1) {
      // If we're not on 'j' in the keyed alphabet then add the
      // current letter in the key to it's position on the grid
      if (keyedAlpha[keyedIdx] !== 'j') {
        alphaGrid[x][y] = keyedAlpha[keyedIdx]
      } else {
        // We encountered and skipped j, so lets NOT count this
        // position as filled on the grid
        y -= 1
      }

      // Move onto the next letter in the keyed alphabet
      keyedIdx += 1
    }
  }

  // Cache this gridded keyed alphabet
  __KEYED_ALPHAS[key] = alphaGrid

  return alphaGrid
}

//  _strToPairs
//  Convert a given string in to an array of pairs
//  X's are used to fill in the missing spot of a pair and also
//  to separate out duplicate letters.
//  Example: Hellos => [[h,e],[l,x],[l,o],[s,x]]
// -----------------------------------------------------------------------------
function _strToPairs (string, isEncoding) {
  let strPairs = []

  if (!isEncoding && string.length % 2 === 1) {
    string += __PLACEHOLDER_CHAR
  }

  for (let i = 0; i < string.length; i += 2) {
    const currLetter = string.charAt(i)
    let nextLetter = string.charAt(i + 1)

    if (isEncoding && (currLetter === nextLetter || nextLetter.length === 0)) {
      nextLetter = __PLACEHOLDER_CHAR
      i -= 1
    }

    strPairs.push([currLetter, nextLetter])
  }

  return strPairs
}

//  _getCoords
//  Get the current coordinates of the letter in the array
// -----------------------------------------------------------------------------
function _getCoords (str, array) {
  const arrSize = array.length

  for (let x = 0; x < arrSize; x += 1) {
    for (let y = 0; y < arrSize; y += 1) {
      if (str === array[x][y]) {
        return { x, y }
      }
    }
  }

  return false
}

//  _calcNewCoord
//  Calculate the new coordinate based on if we're encoding/decoding
// -----------------------------------------------------------------------------
function _calcNewCoord (coord, isEncoding) {
  // Get the last valid index of the array
  const lastArrIdx = __KEYED_ARR_SIZE - 1

  // Add/subtract based on the action we're performing
  let newCoord = (isEncoding) ? (coord + 1) : (coord - 1)

  // Make sure the new coords are within the bounds of the grid
  newCoord = (newCoord > lastArrIdx) ? 0 : newCoord
  newCoord = (newCoord < 0) ? lastArrIdx : newCoord

  return newCoord
}

function _formatChar (alpha, letter) {
  let char = {}

  char.letter = (letter === 'j') ? 'i' : letter
  char.coords = _getCoords(char.letter, alpha)
  char.newCoords = { x: null, y: null }

  return char
}
