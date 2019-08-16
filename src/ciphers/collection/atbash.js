'use strict'

import * as utils from '../utils'

// =============================================================================
//
//  Atbash
//  A simple cipher wherein the alphabet is reversed.
//
// -----------------------------------------------------------------------------
export class Atbash {
  NAME = 'atbash'
  LABEL = 'Atbash'
  DESC = {
    text: `
      A simple substitution cipher originally created for the Hebrew alphabet,
      when converted to work with the Latin Alphabet (abc), this cipher reverses
      the alphabet so that the cipher alphabet is now "zyxwvutsrqponmlkjihgfedcba".
    `,
    source: {
      title: 'Wikipedia',
      url: 'http://en.wikipedia.org/wiki/Atbash'
    }
  }

  DEFAULT_ARGS = {
    isEncoding: true,
    string: ''
  }

  //  @run
  //  Encodes/Decodes a string w/ the given arguments
  // ----------------------------------------------------------------------
  run (args) {
    const opts = utils.extendCopy(this.DEFAULT_ARGS, args)
    const alpha = utils.getAlpha()

    let output = ''

    utils.forEachCharacter(opts.string, (i, char, isUpper) => {
      if (utils.isLetter(char)) {
        // Get the current position in the alphabet
        const letterPos = alpha.indexOf(char.toLowerCase())

        // Get the position from the other end of the alphabet
        const newLetterPos = utils.TOTAL_ALPHA - letterPos - 1

        char = alpha[newLetterPos]
      }

      // If the character was uppercase, make it so again
      output += utils.setCase(char, isUpper)
    })

    return output
  }
}
