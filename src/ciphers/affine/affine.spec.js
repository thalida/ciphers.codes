'use strict'

import { assert } from 'chai'
import * as affine from './affine'

describe('cipher:affine', () => {
  let testStrings = {
    normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
    shiftThree: 'DinsxchmrwbglqvafkpuzejotY - 0123456789'
  }

  let testCases = [
    {
      label: 'should encode with coprime 5 and shift 3',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { coprime: 5, shift: 3 }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.shiftThree,
        errorStr: null
      }
    },
    {
      label: 'should decode with coprime 5 and shift 3',
      args: {
        isEncoding: false,
        inputStr: testStrings.shiftThree,
        inputs: { coprime: 5, shift: 3 }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.normal,
        errorStr: null
      }
    },
    {
      label: 'should encode with coprime 1 and shift 0',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { coprime: 1, shift: 0 }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.normal,
        errorStr: null
      }
    },
    {
      label: 'should decode with coprime 1 and shift 0',
      args: {
        isEncoding: false,
        inputStr: testStrings.normal,
        inputs: { coprime: 1, shift: 0 }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.normal,
        errorStr: null
      }
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let results = affine.run(testCase.args)
      assert.deepEqual(results, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsResults = affine.run()
    let defaultArgsResults = affine.run(affine.DEFAULTS)
    assert.deepEqual(noArgsResults, defaultArgsResults)
  })

  it('should be the same after encode and decode', () => {
    const inputs = { coprime: 7, shift: 20 }
    let encodeResults = affine.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    assert.isTrue(encodeResults.isSuccess)
    assert.isString(encodeResults.outputStr)

    let decodeResults = affine.run({
      isEncoding: false,
      inputStr: encodeResults.outputStr,
      inputs
    })

    let expected = {
      isSuccess: true,
      outputStr: testStrings.normal,
      errorStr: null
    }

    assert.deepEqual(decodeResults, expected)
  })

  it('should encode and decode with sample inputs', () => {
    const inputs = affine.SAMPLE_INPUTS
    assert.containsAllKeys(inputs, ['coprime', 'shift'])

    let encodeResults = affine.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    assert.isTrue(encodeResults.isSuccess)
    assert.isString(encodeResults.outputStr)

    let decodeResults = affine.run({
      isEncoding: false,
      inputStr: encodeResults.outputStr,
      inputs
    })

    let expected = {
      isSuccess: true,
      outputStr: testStrings.normal,
      errorStr: null
    }

    assert.deepEqual(decodeResults, expected)
  })
})
