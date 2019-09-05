'use strict'

import { assert } from 'chai'
import * as playfair from './playfair'

describe('cipher:playfair', () => {
  let testStrings = {
    normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789 - hi! this is my sentence.',
    encodedWithLorem: 'BcdfmdhisrknolhmqscxupwxyzW - 0123456789 - nk! sikx su rx tmkydifry.',
    decodedWithLorem: 'AbcdefghixiklmnopqrstuvwxyZ - 0123456789 - hi! this is my sentencex.'
  }

  let testCases = [
    {
      label: 'should encode with key "lorem"',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { key: 'lorem' }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.encodedWithLorem,
        errorStr: null
      }
    },
    {
      label: 'should decode with key "lorem"',
      args: {
        isEncoding: false,
        inputStr: testStrings.encodedWithLorem,
        inputs: { key: 'lorem' }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.decodedWithLorem,
        errorStr: null
      }
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let results = playfair.run(testCase.args)
      assert.deepEqual(results, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsResults = playfair.run()
    let defaultArgsResults = playfair.run(playfair.DEFAULTS)
    assert.deepEqual(noArgsResults, defaultArgsResults)
  })

  it('should encode and decode with sample inputs', () => {
    const inputs = playfair.SAMPLE_INPUTS
    assert.containsAllKeys(inputs, ['key'])

    let encodeResults = playfair.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    assert.isTrue(encodeResults.isSuccess)
    assert.isString(encodeResults.outputStr)

    let decodeResults = playfair.run({
      isEncoding: false,
      inputStr: encodeResults.outputStr,
      inputs
    })

    let expected = {
      isSuccess: true,
      outputStr: testStrings.decodedWithLorem,
      errorStr: null
    }

    assert.deepEqual(decodeResults, expected)
  })
})
