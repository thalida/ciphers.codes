# {{cipher.NAME}}

## About
[{{cipher.NAME}}](http://en.wikipedia.org/wiki/Polybius_square) a cipher where each alphanumeric (a-z, 0-9) character is represented by it's coordinates in a grid.

## Supports
❌ Perfect Decoding
✅ Uppercase letters (`A-Z`)
✅ Lowercase letters (`a-z`)
✅ Numbers (`0-9`)
❌ Symbols (`!@#$`)
❌ Emojis (`😍🤬👩🏾‍💻`)

**Numbers and Emojis**
Symbols and emoji are **removed** by this cipher.

**Spaces are Removed**
All spaces are removed by this cipher during encoding.

**What is "Perfect Decoding"?**
Perfect Decoding is when the decoded text exactly matches the text that was encoded.

**This cipher forcibly lowercases all characters, removes spaces, omits symbols and emoji.** As a result the output from decoding does not exactly match the original input string.

## Source
[View {{cipher.NAME}} on Github](https://github.com/thalida/ciphers.codes/blob/master/src/ciphers/polybiusSquare/polybiusSquare.js)

---

## Formula

### Encoding
```js
x = Math.floor(letterPosition / 6) + 1
y = (letterPosition mod 6) + 1
```

### Decoding
```js
characterIndex = (x * 6) + y
```

---

## Live Example
### Sample String
{{ cipher.SAMPLE_STRING }}

### When, **Encoded**
{{ cipher.encodingExample(cipher) }}

### Then, **Decoded**
```
{{ cipher.decodingExample(cipher) }}
```

---

## How it works
- `letterPosition` is the index of the letter
- `x` and `y` are the coordinates of the letter in a 6x6 `alphanumeric grid`
- `characterIndex` is the index of the character in a flat `alphanumeric array`

### Alphanumeric Grid and Array
The alphanumeric array consists of the letters a-z and 0-9.

**Alphanumeric Array**:
```js
{{ utils.ALPHANUMERIC.join('') }}
```

**Alphanumeric Grid**:
`{{ utils.ALPHANUMERIC.slice(0, 6).join(' ') }}`
`{{ utils.ALPHANUMERIC.slice(6, 12).join(' ') }}`
`{{ utils.ALPHANUMERIC.slice(12, 18).join(' ') }}`
`{{ utils.ALPHANUMERIC.slice(18, 24).join(' ') }}`
`{{ utils.ALPHANUMERIC.slice(24, 30).join(' ') }}`
`{{ utils.ALPHANUMERIC.slice(30, 36).join(' ') }}`

### "Magic" Number 6
The 6 represents the number of rows and columns in the alphanumeric grid.

### `letterPosition`
Index of the letter in the alphanumeric alphabet (0-indexed). For example, A=0, C=2, Z=25, and 9=35.

### `x` and `y`
Given the grid above, where:
- `a = 1,1`
- `m = 3,1`
- `w = 4,5`
- `9 = 6,6`
We can use the formula for encoding to calculate the `x` and `y` values for a given character in the grid.

### `characterIndex`
Given a set of character coordinates (1,1 through 6,6), calculate the 0-index of the letter at that coordinate. This `characterIndex` is then used to lookup the letter in the alphanumeric array.

### A note on `mod`
The formula for encoding uses `mod 6`. [Javascript doesn't have proper support for mod](https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e) so this formula is used:
```js
export function mod (a, b) {
  return ((a % b) + b) % b
}
```
