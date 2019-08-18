'use strict'

import * as utils from '../utils'

// =============================================================================
//
//  Polybius Square
//  The alphanumeric array is layed out in a 6x6 grid and each letter
//  corresponded to it's coordinates in the gri.
//  Example: a => 11, b => 12, c => 13 etc
//
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

export const DEFAULTS = {
  isEncoding: true,
  string: ''
}

export function run ({ isEncoding, inputStr }) {
  isEncoding = (typeof isEncoding === 'boolean')
    ? isEncoding
    : DEFAULTS.isEncoding

  const alphanumeric = utils.ALPHANUMERIC
  const alphagrid = utils.ALPHAGRID
  const alphaGridSize = alphagrid.length - 1 // the 0 index isn't used

  let output = ''

  // Remove all spaces from the string
  inputStr = inputStr.replace(/[\s]+/gi, '')

  // If we're encoding we need to go trough letter by letter. BUT,
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
        output += `${x}${y} `
      }
    } else {
      // Get the x and y "characters" ex. 13 => x: 1, y: 3
      const x = char
      const y = inputStr.charAt(i + 1)

      // Check if the x, y are valid numbers/a valid pair
      if (x.match(/^[1-6]$/) && y.match(/^[1-6]$/)) {
        // Find the letter in the grid
        var letter = alphagrid[x][y]
        if (typeof letter !== 'undefined') {
          output += letter
        }
      }
    }
  })

  return output.trim()
}
