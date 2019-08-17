'use strict'

// =============================================================================
//
//  Cipher Utils
//  General functions and variables to be used by some/all of the ciphers.
//
// -----------------------------------------------------------------------------
const ALPHA = [
  'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm',
  'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'
]
const NUMBERS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']
const TOTAL_ALPHA = ALPHA.length
const ALPHANUMERIC = [].concat(ALPHA, NUMBERS)

//  ALPHAGRID
//  Create a 6 x 6 grid of the alphabet and numbers 0 - 9
// ----------------------------------------------------------------------
const ALPHAGRID = (() => {
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

let cachedKeyedAlphas = {}

export {
  ALPHA,
  TOTAL_ALPHA,
  ALPHANUMERIC,
  ALPHAGRID
}

//  @setCase( char, boolean )
//  Check if the char should be made uppercase, if so do so. #poetry
// ----------------------------------------------------------------------
export function setCase (char, makeUpperCase) {
  return (makeUpperCase === true) ? char.toUpperCase() : char
}

//  @forEachCharacter( string, int, function )
//  Loop through a given string and call the passed function
//  with the current index, letter, and if that letter is uppercase.
// ----------------------------------------------------------------------
export function forEachCharacter (string, increment, cb) {
  if (typeof increment === 'function') {
    cb = increment
    increment = 1
  }

  if (typeof cb !== 'function') {
    return
  }

  for (let i = 0; i < string.length; i += increment) {
    const c = string.charAt(i)
    const isUpper = c.match(/^[A-Z]$/) !== null
    cb(i, c, isUpper)
  }
}

//  @isLetter
//  Check if a given str has only letters
// ----------------------------------------------------------------------
export function isLetter (str) {
  return str.match(/^[A-Za-z]$/)
}

export function removeDuplicateChars (key) {
  let keyArr = key.replace(/[^A-Za-z]+/gi, '').toLowerCase().split('')
  let deduped = new Set(keyArr)
  return [...deduped].join('')
}

//  @makeKeyedAlpha
//  Create a keyed version of the alphabet - which is a common trick
//  among ciphers/codes.
//
//  Example:
//  key: 'lorem'
//  keyed alphabet: loremabcdfghijknpqstuvwxyz
// ----------------------------------------------------------------------
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

export function makeValidInt (currVal, defaultVal) {
  if (typeof currVal === 'number') {
    return currVal
  }

  if (typeof currVal === 'string' && currVal.length > 0) {
    return parseInt(currVal, 10)
  }

  return defaultVal
}

export function makeValidKey (currVal, defaultVal) {
  if (typeof currVal === 'string') {
    return currVal.toLowerCase()
  }

  return defaultVal
}

//  @mod
//  A fix for JS issues with modding a negative number
// ----------------------------------------------------------------------
export function mod (a, b) {
  return ((a % b) + b) % b
}
