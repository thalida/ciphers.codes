'use strict'

import * as utils from '../utils'
import BaseCipher from '../BaseCipher'

// =============================================================================
//
//  Vigenère
//
// -----------------------------------------------------------------------------
export class Vigenere extends BaseCipher {
  KEY = 'vigenere'
  NAME = 'Vigenère'
  ABOUT = {
    text: `
      A simple polyalphabetic substitution cipher which uses a tableau
      composed of each of the 26 options for a Caesar Cipher.
    `,
    source: {
      title: 'Wikipedia',
      url: 'http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher'
    }
  }

  DEFAULT_ARGS = {
    isEncoding: true,
    string: '',
    inputs: {
      key: 'private'
    }
  }

  INPUTS = [
    {
      type: String,
      name: 'key',
      label: 'Key',
      description: 'Create a key by entering text without using duplicate letters.',
      placeholder: '',
      default: this.DEFAULT_ARGS.inputs.key
    }
  ]

  //  @handleRun
  //  Encodes/Decodes a string w/ the given arguments
  // ----------------------------------------------------------------------
  handleRun ({ isEncoding, inputStr, inputs }) {
    const alpha = utils.ALPHA

    // Remove any non letter characters from the string
    const string = inputStr.replace(/[^A-Za-z]+/gi, '').toLowerCase()

    const keyBase = utils
      .makeValidKey(inputs.key, this.DEFAULT_ARGS.inputs.key)
      // Remove any spaces from the key
      .replace(/[\s]+/gi, '').toLowerCase()

    let key = ''
    let output = ''

    while (key.length < string.length && keyBase.length > 0) {
      utils.forEachCharacter(keyBase, (i, char) => {
        if (key.length >= string.length) {
          return
        }
        key += char
      })
    }

    utils.forEachCharacter(string, (i, char) => {
      const direction = (isEncoding) ? 1 : -1

      // Get the position of the character in the alphabet
      const alphaPos = alpha.indexOf(char)

      // Get the char in the key at this position
      // Then get the position of that character in the regular alphabet
      let keyPos = alpha.indexOf(key.charAt(i))
      keyPos = (keyPos === -1) ? 0 : keyPos

      const pos = alphaPos + (direction * keyPos)

      output += alpha[utils.mod(pos, utils.TOTAL_ALPHA)]
    })

    return output
  }
}
