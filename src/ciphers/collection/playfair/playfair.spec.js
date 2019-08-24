'use strict'

import { assert } from 'chai'
import * as playfair from './playfair'

describe('cipher:playfair', () => {
  let testStrings = {
    normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
    encodedWithLorem: 'bcdf mdhi srkn olhm qscx upwx yzvy',
    decodedWithLorem: 'abcdefghixiklmnopqrstuvwxyzx'
  }

  let testCases = [
    {
      label: 'should encode with key "lorem"',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { key: 'lorem' }
      },
      expected: testStrings.encodedWithLorem
    },
    {
      label: 'should decode with key "lorem"',
      args: {
        isEncoding: false,
        inputStr: testStrings.encodedWithLorem,
        inputs: { key: 'lorem' }
      },
      expected: testStrings.decodedWithLorem
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let outputStr = playfair.run(testCase.args)
      assert.equal(outputStr, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsOutputStr = playfair.run()
    let defaultArgsOutputStr = playfair.run(playfair.DEFAULTS)
    assert.equal(noArgsOutputStr, defaultArgsOutputStr)
  })
})
