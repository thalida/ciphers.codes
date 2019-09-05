'use strict'

import * as utils from '@/ciphers/utils'

// =============================================================================
//
//  Polybius Square
//  The alphanumeric array is layed out in a 6x6 grid and each letter
//  corresponded to it's coordinates in the gri.
//  Example: a => 11, b => 12, c => 13 etc
//
// =============================================================================
//  About this Cipher
// -----------------------------------------------------------------------------
export const KEY = 'polybius_square'
export const NAME = 'Polybius Square'
export const ABOUT = {
  text: `A cipher where each alphanumeric (a-z, 0-9) character is represented by it's coordinates in a grid. `,
  source: {
    title: 'Wikipedia',
    url: 'http://en.wikipedia.org/wiki/Polybius_square'
  }
}

//  Local Variables
// -----------------------------------------------------------------------------
const __ENCODE_REGEX = /([a-zA-Z0-9]+)/gm
const __DECODE_REGEX = /^[1-6]{2}(\s[1-6]{2})*$/

//  Default Arguments
// -----------------------------------------------------------------------------
export const DEFAULTS = {
  isEncoding: true,
  inputStr: ''
}

//  Main Run Function
//  Returns the encoded / decoded string based on the cipher rules
// -----------------------------------------------------------------------------
export function run (args) {
  let { isEncoding, inputStr } = utils.parseCipherArgs(args, DEFAULTS)
  let output = ''

  const space = ' '
  const alphanumeric = utils.ALPHANUMERIC
  const alphagrid = utils.ALPHAGRID
  const alphaGridSize = alphagrid.length - 1 // the 0 index isn't used

  inputStr = inputStr.trim()

  if (isEncoding && inputStr.match(__ENCODE_REGEX) === null) {
    return {
      isSuccess: false,
      outputStr: null,
      errorStr: `${NAME} requires an input with at least one letter or number. (It cannot handle special characters.)`
    }
  }

  if (!isEncoding && __DECODE_REGEX.test(inputStr) === false) {
    return {
      isSuccess: false,
      outputStr: null,
      errorStr: `${NAME} requires an input with using only numbers 1-6, in pairs, and separated by spaces. For example: 15 46 11 31 34 26 15.`
    }
  }

  // Remove all spaces from the string
  inputStr = inputStr.replace(/[\s]+/gi, '')

  // If we're encoding we need to go through letter by letter. BUT,
  // If we're decoding we need to get each pair of numbers.
  const increment = (isEncoding) ? 1 : 2
  utils.forEachCharacter(inputStr, increment, (i, char) => {
    if (isEncoding) {
      // Find the character in the alphanumeric array, and based
      // on it's position calculate the x and y coords in the grid
      char = char.toLowerCase()
      if (char.match(/^[a-z0-9]$/)) {
        const letterPos = alphanumeric.indexOf(char.toString()) + 1
        const x = Math.ceil(letterPos / alphaGridSize)
        const y = (letterPos % alphaGridSize === 0) ? alphaGridSize : letterPos % alphaGridSize
        output += `${x}${y}${space}`
      }
    } else {
      // Get the x and y "characters" ex. 13 => x: 1, y: 3
      const x = char
      const y = inputStr.charAt(i + 1)
      // Find the letter in the grid
      output += alphagrid[x][y]
    }
  })

  return {
    isSuccess: true,
    outputStr: output.trim(),
    errorStr: null
  }
}
