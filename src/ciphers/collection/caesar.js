'use strict'

import * as utils from '../utils'
import BaseCipher from '../BaseCipher'

// =============================================================================
//
//  Caesar Cipher
//  This cipher shifts the letters in the alphabet by x (user defined value)
//
// -----------------------------------------------------------------------------
export class Caesar extends BaseCipher {
  KEY = 'caesar'
  NAME = 'Caesar'
  ABOUT = {
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
    inputStr: '',
    inputs: {
      shift: 2
    }
  }

  INPUTS = [
    {
      type: 'number',
      name: 'shift',
      label: 'Shift by',
      description: 'Enter a number (positive/negative) to shift the alphabet by.',
      value: this.DEFAULT_ARGS.inputs.shift
    }
  ]

  //  @handleRun
  //  Encodes/Decodes a string w/ the given arguments
  // ----------------------------------------------------------------------
  handleRun ({ isEncoding, inputStr, inputs }) {
    const alpha = utils.ALPHA
    const shift = utils.makeValidInt(inputs.shift, this.DEFAULT_ARGS.inputs.shift)

    let output = ''

    utils.forEachCharacter(inputStr, (i, char, isUpper) => {
      if (utils.isLetter(char)) {
        // The current position of the letter in the alphabet
        const letterPos = alpha.indexOf(char.toLowerCase())

        // Which direction are we moving? (addition/subtraction)
        const direction = (isEncoding) ? 1 : -1

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
