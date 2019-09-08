'use strict'

import { assert } from 'chai'
import * as index from './index'

describe('ciphers:index', () => {
  let expectedCipherKeys = [
    'atbash',
    'affine',
    'caesar',
    'keyed-substitution',
    'masonic',
    'playfair',
    'polybius-square',
    'vigenere'
  ]

  it('should have cipher keys in any order', () => {
    assert.sameMembers(index.CIPHER_KEYS, expectedCipherKeys)
  })

  it('should get cipher run for all keys', () => {
    expectedCipherKeys.forEach((key) => {
      let foundCipher = index.getCipherByKey(key)
      assert.isFunction(foundCipher.run)
    })
  })
})
