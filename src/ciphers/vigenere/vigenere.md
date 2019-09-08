# {{cipher.NAME}}

## About
[{{cipher.NAME}}](http://en.wikipedia.org/wiki/Vigen%C3%A8re_cipher) is a simple polyalphabetic substitution cipher which uses a tableau composed of each of the 26 options of the [Caesar Cipher](/about/caesar).

## Supports
✅ Perfect Decoding
✅ Uppercase letters (`A-Z`)
✅ Lowercase letters (`a-z`)
❌ Numbers (`0-9`)
❌ Symbols (`!@#$`)
❌ Emojis (`😍🤬👩🏾‍💻`)

**Numbers, Symbols, and Emojis**
Numbers, symbols, and emoji are **outputted as-is** by this cipher.

**What is "Perfect Decoding"?**
Perfect Decoding is when the decoded text exactly matches the text that was encoded.

## Source
[View {{cipher.NAME}} on Github](https://github.com/thalida/ciphers.codes/blob/master/src/ciphers/vigenere/vigenere.js)

---

## Method
### Cipher Key
Given a `keyPart`, create a string of the length as the string to encode or decode. For example, with a key part of `hidden` and a string to encode `hello world`, the full cipher `key` would be: `{{ cipher.makeKey('hidden', 'hello world'.length) }}`

```js
key = makeKey('hidden', 'hello world'.length)

function makeKey (keyPart, targetKeyLength) {
  if (typeof keyPart !== 'string' || keyPart.length <= 0) {
    return ''
  }

  const keyPartLen = keyPart.length
  let key = keyPart.repeat(Math.ceil(targetKeyLength / keyPartLen))

  if (key.length > targetKeyLength) {
    key = key.substring(0, targetKeyLength)
  }

  return key
}
```

### Encoding
```js
(letterPosition + keyPosition) mod 26
```

### Decoding Formula
```js
(letterPosition - keyPosition) mod 26
```

---

## Live Example
### Variables
Based on the current settings for {{cipher.NAME}}:
```js
keyPart = "{{cipher.INPUTS_BY_NAME.key.value}}"
cipherKey = "{{cipher.makeKey(cipher.INPUTS_BY_NAME.key.value, cipher.SAMPLE_STRING.length)}}"
```

### Sample String
{{ cipher.SAMPLE_STRING }}

### When, **Encoded**
{{ cipher.encodingExample(cipher) }}

### Then, **Decoded**
{{ cipher.decodingExample(cipher) }}

---

## How it works
- `letterPosition` is the 0-index of the letter in the standard alphabet
- `keyPosition` given the letter at same `letterPosition` in the key, get the 0-index of that letter in the alphabet

### Key
Repeat of the `keyPart` that matches the length of the string to encode, this key is used to find the `keyPosition`.

### `letterPosition`
Index of the letter in the English alphabet (0-indexed). For example,
A=0, B=1, C=2, and so on until Z=25.

### `keyPosition`
Find the letter at `letterPosition` in the `key`, then get the 0-index of that letter in the standard English alphabet.

### "Magic" Number 26
You'll see a lot of references to `26`, it's not a magic number, just the
number of letters in the English alphabet.

### `mod 26`
Both formulas for encoding and decoding have `mod 26` which performs the modulo (%) operation on the output.

This is a safe-keeping action to guarantee the character is one of the 26 letters in the alphabet. [Javascript doesn't have proper support for mod](https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e) so this formula is used:
```js
export function mod (a, b) {
  return ((a % b) + b) % b
}
```
