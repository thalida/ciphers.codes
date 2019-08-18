'use strict'

import { assert, expect } from 'chai'
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
    expect(noArgsOutputStr).equal(defaultArgsOutputStr)
  })
})
