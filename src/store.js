import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isEncoding: true,
    inputStr: 'When zombies arrive, quickly fax judge Pat.'
  },
  mutations: {
    setInputStr (state, inputStr) {
      state.inputStr = inputStr
    },
    setIsEncoding (state, isEncoding) {
      state.isEncoding = isEncoding
    }
  }
})
