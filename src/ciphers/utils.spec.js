'use strict'

import chai from 'chai'
import spies from 'chai-spies'
import * as utils from './utils'

chai.use(spies)

let { assert, expect } = chai

describe('ciphers:utils', () => {
  it('should have ALPHA', () => {
    const alphaStr = 'abcdefghijklmnopqrstuvwxyz'
    assert.equal(utils.ALPHA.join(''), alphaStr)
    assert.equal(utils.TOTAL_ALPHA, alphaStr.length)
  })

  it('should have NUMBERS 0-9', () => {
    assert.equal(utils.NUMBERS.join(''), '0123456789')
  })

  it('should have ALPHANUMERIC', () => {
    assert.equal(utils.ALPHANUMERIC.join(''), 'abcdefghijklmnopqrstuvwxyz0123456789')
  })

  it('should have ALPHAGRID', () => {
    assert.isArray(utils.ALPHAGRID)
    assert.equal(utils.ALPHAGRID[1][1], 'a')
    assert.equal(utils.ALPHAGRID[6][6], '9')
  })

  let modTestCases = [
    { args: [3, 26], expected: 3 },
    { args: [-27, 26], expected: 25 },
    { args: [-5, 26], expected: 21 }
  ]
  modTestCases.forEach((testCase) => {
    it(`mod(${testCase.args.join(',')}) should equal ${testCase.expected}`, () => {
      assert.equal(utils.mod.apply(null, testCase.args), testCase.expected)
    })
  })

  let isLetterTestCases = [
    { args: ['a'], expected: true },
    { args: ['Z'], expected: true },
    { args: [';'], expected: false },
    { args: ['!'], expected: false },
    { args: [4], expected: false },
    { args: [-5], expected: false },
    { args: [null], expected: false },
    { args: [undefined], expected: false },
    { args: [[]], expected: false },
    { args: [{}], expected: false }
  ]
  isLetterTestCases.forEach((testCase) => {
    it(`isLetter(${testCase.args[0]}) should equal ${testCase.expected}`, () => {
      assert.equal(utils.isLetter.apply(null, testCase.args), testCase.expected)
    })
  })

  let setCaseTestCases = [
    { args: ['a', true], expected: 'A' },
    { args: ['z', false], expected: 'z' },
    { args: ['!', true], expected: '!' },
    { args: [':', false], expected: ':' },
    { args: [1, true], expected: 1 },
    { args: [6, false], expected: 6 },
    { args: ['', false], expected: '' },
    { args: [null, false], expected: null },
    { args: [undefined, false], expected: undefined }
  ]
  setCaseTestCases.forEach((testCase) => {
    it(`setCase(${testCase.args.join(',')}) should equal ${testCase.expected}`, () => {
      assert.equal(utils.setCase.apply(null, testCase.args), testCase.expected)
    })
  })

  let forEachCharacterTestCases = [
    {
      string: 'aBc',
      increment: 1,
      useCallback: true,
      useIncrement: true,
      expects: [
        [0, 'a', false], [1, 'B', true], [2, 'c', false]
      ]
    },
    {
      string: '123 ABC xyz',
      increment: 2,
      useCallback: true,
      useIncrement: true,
      expects: [
        [0, '1', false], [2, '3', false], [4, 'A', true],
        [6, 'C', true], [8, 'x', false], [10, 'z', false]
      ]
    },
    {
      string: '123',
      useCallback: true,
      useIncrement: false,
      expects: [
        [0, '1', false], [1, '2', false], [2, '3', false]
      ]
    },
    {
      string: '123',
      increment: 2,
      useCallback: false,
      expects: []
    },
    {
      string: '123',
      increment: 4,
      useCallback: true,
      useIncrement: true,
      expects: [[0, '1', false]]
    }
  ]
  forEachCharacterTestCases.forEach((testCase) => {
    it(`should run forEachCharacter(${testCase.string}, ${testCase.increment})`, () => {
      let args = []
      let outputs = []
      let cb = chai.spy((i, char, isUpper) => {
        assert.isNumber(i)
        assert.isBelow(i, testCase.string.length)
        assert.isString(char)
        assert.isBoolean(isUpper)

        outputs.push([i, char, isUpper])
      })

      args[0] = testCase.string

      if (testCase.useIncrement) {
        args[1] = testCase.increment
      }

      if (testCase.useCallback) {
        if (testCase.useIncrement) {
          args[2] = cb
        } else {
          args[1] = cb
        }
      }

      utils.forEachCharacter.apply(null, args)

      expect(cb).to.have.been.called.exactly(testCase.expects.length)
      assert.deepEqual(outputs, testCase.expects)
    })
  })

  let makeValidIntTestCases = [
    { args: [1, 7], expected: 1 },
    { args: ['3', 7], expected: 3 },
    { args: ['!', 7], expected: 7 },
    { args: ['a', null], expected: null },
    { args: ['', 5], expected: 5 },
    { args: [null, false], expected: false },
    { args: [undefined, undefined], expected: undefined }
  ]
  makeValidIntTestCases.forEach((testCase) => {
    it(`makeValidInt(${testCase.args.join(',')}) should equal ${testCase.expected}`, () => {
      assert.equal(utils.makeValidInt.apply(null, testCase.args), testCase.expected)
    })
  })

  let makeValidKeyTestCases = [
    { args: ['lorem', 'default'], expected: 'lorem' },
    { args: ['hello', 'default'], expected: 'helo' },
    { args: [5, 'default'], expected: 'default' },
    { args: [5, 5], expected: null },
    { args: [null, 'default'], expected: 'default' },
    { args: [null, null], expected: null },
    { args: [undefined, undefined], expected: undefined }
  ]
  makeValidKeyTestCases.forEach((testCase) => {
    it(`makeValidKey(${testCase.args.join(',')}) should equal ${testCase.expected}`, () => {
      assert.equal(utils.makeValidKey.apply(null, testCase.args), testCase.expected)
    })
  })

  let makeKeyedAlphaTestCases = [
    { args: ['lorem'], expected: 'loremabcdfghijknpqstuvwxyz'.split('') },
    { args: ['hello'], expected: 'heloabcdfgijkmnpqrstuvwxyz'.split('') },
    { args: [3], expected: 'abcdefghijklmnopqrstuvwxyz'.split('') },
    { args: [''], expected: 'abcdefghijklmnopqrstuvwxyz'.split('') },
    { args: [null], expected: 'abcdefghijklmnopqrstuvwxyz'.split('') },
    { args: [undefined], expected: 'abcdefghijklmnopqrstuvwxyz'.split('') }
  ]
  makeKeyedAlphaTestCases.forEach((testCase) => {
    it(`makeKeyedAlpha(${testCase.args.join(',')}) should equal ${testCase.expected}`, () => {
      assert.deepEqual(utils.makeKeyedAlpha.apply(null, testCase.args), testCase.expected)
    })
  })

  let parseCipherArgsTestCases = [
    {
      label: 'should return same args',
      input: { isEncoding: true, inputStr: 'abc', inputs: { inputA: 'a', inputB: 'b' } },
      default: undefined,
      expected: { isEncoding: true, inputStr: 'abc', inputs: { inputA: 'a', inputB: 'b' } }
    },
    {
      label: 'missing isEncoding field should return default isEncoding',
      input: { inputStr: 'abc' },
      default: { isEncoding: false },
      expected: { isEncoding: false, inputStr: 'abc', inputs: {} }
    },
    {
      label: 'missing inputStr field should return default inputStr',
      input: { isEncoding: false },
      default: { inputStr: 'hi' },
      expected: { isEncoding: false, inputStr: 'hi', inputs: {} }
    },
    {
      label: 'missing inputs field should return default inputs',
      input: { isEncoding: true, inputStr: 'abc' },
      default: { inputs: { inputA: 'a', inputB: 'b' } },
      expected: { isEncoding: true, inputStr: 'abc', inputs: { inputA: 'a', inputB: 'b' } }
    },
    {
      label: '{} args should return default args',
      input: {},
      default: { isEncoding: true, inputStr: 'abc', inputs: {} },
      expected: { isEncoding: true, inputStr: 'abc', inputs: {} }
    },
    {
      label: 'null args should return default args',
      input: null,
      default: { isEncoding: false, inputStr: 546, inputs: null },
      expected: { isEncoding: false, inputStr: 546, inputs: {} }
    },
    {
      label: 'undefined args should return default args',
      input: undefined,
      default: { isEncoding: true, inputStr: 'abc XYZ 123#', inputs: { inputA: 'a', inputB: 'b' } },
      expected: { isEncoding: true, inputStr: 'abc XYZ 123#', inputs: { inputA: 'a', inputB: 'b' } }
    }
  ]
  parseCipherArgsTestCases.forEach((testCase) => {
    it(`parseCipherArgs ${testCase.label}`, () => {
      assert.deepEqual(utils.parseCipherArgs(testCase.input, testCase.default), testCase.expected)
    })
  })
})
