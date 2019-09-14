import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let inputSamples = [
  `When zombies arrive, quickly fax judge Pat.\r\n🧟‍♀️📠👩🏿‍⚖️`,
  `I've just had to walk all the way down the motherfudging stairs, because the lifts are broken AGAIN! 🤬`,
  `🐱 Cat ipsum dolor sit amet, fooled again thinking the dog likes me catasstrophe. Why must they do that. Meow and walk away. Shake treat bag rub against owner because nose is wet.`,
  `Corporate ipsum dolor leverage agile frameworks to provide a robust synopsis for high level overviews. Organically grow the holistic world view of disruptive innovation via workplace diversity and empowerment.`
]
const randSampleIndex = Math.floor(Math.random() * inputSamples.length)

export default new Vuex.Store({
  state: {
    isModalVisible: false,
    isEncoding: true,
    inputStr: inputSamples[randSampleIndex]
  },
  mutations: {
    setInputStr (state, inputStr) {
      state.inputStr = inputStr
    },
    setIsEncoding (state, isEncoding) {
      state.isEncoding = isEncoding
    },
    toggleIsEncoding (state) {
      state.isEncoding = !state.isEncoding
    },
    setIsModalVisible (state, isModalVisible) {
      state.isModalVisible = isModalVisible
    }
  }
})
