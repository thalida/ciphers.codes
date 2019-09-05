'use strict'

import { assert } from 'chai'
import * as masonic from './masonic'

describe('cipher:masonic', () => {
  let testStrings = {
    normal: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
    useFontTrue: 'AbcdefghijklmnopqrstuvwxyZ - 0123456789',
    useFontFalse: '<span class="masonic">a</span><span class="masonic">b</span><span class="masonic">c</span><span class="masonic">d</span><span class="masonic">e</span><span class="masonic">f</span><span class="masonic">g</span><span class="masonic">h</span><span class="masonic">i</span><span class="masonic">j</span><span class="masonic">k</span><span class="masonic">l</span><span class="masonic">m</span><span class="masonic">n</span><span class="masonic">o</span><span class="masonic">p</span><span class="masonic">q</span><span class="masonic">r</span><span class="masonic">s</span><span class="masonic">t</span><span class="masonic">u</span><span class="masonic">v</span><span class="masonic">w</span><span class="masonic">x</span><span class="masonic">y</span><span class="masonic">z</span> - 0123456789'
  }

  let testCases = [
    {
      label: 'should encode with useFont true',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal
      },
      useFont: true,
      expected: {
        isSuccess: true,
        outputStr: testStrings.useFontTrue,
        errorStr: null
      }
    },
    {
      label: 'should encode with useFont false',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal
      },
      useFont: false,
      expected: {
        isSuccess: true,
        outputStr: testStrings.useFontFalse,
        errorStr: null
      }
    },
    {
      label: 'should decode with useFont null',
      args: {
        isEncoding: false,
        inputStr: testStrings.normal
      },
      useFont: null,
      expected: {
        isSuccess: true,
        outputStr: testStrings.useFontTrue,
        errorStr: null
      }
    },
    {
      label: 'should encode with useFont undefined',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal
      },
      expected: {
        isSuccess: true,
        outputStr: testStrings.useFontTrue,
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
        errorStr: `Masonic requires an input with at least one letter or number.`
      }
    },
    {
      label: 'should error on decode with all special chars and numbers',
      args: {
        isEncoding: false,
        inputStr: ''
      },
      expected: {
        isSuccess: false,
        outputStr: null,
        errorStr: `Masonic requires an input with at least one letter or number.`
      }
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let results = masonic.run(testCase.args, testCase.useFont)
      assert.deepEqual(results, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsResults = masonic.run()
    let defaultArgsResults = masonic.run(masonic.DEFAULTS)
    assert.deepEqual(noArgsResults, defaultArgsResults)
  })

  it('should be the same after encode and decode', () => {
    const inputs = { key: 'hide' }
    let encodeResults = masonic.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    assert.isTrue(encodeResults.isSuccess)
    assert.isString(encodeResults.outputStr)

    let decodeResults = masonic.run({
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
