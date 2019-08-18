// something about all of the below feels wrong... why? i dunno.

import * as Affine from './collection/Affine'
import * as Atbash from './collection/Atbash'
import * as Caesar from './collection/Caesar'
import * as KeyedSubstitution from './collection/KeyedSubstitution'
import * as Masonic from './collection/Masonic'
import * as Playfair from './collection/Playfair'
import * as PolybiusSquare from './collection/PolybiusSquare'
import * as Vigenere from './collection/Vigenere'

let ciphers = [
  Affine,
  Atbash,
  Caesar,
  KeyedSubstitution,
  Masonic,
  Playfair,
  PolybiusSquare,
  Vigenere
]

let ciphersByKey = ciphers.reduce((obj, cipher) => {
  obj[cipher.KEY] = cipher
  return obj
}, {})

export const CIPHER_KEYS = Object.keys(ciphersByKey)

export function getCipherByKey (key) {
  let loweredKey = key.toLowerCase()
  return ciphersByKey[loweredKey]
}
