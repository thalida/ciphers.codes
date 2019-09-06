# {{cipher.NAME}}

## About
A monoalphabetic substitution cipher. Each letter in the alphabet is
mapped a number, then encrypted/decrypted using a math formula, and
finally converted back to a letter.

[Wikipedia](http://en.wikipedia.org/wiki/Affine_cipher)

## Limitations
{{ cipher.NAME }} can only encrypt letters. All other characters are
ignored, and in my implementation they are printed as-is by the cipher.

## How it works

### Encoding
```
((coprime * letterPosition) + shift) % 26
```

### Decoding
```
(modInverseOfCoprime * (letterPosition - shift)) % 26
```

### What is mod 26?
Both formulas for encoding and decoding have <pre>% 26</pre> which
performs the
<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators#Remainder" target="_blank" rel="noopener">modulo</a>
operation on the output. This is a safe-keeping
action to guarnatee the output is 1 of the 26 letters in the alphabet.
You'll notice the modulo link above leads to the <i>remainder</i>
operation, JS doesn't have proper support for <i>mod</i>
https://dev.to/maurobringolf/a-neat-trick-to-compute-modulo-of-negative-numbers-111e

## Inputs
{{ cipher.INPUTS_BY_NAME }}

## Step-by-Step
1. Do this?
1. Do that?
