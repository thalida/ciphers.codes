'use strict'

import { assert } from 'chai'
import * as caesar from './caesar'

describe('cipher:caesar', () => {
  let testStrings = {
    normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
    shiftThree: 'DefghijklmnopqrstuvwxyzabC - 0123456789',
    notLetters: '!@#$ 01234'
  }

  let testCases = [
    {
      label: 'should encode with shift 3',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { shift: 3 }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.shiftThree,
        errorStr: null
      }
    },
    {
      label: 'should decode with shift 3',
      args: {
        isEncoding: false,
        inputStr: testStrings.shiftThree,
        inputs: { shift: 3 }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.normal,
        errorStr: null
      }
    },
    {
      label: 'should encode with shift 0',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { shift: 0 }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.normal,
        errorStr: null
      }
    },
    {
      label: 'should decode with shift 0',
      args: {
        isEncoding: false,
        inputStr: testStrings.normal,
        inputs: { shift: 0 }
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.normal,
        errorStr: null
      }
    },
    {
      label: 'should error on encode with all special chars and numbers',
      args: {
        isEncoding: true,
        inputStr: testStrings.notLetters
      },
      expected: {
        isSuccess: false,
        outputStr: null,
        errorStr: `Caesar requires an input with at least one letter.`
      }
    },
    {
      label: 'should error on decode with all special chars and numbers',
      args: {
        isEncoding: false,
        inputStr: testStrings.notLetters
      },
      expected: {
        isSuccess: false,
        outputStr: null,
        errorStr: `Caesar requires an input with at least one letter.`
      }
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let outputResults = caesar.run(testCase.args)
      assert.deepEqual(outputResults, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsResults = caesar.run()
    let defaultArgsResults = caesar.run(caesar.DEFAULTS)
    assert.deepEqual(noArgsResults, defaultArgsResults)
  })

  it('should be the same after encode and decode', () => {
    const inputs = { shift: 15 }

    let encodeResults = caesar.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    assert.isTrue(encodeResults.isSuccess)
    assert.isString(encodeResults.outputStr)

    let decodeResults = caesar.run({
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
    const inputs = caesar.SAMPLE_INPUTS
    assert.containsAllKeys(inputs, ['shift'])

    let encodeResults = caesar.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    assert.isTrue(encodeResults.isSuccess)
    assert.isString(encodeResults.outputStr)

    let decodeResults = caesar.run({
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
