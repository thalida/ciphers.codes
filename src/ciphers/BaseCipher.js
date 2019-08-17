'use strict'

// import * as utils from './utils'

export default class BaseCipher {
  //  @run
  //  Encodes/Decodes a string w/ the given arguments
  // ----------------------------------------------------------------------
  run ({ isEncoding, inputStr, inputs }) {
    isEncoding = (typeof isEncoding === 'boolean')
      ? isEncoding
      : this.DEFAULT_ARGS.isEncoding

    inputStr = (typeof inputStr === 'string')
      ? inputStr
      : this.DEFAULT_ARGS.inputStr

    if (typeof this.DEFAULT_ARGS.inputs !== 'undefined') {
      inputs = Object.assign({}, this.DEFAULT_ARGS.inputs, inputs)
    } else {
      inputs = null
    }

    return this.handleRun({ isEncoding, inputStr, inputs })
  }
}
