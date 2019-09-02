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
        outputStr: testStrings.decoded,
        errorStr: null
      }
    },
    {
      label: 'should encode with key ""',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { key: '' }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.decoded,
        errorStr: null
      }
    },
    {
      label: 'should decode with key ""',
      args: {
        isEncoding: false,
        inputStr: testStrings.normal,
        inputs: { key: '' }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.decoded,
        errorStr: null
      }
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let results = vigenere.run(testCase.args)
      assert.deepEqual(results, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsResults = vigenere.run()
    let defaultArgsResults = vigenere.run(vigenere.DEFAULTS)
    assert.deepEqual(noArgsResults, defaultArgsResults)
  })

  it('should be the same after encode and decode', () => {
    const inputs = { key: 'fake' }
    let encodeResults = vigenere.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    assert.isTrue(encodeResults.isSuccess)
    assert.isString(encodeResults.outputStr)

    let decodeResults = vigenere.run({
      isEncoding: false,
      inputStr: encodeResults.outputStr,
      inputs
    })

    let expected = {
      isSuccess: true,
      outputStr: testStrings.decoded,
      errorStr: null
    }

    assert.deepEqual(decodeResults, expected)
  })

  it('should encode and decode with sample inputs', () => {
    const inputs = vigenere.SAMPLE_INPUTS
    assert.containsAllKeys(inputs, ['key'])

    let encodeResults = vigenere.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    assert.isTrue(encodeResults.isSuccess)
    assert.isString(encodeResults.outputStr)

    let decodeResults = vigenere.run({
      isEncoding: false,
      inputStr: encodeResults.outputStr,
      inputs
    })

    let expected = {
      isSuccess: true,
      outputStr: testStrings.decoded,
      errorStr: null
    }

    assert.deepEqual(decodeResults, expected)
  })
})
