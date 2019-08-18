import Affine from './collection/Affine'
import Atbash from './collection/Atbash'
import Caesar from './collection/Caesar'
import KeyedSubstitution from './collection/KeyedSubstitution'
import Masonic from './collection/Masonic'
import Playfair from './collection/Playfair'
import PolybiusSquare from './collection/PolybiusSquare'
import Vigenere from './collection/Vigenere'

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

let cipherKeys = []
let ciphersByKey = {}

for (let i = 0; i < ciphers.length; i += 1) {
  let Cipher = ciphers[i]
  let cipherInstance = new Cipher()
  const key = cipherInstance.KEY
  cipherKeys.push(key)
  ciphersByKey[key] = Cipher
}

export {
  ciphers,
  cipherKeys,
  ciphersByKey
}

export function getCipherByKey (key) {
  let loweredKey = key.toLowerCase()
  return new ciphersByKey[loweredKey]()
}
