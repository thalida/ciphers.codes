import * as utils from '@/ciphers/utils'

export const SAMPLE_STRING = `
Hello World!
ABCDEFGHIJKLMNOPQRSTUVWXYZ
abcdefghijklmnopqrstuvwxyz
0123456789
!@#$
✨🦄✨`

export function encodingExample (cipher) {
  return cipher.run({
    isEncoding: true,
    inputStr: SAMPLE_STRING,
    inputs: (cipher.INPUTS) ? utils.flattenCipherInputs(cipher.INPUTS) : null
  }).outputStr
}

export function decodingExample (cipher) {
  return cipher.run({
    isEncoding: false,
    inputStr: encodingExample(cipher),
    inputs: (cipher.INPUTS) ? utils.flattenCipherInputs(cipher.INPUTS) : null
  }).outputStr
}
