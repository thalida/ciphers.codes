'use strict'

import { assert } from 'chai'
import * as keyedSubstitution from './keyedSubstitution'

describe('cipher:keyedSubstitution', () => {
  let testStrings = {
    normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
    keyedWithLorem: 'LoremabcdfghijknpqstuvwxyZ - 0123456789'
  }

  let testCases = [
    {
      label: 'should encode with key "lorem"',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { key: 'lorem' }
      },
      expected: testStrings.keyedWithLorem
    },
    {
      label: 'should decode with key "lorem"',
      args: {
        isEncoding: false,
        inputStr: testStrings.keyedWithLorem,
        inputs: { key: 'lorem' }
      },
      expected: testStrings.normal
    },
    {
      label: 'should encode with key ""',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal,
        inputs: { key: '' }
      },
      expected: testStrings.normal
    },
    {
      label: 'should decode with key ""',
      args: {
        isEncoding: false,
        inputStr: testStrings.normal,
        inputs: { key: null }
      },
      expected: testStrings.normal
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let outputStr = keyedSubstitution.run(testCase.args)
      assert.equal(outputStr, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsOutputStr = keyedSubstitution.run()
    let defaultArgsOutputStr = keyedSubstitution.run(keyedSubstitution.DEFAULTS)
    assert.equal(noArgsOutputStr, defaultArgsOutputStr)
  })

  it('should be the same after encode and decode', () => {
    const inputs = { key: 'hide' }
    let encodeOutputStr = keyedSubstitution.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    let decodeOutputStr = keyedSubstitution.run({
      isEncoding: false,
      inputStr: encodeOutputStr,
      inputs
    })
    assert.equal(testStrings.normal, decodeOutputStr)
  })
})
