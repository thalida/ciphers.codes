import * as affine from './affine'
import * as atbash from './atbash'
import * as caesar from './caesar'
import * as keyedSubstitution from './keyedSubstitution'
import * as masonic from './masonic'
import * as playfair from './playfair'
import * as polybiusSquare from './polybiusSquare'
import * as vigenere from './vigenere'

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
