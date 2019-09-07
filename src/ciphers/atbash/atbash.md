# {{cipher.NAME}}
[{{cipher.NAME}}](http://en.wikipedia.org/wiki/Atbash) is a simple substitution
cipher originally created for the Hebrew alphabet. When used with the English
alphabet, this cipher reverses the alphabet.

## Supports
✅ Uppercase letters (`A-Z`) \
✅ Lowercase letters (`a-z`) \
❌ Numbers (`0-9`) \
❌ Special Characters (`!@#$`)

Numbers and Special Characters are **outputted as-is** by this cipher.

---

## Formula for Encoding & Decoding
```js
26 - letterPos
```

---


## Example

### Sample String
{{ cipher.SAMPLE_STRING }}

### When, **Encoded**
{{ cipher.sampleEncoding() }}

### Then, **Decoded**
{{ cipher.sampleDecoding() }}
