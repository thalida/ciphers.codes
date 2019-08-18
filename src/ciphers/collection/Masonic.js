'use strict'

import * as utils from '../utils'
import BaseCipher from '../BaseCipher'

// =============================================================================
//
//  Mason
//  Converts each letter into a symbol based on its position in a grid
//  A special font is being used for this cipher, so it currently
//  just return the letter as is
//
// -----------------------------------------------------------------------------
export default class Masonic extends BaseCipher {
  KEY = 'mason'
  NAME = 'Masonic'
  ABOUT = {
    text: `
      A geometric simple substitution cipher which exchanges letters for symbols
      which are fragments of a grid.
    `,
    source: {
      title: 'Wikipedia',
      url: 'http://en.wikipedia.org/wiki/Pigpen_cipher'
    }
  }

  DEFAULT_ARGS = {
    isEncoding: true,
    string: ''
  }

  __USE_FONT = true

  //  @handleRun
  //  Encodes/Decodes a string w/ the given arguments
  // ----------------------------------------------------------------------
  handleRun ({ isEncoding, inputStr }) {
    if (this.__USE_FONT) {
      return inputStr
    }

    let output = ''

    utils.forEachCharacter(inputStr, (i, char) => {
      char = char.toLowerCase()
      if (isEncoding && char.match(/^[a-z]$/)) {
        char = '<span class="mason_text">' + char + '</span>'
      }
      output += char
    })

    return output
  }
}
