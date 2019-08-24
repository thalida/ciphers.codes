'use strict'

import { assert } from 'chai'
import * as vigenere from './vigenere'

describe('cipher:vigenere', () => {
  let testStrings = {
    normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
    encodedWithLorem: 'lpthqquymvvzdraaeiwffjnbkk',
    decoded: 'abcdefghijklmnopqrstuvwxyz'
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
      expected: testStrings.decoded
    },
    {
      label: 'should encode with key ""',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { key: '' }
      },
      expected: testStrings.decoded
    },
    {
      label: 'should decode with key ""',
      args: {
        isEncoding: false,
        inputStr: testStrings.normal,
        inputs: { key: '' }
      },
      expected: testStrings.decoded
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let outputStr = vigenere.run(testCase.args)
      assert.equal(outputStr, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsOutputStr = vigenere.run()
    let defaultArgsOutputStr = vigenere.run(vigenere.DEFAULTS)
    assert.equal(noArgsOutputStr, defaultArgsOutputStr)
  })

  it('should be the same after encode and decode', () => {
    const inputs = { key: 'fake' }
    let encodeOutputStr = vigenere.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    let decodeOutputStr = vigenere.run({
      isEncoding: false,
      inputStr: encodeOutputStr,
      inputs
    })
    assert.equal(testStrings.decoded, decodeOutputStr)
  })
})
