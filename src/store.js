import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let inputSamples = [
  `When zombies arrive, quickly fax judge Pat.`,
  `Never, never assume that what you have achieved is fucking good enough.`,
  `I've just had to walk all the way down the motherfudging stairs, because the lifts are broken AGAIN!`
].map((str) => `ABCdefghijklmnopqrstuvwXYZ\r\n\r\n0123456789\r\n\r\n!@#$%^&*()\r\n\r\n${str}`)
const randSampleIndex = Math.floor(Math.random() * inputSamples.length)

export default new Vuex.Store({
  state: {
    isModalVisible: false,
    isEncoding: true,
    inputStr: inputSamples[randSampleIndex]
    // inputStr: `11 12 13 14 15 16 21 22 23 24 25 26 31 32 33 34 35 36 41 42 43 44 45 46 51 52 53 54 55 56 61 62 63 64 65 66 32 15 44 15 36 32 15 44 15 36 11 41 41 43 31 15 42 22 11 42 45 22 11 42 51 33 43 22 11 44 15 11 13 22 23 15 44 15 14 23 41 16 43 13 25 23 32 21 21 33 33 14 15 32 33 43 21 22 23 16 51 33 43 36 15 32 33 42 12 15 23 32 21 16 43 13 25 23 32 21 22 33 32 15 41 42 45 23 42 22 51 33 43 36 41 15 26 16 22 33 45 13 33 43 26 14 51 33 43 15 44 15 36 22 33 34 15 42 33 13 33 31 31 43 32 23 13 11 42 15 41 33 31 15 42 22 23 32 21 31 15 11 32 23 32 21 16 43 26 42 33 41 33 31 15 33 32 15 15 26 41 15 45 22 15 32 51 33 43 41 23 42 14 33 45 32 42 33 45 33 36 25 15 46 42 15 36 32 11 26 13 36 23 42 23 13 41 11 36 15 32 42 42 22 15 15 32 15 31 51`
  },
  mutations: {
    setInputStr (state, inputStr) {
      state.inputStr = inputStr
    },
    setIsEncoding (state, isEncoding) {
      state.isEncoding = isEncoding
    },
    setIsModalVisible (state, isModalVisible) {
      state.isModalVisible = isModalVisible
    }
  }
})
