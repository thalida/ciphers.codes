'use strict'

import { assert } from 'chai'
import * as playfair from './playfair'

describe('cipher:playfair', () => {
  let testStrings = {
    normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
    allNumbers: '0123456789',
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
    },
    {
      label: 'should error on all invalid string with key "lorem"',
      args: {
        isEncoding: true,
        inputStr: testStrings.allNumbers,
        inputs: { key: 'lorem' }
      },
      expected: {
        isSuccess: false,
        outputStr: null,
        errorStr: `Sorry, the entered string contains all non-letter characters which Playfair cipher cannot handle.`
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
      outputStr: 'abcdefghixiklmnopqrstuvwxyzx',
      errorStr: null
    }

    assert.deepEqual(decodeResults, expected)
  })
})
