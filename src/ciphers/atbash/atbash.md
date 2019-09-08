# {{cipher.NAME}}
[{{cipher.NAME}}](http://en.wikipedia.org/wiki/Atbash) is a simple substitution cipher originally created for the Hebrew alphabet. When used with the English alphabet, this cipher reverses the alphabet.

## Supports
✅ Uppercase letters (`A-Z`)
✅ Lowercase letters (`a-z`)
❌ Numbers (`0-9`)
❌ Special Characters (`!@#$`)
❌ Emojis (`😍🤬👩🏾‍💻`)

Numbers, special characters, and emoji are **outputted as-is** by this cipher.

## Source
[View {{cipher.NAME}} on Github](https://github.com/thalida/ciphers.codes/blob/master/src/ciphers/atbash/atbash.js)

---

## Formula for Encoding & Decoding
```js
26 - letterPos
```

---


## Live Example

### Sample String
{{ cipher.SAMPLE_STRING }}

### When, **Encoded**
{{ cipher.encodingExample(cipher) }}

### Then, **Decoded**
{{ cipher.decodingExample(cipher) }}
