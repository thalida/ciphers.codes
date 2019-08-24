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
      expected: testStrings.useFontTrue
    },
    {
      label: 'should encode with useFont false',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal
      },
      useFont: false,
      expected: testStrings.useFontFalse
    },
    {
      label: 'should decode with useFont null',
      args: {
        isEncoding: false,
        inputStr: testStrings.normal
      },
      useFont: null,
      expected: testStrings.useFontTrue
    },
    {
      label: 'should encode with useFont undefined',
      args: {
        isEncoding: true,
        inputStr: testStrings.normal
      },
      expected: testStrings.useFontTrue
    }
  ]
  testCases.forEach((testCase) => {
    it(testCase.label, () => {
      let outputStr = masonic.run(testCase.args, testCase.useFont)
      assert.equal(outputStr, testCase.expected)
    })
  })

  it('should encode alphabet using defaults', () => {
    let noArgsOutputStr = masonic.run()
    let defaultArgsOutputStr = masonic.run(masonic.DEFAULTS)
    assert.equal(noArgsOutputStr, defaultArgsOutputStr)
  })

  it('should be the same after encode and decode', () => {
    const inputs = { key: 'hide' }
    let encodeOutputStr = masonic.run({
      isEncoding: true,
      inputStr: testStrings.normal,
      inputs
    })

    let decodeOutputStr = masonic.run({
      isEncoding: false,
      inputStr: encodeOutputStr,
      inputs
    })
    assert.equal(testStrings.normal, decodeOutputStr)
  })
})
