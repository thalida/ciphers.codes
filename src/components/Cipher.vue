<template>
  <div :id="cipherId" class="cipher">
    <h2>
      <router-link
        :to="{
          name: 'about',
          params: { cipherKey }
        }">
        {{cipher.NAME}}
      </router-link>
    </h2>
    <div class="inputs" v-if="cipherHasInputs">
      <div
        class="input"
        v-for="(input, index) in cipherInputs"
        :key="index">
        {{input.label}}
        <input
          v-if="input.type === 'text' || input.type === 'number'"
          :type="input.type"
          :placeholder="input.placeholder"
          v-model="input.value"
          @input="handleInputChange(input, $event)"
          @blur="handleInputBlur(input, $event)" />
        <select
          v-if="input.type === 'select'"
          v-model="input.value"
          @input="handleInputChange(input, $event)"
          @blur="handleInputBlur(input, $event)">
          <option
            v-for="(option, index) in input.options"
            :key="index"
            :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>
    <textarea
      v-model="outputStr"
      disabled>
    </textarea>
  </div>
</template>

<script>
import { getCipherByKey } from '@/ciphers'

export default {
  name: 'Cipher',
  props: {
    cipherKey: String
  },
  data () {
    let cipher = getCipherByKey(this.cipherKey)
    const cipherHasInputs = (
      typeof cipher.INPUTS !== 'undefined' &&
      cipher.INPUTS !== null &&
      Array.isArray(cipher.INPUTS)
    )
    return {
      cipher,
      cipherHasInputs,
      cipherId: `cipher-${cipher.KEY}`,
      cipherInputs: (cipherHasInputs) ? [...cipher.INPUTS] : null,
      cipherInputDefaults: (cipherHasInputs) ? cipher.DEFAULT_ARGS.inputs : null
    }
  },
  computed: {
    isEncoding () {
      return this.$store.state.isEncoding
    },
    inputStr () {
      return this.$store.state.inputStr
    },
    inputValues () {
      if (!this.cipherHasInputs) {
        return null
      }
      return this.cipherInputs.reduce((pairs, input) => {
        pairs[input.name] = input.value
        return pairs
      }, {})
    },
    outputStr () {
      return this.cipher.run({
        isEncoding: this.isEncoding,
        inputStr: this.inputStr,
        inputs: this.inputValues
      })
    }
  },
  methods: {
    handleInputChange (input, e) {
      if (input.postProcess) {
        input.value = input.postProcess(e.target.value)
      }
    },
    handleInputBlur (input, e) {
      const newVal = e.target.value

      if (
        typeof newVal === 'undefined' ||
        newVal === null ||
        newVal.length === 0 ||
        (input.validate && !input.validate(newVal))
      ) {
        input.value = `${this.cipherInputDefaults[input.name]}`
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
