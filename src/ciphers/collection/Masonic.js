'use strict'

import * as utils from '../utils'

// =============================================================================
//
//  Mason
//  Converts each letter into a symbol based on its position in a grid
//  A special font is being used for this cipher, so it currently
//  just return the letter as is
//
// -----------------------------------------------------------------------------
export class Masonic {
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
    string: '',
    useFont: true
  }

  //  @run
  //  Encodes/Decodes a string w/ the given arguments
  // ----------------------------------------------------------------------
  run (args) {
    const opts = Object.assign({}, this.DEFAULT_ARGS, args)

    if (opts.useFont) {
      return opts.string
    }

    let output = ''

    utils.forEachCharacter(opts.string, (i, char) => {
      char = char.toLowerCase()
      if (opts.isEncoding && char.match(/^[a-z]$/)) {
        char = '<span class="mason_text">' + char + '</span>'
      }
      output += char
    })

    return output
  }
}
