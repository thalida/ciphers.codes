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
  return str.match(/^[A-Za-z]$/)
}

//  setCase (char:chart, toUpper:boolean)
//  Check if the char should be made uppercase, if so do so. #poetry
// -----------------------------------------------------------------------------
export function setCase (char, toUpper) {
  return (toUpper) ? char.toUpperCase() : char.toLowerCase()
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
    return parseInt(currVal, 10)
  }

  return defaultVal
}

//  makeValidKey
//  Converts the given string into a valid key (no dupe chars and all lowercase)
// -----------------------------------------------------------------------------
export function makeValidKey (string, defaultKey) {
  if (typeof string !== 'string') {
    return (typeof defaultKey === 'string') ? defaultKey : null
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
export function makeKeyedAlpha (key) {
  if (typeof cachedKeyedAlphas[key] !== 'undefined') {
    return cachedKeyedAlphas[key]
  }

  let alpha = [...ALPHA]
  let keyedAlphabet = []

  // Return the regular alphabet if no key
  if (key.length === 0 || key === null) {
    return alpha
  }

  // Loop through each letter in the key -- and remove that letter
  // from the regular alphabet
  forEachCharacter(key, (index, char) => {
    const n = alpha.indexOf(char.toLowerCase())
    alpha.splice(n, 1)
  })

  // Add the key + the rest of the alphabet
  keyedAlphabet = key.split('').concat(alpha)

  // Save this keyed alphabet
  cachedKeyedAlphas[key] = keyedAlphabet

  return keyedAlphabet
}

//  parseCipherArgs
//  Convert and sanitize cipher arguments
// -----------------------------------------------------------------------------
export function parseCipherArgs (args, defaults) {
  let isEncoding = (args && typeof args.isEncoding === 'boolean')
    ? args.isEncoding
    : defaults.isEncoding

  let inputStr = (args && typeof args.inputStr === 'string')
    ? args.inputStr
    : defaults.inputStr

  let inputs = (args && typeof args.inputs !== 'undefined')
    ? args.inputs
    : {}

  if (typeof defaults.inputs !== 'undefined') {
    inputs = Object.assign({}, defaults.inputs, inputs)
  }

  return { isEncoding, inputStr, inputs }
}
