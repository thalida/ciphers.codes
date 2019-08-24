'use strict'

import { assert } from 'chai'
import * as caesar from './caesar'

describe('cipher:caesar', () => {
  let testStrings = {
    normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
    shiftThree: 'DefghijklmnopqrstuvwxyzabC - 0123456789'
  }

  let testCases = [
    {
      label: 'should encode with shift 3',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { shift: 3 }
      },
      expected: testStrings.shiftThree
    },
    {
      label: 'should decode with shift 3',
      args: {
        isEncoding: false,
        inputStr: testStrings.shiftThree,
        inputs: { shift: 3 }
      },
      expected: testStrings.normal
    },
    {
      label: 'should encode with shift 0',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { shift: 0 }
      },
      expected: testStrings.normal
    },
    {
      label: 'should decode with shift 0',
      args: {
        isEncoding: false,
        inputStr: testStrings.normal,
        inputs: { shift: 0 }
      },
      expected: testStrings.normal
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let outputStr = caesar.run(testCase.args)
      assert.equal(outputStr, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsOutputStr = caesar.run()
    let defaultArgsOutputStr = caesar.run(caesar.DEFAULTS)
    assert.equal(noArgsOutputStr, defaultArgsOutputStr)
  })

  it('should be the same after encode and decode', () => {
    const inputs = { shift: 15 }
    let encodeOutputStr = caesar.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    let decodeOutputStr = caesar.run({
      isEncoding: false,
      inputStr: encodeOutputStr,
      inputs
    })
    assert.equal(testStrings.normal, decodeOutputStr)
  })
})
