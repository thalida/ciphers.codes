'use strict'

import { assert } from 'chai'
import * as polybiusSquare from './polybiusSquare'

describe('cipher:polybiusSquare', () => {
  let testStrings = {
    normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
    encoded: '11 12 13 14 15 16 21 22 23 24 25 26 31 32 33 34 35 36 41 42 43 44 45 46 51 52 53 54 55 56 61 62 63 64 65 66',
    decoded: 'abcdefghijklmnopqrstuvwxyz0123456789'
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
      expected: testStrings.decoded
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let outputStr = polybiusSquare.run(testCase.args)
      assert.equal(outputStr, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsOutputStr = polybiusSquare.run()
    let defaultArgsOutputStr = polybiusSquare.run(polybiusSquare.DEFAULTS)
    assert.equal(noArgsOutputStr, defaultArgsOutputStr)
  })
})
