'use strict'

import * as utils from '../utils'

// =============================================================================
//
//  Caesar Cipher
//  This cipher shifts the letters in the alphabet by x (user defined value)
//
// -----------------------------------------------------------------------------
export class Caesar {
  NAME = 'caesar'
  LABEL = 'Caesar'
  DESC = {
    text: `
      A simple substitution cipher in which the alphabet is shifted up or down a
      specified number of positions.
    `,
    source: {
      title: 'Wikipedia',
      url: 'http://en.wikipedia.org/wiki/Caesar_cipher'
    }
  }

  DEFAULT_ARGS = {
    isEncoding: true,
    string: '',
    inputs: {
      shift: 2
    }
  }

  INPUTS = [
    {
      name: 'shift',
      label: 'Shift by',
      description: 'Enter a number (positive/negative) to shift the alphabet by.',
      type: Number,
      default: this.DEFAULT_ARGS.inputs.shift
    }
  ]

  //  @run
  //  Encodes/Decodes a string w/ the given arguments
  // ----------------------------------------------------------------------
  run (args) {
    const opts = utils.extendCopy(this.DEFAULT_ARGS, args)
    const alpha = utils.getAlpha()
    const shift = utils.makeValidInt(opts.inputs.shift, this.DEFAULT_ARGS.inputs.shift)

    let output = ''

    utils.forEachCharacter(opts.string, (i, char, isUpper) => {
      if (utils.isLetter(char)) {
        // The current position of the letter in the alphabet
        const letterPos = alpha.indexOf(char.toLowerCase())

        // Which direction are we moving? (addition/subtraction)
        const direction = (opts.isEncoding) ? 1 : -1

        // Get the new letter position by shifting in the given direction
        let newLetterPos = letterPos + (direction * shift)

        // Mod the new position in case we've gone past the bounds of the alphabet
        newLetterPos = utils.mod(newLetterPos, utils.TOTAL_ALPHA)

        char = alpha[newLetterPos]
      }

      output += utils.setCase(char, isUpper)
    })

    return output
  }
}
