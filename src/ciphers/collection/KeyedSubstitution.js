'use strict'

import * as utils from '../utils'
import BaseCipher from '../BaseCipher'

// =============================================================================
//
//  Keyed Substitution
//  A key is placed in the beginning of the alphabet and the strings are
//  encoded based on the position of the letters in this keyed alphabet.
//
// -----------------------------------------------------------------------------
export default class KeyedSubstitution extends BaseCipher {
  KEY = 'keyed_substitution'
  NAME = 'Keyed Substitution'
  ABOUT = {
    text: `
      A monoalphabetic substitution cipher, where a keyword placed into
      beginning of the alphabet, and any duplicated letters are removed.
    `,
    source: {
      title: 'Wikipedia',
      url: 'http://en.wikipedia.org/wiki/Keyword_cipher'
    }
  }

  DEFAULT_ARGS = {
    isEncoding: true,
    string: '',
    inputs: {
      key: 'lorem'
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

  //  @handleRun
  //  Encodes/Decodes a string w/ the given arguments
  // ----------------------------------------------------------------------
  handleRun ({ isEncoding, inputStr, inputs }) {
    const alpha = utils.ALPHA
    const key = utils.makeValidKey(inputs.key, this.DEFAULT_ARGS.inputs.key)

    // Create an alphabet w/ this key in the beginning of it
    var keyedAlpha = utils.makeKeyedAlpha(key)

    let output = ''

    utils.forEachCharacter(inputStr, (i, char, isUpper) => {
      if (utils.isLetter(char)) {
        // Figure out what alphabet the current string is based on
        var letterArr = (isEncoding) ? alpha : keyedAlpha

        // What alphabet are we converting the string to
        var encodedLetterArr = (isEncoding) ? keyedAlpha : alpha

        // Get the current position of the letter in the array
        var letterPos = letterArr.indexOf(char.toLowerCase())

        // Get the letter in the same position of the encoded Alphabet
        char = encodedLetterArr[letterPos]
      }

      output += utils.setCase(char, isUpper)
    })

    return output
  }
}
