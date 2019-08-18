import * as affine from './collection/affine'
import * as atbash from './collection/atbash'
import * as caesar from './collection/caesar'
import * as keyedSubstitution from './collection/keyedSubstitution'
import * as masonic from './collection/masonic'
import * as playfair from './collection/playfair'
import * as polybiusSquare from './collection/polybiusSquare'
import * as vigenere from './collection/vigenere'

let ciphers = [
  affine,
  atbash,
  caesar,
  keyedSubstitution,
  masonic,
  playfair,
  polybiusSquare,
  vigenere
]

let ciphersByKey = ciphers.reduce((obj, cipher) => {
  obj[cipher.KEY] = cipher
  return obj
}, {})

export const CIPHER_KEYS = Object.keys(ciphersByKey)
export function getCipherByKey (key) {
  return ciphersByKey[key.toLowerCase()]
}
