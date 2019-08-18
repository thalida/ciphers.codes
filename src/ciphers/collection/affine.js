'use strict'

import * as utils from '../utils'
import BaseCipher from '../BaseCipher'

// =============================================================================
//
//  Affine
//  A simple shift cipher based on the Caesar cipher
//
// -----------------------------------------------------------------------------
export default class Affine extends BaseCipher {
  KEY = 'affine'
  NAME = 'Affine'
  ABOUT = {
    text: `
      The affine cipher is a type of monoalphabetic substitution cipher,
      wherein each letter in an alphabet is mapped to its numeric equivalent,
      encrypted using a simple mathematical function, and converted back to a
      letter.
    `,
    source: {
      title: 'Wikipedia',
      url: 'http://en.wikipedia.org/wiki/Affine_cipher'
    }
  }

  DEFAULT_ARGS = {
    isEncoding: true,
    string: '',
    inputs: {
      shift: 2,
      coprime: 5
    }
  }

  __ALLOWED_COPRIMES = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]

  INPUTS = [
    {
      type: 'select',
      name: 'coprime',
      label: 'Co-prime',
      description: 'The coprimes of 26 are: ' + this.__ALLOWED_COPRIMES.join(', '),
      value: this.DEFAULT_ARGS.inputs.coprime,
      options: this.__ALLOWED_COPRIMES,
      validate: this.validateCoprime.bind(this)
    },
    {
      type: 'number',
      name: 'shift',
      label: 'Shift',
      description: 'Enter a number (positive/negative) to shift the alphabet by.',
      value: this.DEFAULT_ARGS.inputs.shift
    }
  ]

  validateCoprime (n) {
    return this.__ALLOWED_COPRIMES.indexOf(parseInt(n, 10)) >= 0
  }

  //  @handleRun
  //  Encodes/Decodes a string w/ the given arguments
  // ----------------------------------------------------------------------
  handleRun ({ isEncoding, inputStr, inputs }) {
    const alpha = utils.ALPHA
    const shift = utils.makeValidInt(inputs.shift, this.DEFAULT_ARGS.inputs.shift)
    const coprime = utils.makeValidInt(inputs.coprime, this.DEFAULT_ARGS.inputs.coprime)

    let output = ''

    utils.forEachCharacter(inputStr, (i, char, isUpper) => {
      // If the current character is a letter, get the new position
      // of the letter in the alphabet based on if we are encoding/decoding
      if (utils.isLetter(char)) {
        let letterPos = alpha.indexOf(char.toLowerCase())
        let newLetterPos = 0

        if (isEncoding) {
          newLetterPos = (coprime * letterPos) + shift
        } else {
          newLetterPos = (utils.TOTAL_ALPHA - coprime) * (letterPos - shift)
        }

        // The new letter position may be out of bounds,
        // mod the letter to get the valid position.
        newLetterPos = utils.mod(newLetterPos, utils.TOTAL_ALPHA)
        char = alpha[newLetterPos]
      }

      // If the character was originally uppercase, make it uppercase again
      output += utils.setCase(char, isUpper)
    })

    return output
  }
}
