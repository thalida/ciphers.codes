# {{cipher.NAME}}
[{{cipher.NAME}}](http://en.wikipedia.org/wiki/Atbash) is a simple substitution cipher originally created for the Hebrew alphabet. When used with the English alphabet, this cipher reverses the alphabet.

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
