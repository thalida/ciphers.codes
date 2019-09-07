# {{cipher.NAME}}

## About
[{{cipher.NAME}}](http://en.wikipedia.org/wiki/Affine_cipher) is a
monoalphabetic substitution cipher. Each letter in the alphabet is
mapped a number, then encrypted/decrypted using a math formula, and
finally converted back to a letter.

## Supports
✅ Uppercase letters (`A-Z`) \
✅ Lowercase letters (`a-z`) \
❌ Numbers (`0-9`) \
❌ Special Characters (`!@#$`)

Numbers and Special Characters are included as-is in the output.

## Source
[View {{cipher.NAME}} on Github](https://github.com/thalida/ciphers.codes/blob/master/src/ciphers/affine/affine.js)

---

## Formulas

**Encoding**
```js
((coprime * charIndex) + shift) mod 26
```

**Decoding**
```js
(modInverseOfCoprime * (charIndex - shift)) mod 26
```

---

## Live Example
Based on the current settings for {{cipher.NAME}}:
- `coprime` = `{{cipher.INPUTS_BY_NAME.coprime.value}}`
- `shift` = `{{cipher.INPUTS_BY_NAME.shift.value}}`
- `modInverseOfCoprime` = `{{cipher.modInverse(cipher.INPUTS_BY_NAME.coprime.value)}}`

**Sample String**: {{ cipher.SAMPLE_STRING }}\
When, **Encoded**: {{ cipher.sampleEncoding() }}\
Then, **Decoded**: {{ cipher.sampleDecoding() }}

---

## How it works
- `charIndex` is the index of the letter in the alphabet
- `coprime` and `shift` are two variables you pick!
- `modInverseOfCoprime` is the modular multiplicative inverse of `coprime`

### "Magic" Number 26
You'll see a lot of references to `26`, it's not a magic number, just the
number of letters in the English alphabet.

### `charIndex`
Index of the character in the English alphabet (0-indexed). For example,
A=0, B=1, C=2, and so on until Z=25.

### `coprime`
Must be a number where the only positive integer that divides it and 26
is 1. With that limitation the only valid values are: {{cipher.ALLOWED_COPRIMES.join(', ')}}

### `shift`
Any integer, positive or negative

### `modInverseOfCoprime`
The
[modular multiplicative inverse](https://www.geeksforgeeks.org/multiplicative-inverse-under-modulo-m/)
of the `coprime`. To be honest, I don't fully understand the formula.

But, after _extensive searching_, I got a rough understanding that we need to find
a number where the formula below would be correct.
```
(coprime * x) % 26 = 1
```
The value of `x` is the modular multiplicative inverse of `coprime`. The
following javascript function, ~stolen~ converted from the examples
[here](https://www.geeksforgeeks.org/multiplicative-inverse-under-modulo-m/)
calculates the value for `x`.

```js
function _modInverse (coprime) {
  let mod = utils.TOTAL_ALPHA
  let inverse = 1
  let y = 0
  while (coprime > 1) {
    let origMod = mod
    let origY = y
    let quotient = Math.floor(coprime / mod)
    mod = coprime % mod
    coprime = origMod
    y = inverse - quotient * y
    inverse = origY
    if (inverse < 0) {
      inverse += utils.TOTAL_ALPHA
    }
  }
  return inverse
}
```

### What is `mod 26`?
Both formulas for encoding and decoding have `mod 26` which performs the modulo (%)
operation on the output.

This is a safe-keeping action to guarantee the character is one of the 26
letters in the alphabet. [Javascript doesn't have proper support for mod](https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e) so this formula is used:
```js
export function mod (a, b) {
  return ((a % b) + b) % b
}
```
