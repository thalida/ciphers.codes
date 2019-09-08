# {{cipher.NAME}}

## About
[{{cipher.NAME}}](http://en.wikipedia.org/wiki/Keyword_cipher) is a A monoalphabetic substitution cipher, where a keyword placed into beginning of the alphabet, and any duplicated letters are removed.

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
[View {{cipher.NAME}} on Github](https://github.com/thalida/ciphers.codes/blob/master/src/ciphers/keyedSubstitution/keyedSubstitution.js)

---

## Method

### Cipher Key
Given a `key`, create a new alphabet with that key in front.
For example, with a key of `private` you'll see the cipher alphabet below, in comparison to the standard English alphabet.

```js
key = 'private'
cipherAlphabet = {{ utils.makeKeyedAlpha('private').join('') }}
standardAlphabet = {{ utils.ALPHA.join('') }}
```

### Encoding
```js
cipherAlpha.indexOf(letter)
```

### Decoding
```js
standardAlphabet.indexOf(letter)
```

---

## Live Example
### Variables
Based on the current settings for {{cipher.NAME}}:
- `key = {{cipher.INPUTS_BY_NAME.key.value}}`

The computed cipher alphabet is:
```js
{{ utils.makeKeyedAlpha(cipher.INPUTS_BY_NAME.key.value, '').join('') }}
```

### Sample String
{{ cipher.SAMPLE_STRING }}

### When, **Encoded**
{{ cipher.encodingExample(cipher) }}

### Then, **Decoded**
{{ cipher.decodingExample(cipher) }}
