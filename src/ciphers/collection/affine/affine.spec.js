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
      expected: testStrings.shiftThree
    },
    {
      label: 'should decode with coprime 5 and shift 3',
      args: {
        isEncoding: false,
        inputStr: testStrings.shiftThree,
        inputs: { coprime: 5, shift: 3 }
      },
      expected: testStrings.normal
    },
    {
      label: 'should encode with coprime 1 and shift 0',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { coprime: 1, shift: 0 }
      },
      expected: testStrings.normal
    },
    {
      label: 'should decode with coprime 1 and shift 0',
      args: {
        isEncoding: false,
        inputStr: testStrings.normal,
        inputs: { coprime: 1, shift: 0 }
      },
      expected: testStrings.normal
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let outputStr = affine.run(testCase.args)
      assert.equal(outputStr, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsOutputStr = affine.run()
    let defaultArgsOutputStr = affine.run(affine.DEFAULTS)
    assert.equal(noArgsOutputStr, defaultArgsOutputStr)
  })

  it('should be the same after encode and decode', () => {
    const inputs = { coprime: 7, shift: 20 }
    let encodeOutputStr = affine.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    let decodeOutputStr = affine.run({
      isEncoding: false,
      inputStr: encodeOutputStr,
      inputs
    })
    assert.equal(testStrings.normal, decodeOutputStr)
  })

  it('should encode and decode with sample inputs', () => {
    const inputs = affine.SAMPLE_INPUTS
    assert.containsAllKeys(inputs, ['coprime', 'shift'])

    let encodeOutputStr = affine.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    let decodeOutputStr = affine.run({
      isEncoding: false,
      inputStr: encodeOutputStr,
      inputs
    })

    assert.equal(testStrings.normal, decodeOutputStr)
  })
})
