'use strict'

import { assert } from 'chai'
import * as atbash from './atbash'

describe('cipher:atbash', () => {
  let testStrings = {
    normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
    encoded: 'ZyxwvutsrqponmlkjihgfedcbA - 0123456789'
  }

  let testCases = [
    {
      label: 'should encode',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal
      },
      expected: testStrings.encoded
    },
    {
      label: 'should decode',
      args: {
        isEncoding: false,
        inputStr: testStrings.encoded
      },
      expected: testStrings.normal
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let outputStr = atbash.run(testCase.args)
      assert.equal(outputStr, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsOutputStr = atbash.run()
    let defaultArgsOutputStr = atbash.run(atbash.DEFAULTS)
    assert.equal(noArgsOutputStr, defaultArgsOutputStr)
  })

  it('should be the same after encode and decode', () => {
    let encodeOutputStr = atbash.run({
      isEncoding: true,
      inputStr: testStrings.normal
    })

    let decodeOutputStr = atbash.run({
      isEncoding: false,
      inputStr: encodeOutputStr
    })

    assert.equal(testStrings.normal, decodeOutputStr)
  })
})
