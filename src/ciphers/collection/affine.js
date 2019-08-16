'use strict'

import * as utils from '../utils'

// =============================================================================
//
//  Affine
//  A simple shift cipher based on the Caesar cipher
//
// -----------------------------------------------------------------------------
export class Affine {
  NAME = 'affine'
  LABEL = 'Affine'
  DESC = {
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

  ALLOWED_COPRIMES = [1, 3, 5, 7, 9, 11, 15, 17, 19, 21, 23, 25]

  INPUTS = [
    {
      name: 'coprime',
      label: 'Co-prime',
      description: 'The coprimes of 26 are: ' + this.ALLOWED_COPRIMES.join(', '),
      type: Number,
      default: this.DEFAULT_ARGS.inputs.coprime,
      validation: this.validateCoprime
    },
    {
      name: 'shift',
      label: 'Shift',
      description: 'Enter a number (positive/negative) to shift the alphabet by.',
      type: Number,
      default: this.DEFAULT_ARGS.inputs.shift
    }
  ]

  validateCoprime (n) {
    return this.ALLOWED_COPRIMES.indexOf(parseInt(n, 10)) >= 0
  }

  //  @run
  //  Encodes/Decodes a string w/ the given arguments
  // ----------------------------------------------------------------------
  run (args) {
    const opts = utils.extendCopy(this.DEFAULT_ARGS, args)
    const alpha = utils.getAlpha()
    const shift = utils.makeValidInt(opts.inputs.shift, this.DEFAULT_ARGS.inputs.shift)
    const coprime = utils.makeValidInt(opts.inputs.coprime, this.DEFAULT_ARGS.inputs.coprime)

    let output = ''

    utils.forEachCharacter(opts.string, (i, char, isUpper) => {
      // If the current character is a letter, get the new position
      // of the letter in the alphabet based on if we are encoding/decoding
      if (utils.isLetter(char)) {
        let letterPos = alpha.indexOf(char.toLowerCase())
        let newLetterPos = 0

        if (opts.isEncoding) {
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
