'use strict'

// =============================================================================
//
//  Cipher Utils
//  General functions and variables to be used by more than one cipher
//
// =============================================================================

//  Standard English Letters & Numbers
// -----------------------------------------------------------------------------
export const ALPHA = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]
export const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
export const ALPHANUMERIC = [].concat(ALPHA, NUMBERS)
export const TOTAL_ALPHA = ALPHA.length

//  ALPHAGRID: A 6 x 6 grid of the alphabet and numbers 0 - 9
// -----------------------------------------------------------------------------
export const ALPHAGRID = (() => {
  // We need to create a 6x6 grid of the alphanumeric characters
  const GRID_SIZE = 6
  let grid = new Array(GRID_SIZE)

  // Current index in the alphanumeric array
  let index = 0

  // A should be at 1,1 NOT 0,0
  for (let i = 1; i <= GRID_SIZE; i += 1) {
    grid[i] = new Array(GRID_SIZE)

    for (let j = 1; j <= GRID_SIZE; j += 1) {
      grid[i][j] = ALPHANUMERIC[index]
      index += 1
    }
  }

  return grid
})()

//  mod
//  A fix for JS issues with modding a negative number
// -----------------------------------------------------------------------------
export function mod (a, b) {
  return ((a % b) + b) % b
}

//  isLetter
//  Check if a given str has only letters
// -----------------------------------------------------------------------------
export function isLetter (str) {
  if (typeof str !== 'string') {
    return false
  }

  const matches = str.match(/^[A-Za-z]$/)
  return (matches) ? matches.length > 0 : false
}

//  setCase (char:chart, toUpper:boolean)
//  Check if the char should be made uppercase, if so do so. #poetry
// -----------------------------------------------------------------------------
export function setCase (char, toUpper) {
  if (typeof char !== 'string') {
    return char
  }
  return (toUpper) ? char.toUpperCase() : char.toLowerCase()
}

//  matchCase (char:char, charToMatch:char)
//  Force the char to match the given case of charToMatch
// -----------------------------------------------------------------------------
export function matchCase (char, charToMatch) {
  if (typeof char !== 'string') {
    return char
  }
  const isUpper = charToMatch.match(/^[A-Z]$/) !== null
  return (isUpper) ? char.toUpperCase() : char.toLowerCase()
}

//  forEachCharacter (string:string, (increment:int,) cb:function)
//    increment is optional
//  Loop through a given string and call the passed function
//  with the current index, letter, and if that letter is uppercase.
// -----------------------------------------------------------------------------
export function forEachCharacter (string, increment, cb) {
  // if increment is not passed in, default to 1
  if (typeof increment === 'function') {
    cb = increment
    increment = 1
  }

  // A callback is required
  if (typeof cb !== 'function') {
    return
  }

  for (let i = 0; i < string.length; i += increment) {
    const c = string.charAt(i)
    const isUpper = c.match(/^[A-Z]$/) !== null
    cb(i, c, isUpper)
  }
}

//  makeValidInt
//  Converts the given input to a valid int
// -----------------------------------------------------------------------------
export function makeValidInt (currVal, defaultVal) {
  if (typeof currVal === 'number') {
    return currVal
  }

  if (typeof currVal === 'string' && currVal.length > 0) {
    let number = parseInt(currVal, 10)
    if (!isNaN(number)) {
      return number
    }
  }

  return defaultVal
}

//  makeValidKey
//  Converts the given string into a valid key (no dupe chars and all lowercase)
// -----------------------------------------------------------------------------
export function makeValidKey (string, defaultKey, mode) {
  if (typeof string !== 'string') {
    return (typeof defaultKey === 'string') ? defaultKey : null
  }

  // For Playfair: Replace any j's with i's in the key
  if (mode === 'playfair') {
    string = string.replace(/[j]+/gi, 'i').toLowerCase()
  }

  let charsArray = string.replace(/[^A-Za-z]+/gi, '').toLowerCase().split('')
  let uniqueChars = new Set(charsArray)
  let key = [...uniqueChars].join('') // remake into a string

  return key
}

//  makeKeyedAlpha
//  Create a keyed version of the alphabet - which is a common trick
//  among ciphers/codes.
//
//  Example:
//  key: 'lorem'
//  keyed alphabet: loremabcdfghijknpqstuvwxyz
// -----------------------------------------------------------------------------
let cachedKeyedAlphas = {}
export function makeKeyedAlpha (string, defaultKey, mode) {
  let key = makeValidKey(string, defaultKey, mode)
  let cacheKey = `${key}-${mode}`

  if (typeof cachedKeyedAlphas[cacheKey] !== 'undefined') {
    return cachedKeyedAlphas[cacheKey]
  }

  let alpha = [...ALPHA]

  // Return the regular alphabet if no key
  if (typeof key !== 'string' || key.length <= 0) {
    return alpha
  }

  let keyedAlphabet = [].concat(key.split('')).concat(alpha)

  // For Playfair: Replace any j's with i's in the key
  if (mode === 'playfair') {
    const jIndex = keyedAlphabet.indexOf('j')
    keyedAlphabet.splice(jIndex, 1)
  }

  let uniqueKeyedAlphabet = new Set(keyedAlphabet)
  let uniqueKeyedAlphabetArr = [...uniqueKeyedAlphabet]

  // Save this keyed alphabet
  cachedKeyedAlphas[cacheKey] = uniqueKeyedAlphabetArr
  return cachedKeyedAlphas[cacheKey]
}

//  parseCipherArgs
//  Convert and sanitize cipher arguments
// -----------------------------------------------------------------------------
export function parseCipherArgs (args, defaults) {
  defaults = Object.assign({}, { isEncoding: true, inputStr: '', inputs: {} }, defaults)

  let isEncoding = (args && typeof args.isEncoding === 'boolean')
    ? args.isEncoding
    : defaults.isEncoding

  let inputStr = (args && typeof args.inputStr === 'string')
    ? args.inputStr
    : defaults.inputStr

  let inputs = {}
  if (args && typeof args.inputs === 'object' && args.inputs !== null) {
    inputs = args.inputs
  }

  if (typeof defaults.inputs === 'object' && defaults.inputs !== null) {
    inputs = Object.assign({}, defaults.inputs, inputs)
  }

  return { isEncoding, inputStr, inputs }
}

export function flattenCipherInputs (inputsObj) {
  return inputsObj.reduce((pairs, input) => {
    pairs[input.name] = input.value
    return pairs
  }, {})
}
