'use strict'

import * as utils from '../utils'
import BaseCipher from '../BaseCipher'

// =============================================================================
//
//  Playfair
//  Converts the alphabet into a 5x5 grid of letters and encrypts based
//  on the position of a pair of letters w/ respect to each other in the grid
//
// -----------------------------------------------------------------------------
export class Playfair extends BaseCipher {
  KEY = 'playfair'
  NAME = 'Playfair'
  ABOUT = {
    text: `
      The playfair cipher combines the letters i and j so that the alphabet can
      fit on a 5x5 grid, as a result any "j" you use in your text, will be
      treated like an "i". Read more on how the Playfair cipher is encoded
      and decoded.
    `,
    source: {
      title: 'Wikipedia',
      url: 'http://en.wikipedia.org/wiki/Playfair_cipher'
    }
  }

  DEFAULT_ARGS = {
    isEncoding: true,
    string: '',
    inputs: {
      key: 'ipsum'
    }
  }

  INPUTS = [
    {
      type: 'text',
      name: 'key',
      label: 'Key',
      description: 'Create a key by entering text without using duplicate letters.',
      placeholder: '',
      value: this.DEFAULT_ARGS.inputs.key,
      postProcess: utils.removeDuplicateChars.bind(this)
    }
  ]

  __PLACEHOLDER_CHAR = 'x'
  __KEYED_ARR_SIZE = 5
  __KEYED_ALPHAS = []

  //  @_getKeyedAlpha
  //  Add the key to the alphabet and then convert into a 5x5 array
  // ----------------------------------------------------------------------
  _getKeyedAlpha (key) {
    // Return if we've already generated the grided keyed alphabet
    if (typeof this.__KEYED_ALPHAS[key] !== 'undefined') {
      return this.__KEYED_ALPHAS[key]
    }

    // Create the flat keyed alphabet
    const keyedAlpha = utils.makeKeyedAlpha(key)

    // The current index of the keyedAlphabet
    let keyedIdx = 0

    // What size grid are we making
    let alphaGrid = new Array(this.__KEYED_ARR_SIZE)

    for (let x = 0; x < this.__KEYED_ARR_SIZE; x += 1) {
      alphaGrid[x] = new Array(this.__KEYED_ARR_SIZE)

      for (let y = 0; y < this.__KEYED_ARR_SIZE; y += 1) {
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
    this.__KEYED_ALPHAS[key] = alphaGrid

    return alphaGrid
  }

  //  @_strToPairs
  //  Convert a given string in to an array of pairs
  //  X's are used to fill in the missing spot of a pair and also
  //  to separate out duplicate letters.
  //  Example: Hellos => [[h,e],[l,x],[l,o],[s,x]]
  // ----------------------------------------------------------------------
  _strToPairs (string, isEncoding) {
    let strPairs = []

    if (!isEncoding && string.length % 2 === 1) {
      string += this.__PLACEHOLDER_CHAR
    }

    for (let i = 0; i < string.length; i += 2) {
      const currLetter = string.charAt(i)
      let nextLetter = string.charAt(i + 1)

      if (isEncoding && (currLetter === nextLetter || nextLetter.length === 0)) {
        nextLetter = this.__PLACEHOLDER_CHAR
        i -= 1
      }

      strPairs.push([currLetter, nextLetter])
    }

    return strPairs
  }

  //  @_getCoords
  //  Get the current coordinates of the letter in the array
  // ----------------------------------------------------------------------
  _getCoords (str, array) {
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

  //  @_calcNewCoord
  //  Calculate the new coordinate based on if we're encoding/decoding
  // ----------------------------------------------------------------------
  _calcNewCoord (coord, isEncoding) {
    // Get the last valid index of the array
    const lastArrIdx = this.__KEYED_ARR_SIZE - 1

    // Add/subtract based on the action we're performing
    let newCoord = (isEncoding) ? (coord + 1) : (coord - 1)

    // Make sure the new coords are within the bounds of the grid
    newCoord = (newCoord > lastArrIdx) ? 0 : newCoord
    newCoord = (newCoord < 0) ? lastArrIdx : newCoord

    return newCoord
  }

  _formatChar (alpha, letter) {
    let char = {}

    char.letter = (letter === 'j') ? 'i' : letter
    char.coords = this._getCoords(char.letter, alpha)
    char.newCoords = { x: null, y: null }

    return char
  }

  //  @handleRun
  //  Encodes/Decodes a string w/ the given arguments
  // ----------------------------------------------------------------------
  handleRun ({ isEncoding, inputStr, inputs }) {
    const key = utils.makeValidKey(inputs.key, this.DEFAULT_ARGS.inputs.key)
    // Replace any j's with i's in the key
    const keyword = key.replace(/[j]+/gi, 'i').toLowerCase()
    // Created a grid based keyed version of the alphabet
    const alpha = this._getKeyedAlpha(keyword)

    // Remove any non letter character
    inputStr = inputStr.replace(/[^A-Za-z]+/gi, '').toLowerCase()
    // Replace any j's with i's
    inputStr = inputStr.replace(/[j]+/gi, 'i').toLowerCase()

    // Convert the string to an array of pairs
    const str = this._strToPairs(inputStr, isEncoding)

    let output = ''

    for (let i = 0; i < str.length; i++) {
      // Get the info for the first + second characters of the pair
      const char1 = this._formatChar(alpha, str[i][0])
      const char2 = this._formatChar(alpha, str[i][1])

      // If the two letters are on the same row
      if (char1.coords.x === char2.coords.x) {
        // Keep the same x coords
        char1.newCoords.x = char2.newCoords.x = char1.coords.x
        // Calculate the new y coord for each letter
        char1.newCoords.y = this._calcNewCoord(char1.coords.y, isEncoding)
        char2.newCoords.y = this._calcNewCoord(char2.coords.y, isEncoding)

      // If the two letters share the same column
      } else if (char1.coords.y === char2.coords.y) {
        // Keep the same y coords
        char1.newCoords.y = char2.newCoords.y = char1.coords.y
        // Calculate the the nex x coord for each letter
        char1.newCoords.x = this._calcNewCoord(char1.coords.x, isEncoding)
        char2.newCoords.x = this._calcNewCoord(char2.coords.x, isEncoding)

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
}
