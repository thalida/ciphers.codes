<template>
  <div :id="cipherId" class="cipher">
    <div class="cipher__header">
      <h2>
        <router-link :to="{name: 'about', params: { cipherKey }}">
          {{cipher.NAME}}
        </router-link>
      </h2>

      <div class="cipher__inputs" v-if="cipherHasInputs">
        <div
          class="cipher__input"
          v-for="(input, index) in cipherInputs"
          :key="index">
          <label>{{input.label}}</label>

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
    </div>

    <textarea
      class="cipher__output"
      v-model="outputStr"
      disabled>
    </textarea>

    <button
      class="cipher__copy"
      type="button"
      v-clipboard:copy="outputStr"
      v-clipboard:success="handleCopySuccess"
      v-clipboard:error="handleCopyError">
    </button>
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
      cipherInputDefaults: (cipherHasInputs) ? cipher.DEFAULTS.inputs : null
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
      let results = this.cipher.run({
        isEncoding: this.isEncoding,
        inputStr: this.inputStr,
        inputs: this.inputValues
      })

      if (typeof results === 'string') {
        return results
      }

      return (results.isSuccess) ? results.outputStr : results.errorStr
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
    },
    handleCopySuccess () {
      this.$emit('copy-success', this.cipher)
    },
    handleCopyError () {
      this.$emit('copy-error', this.cipher)
    }
  }
}
</script>

<style scoped lang="scss">
.cipher {
  display: flex;
  position: relative;
  flex-flow: column nowrap;
  margin: 3.2em 0;

  &__header {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.8em;
  }

  &__inputs {
    display: flex;
    flex-flow: row nowrap;
  }

  &__input {
    margin-left: 0.8em;
    font-size: 1.4em;

    label {
      margin-right: 0.4em;
      text-transform: lowercase;
    }

    input,
    select {
      height: 2.0em;
      border: 0;
      font: normal normal 1.0em/1.2 'Signika', Arial, sans-serif;
      border-radius: 0.6em;
      border: 0.2em solid #FFEEC3;
      background-color: #FFEEC3;
      text-align: left;

      &:focus {
        outline: none !important;
        border: 0.2em solid darken(#FFEEC3, 20%);
      }
    }

    input[type="number"],
    select {
      width: 3.5em;
    }

    input[type="text"] {
      width: 6.0em;
    }
  }

  &__output {
    border: 0;
    resize: none;
    height: 8.0em;
    padding: 1.0em;
    border: 0;
    border-radius: 0 0.8em 0.8em 0.8em;
    font: normal normal 1.8em/1.2 'Signika', Arial, sans-serif;
    color: #001D56;
    background-color: #F4F4F4;
  }

  &__copy {
    display: block;
    position: absolute;
    right: 1em;
    bottom: 1em;
    width: 1.4em;
    height: 1.4em;
    cursor: pointer;
    border: 0.1em solid #2B73FF;
    border-radius: 0 0.2em 0 0;
    background-color: #F4F4F4;

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0.25em;
      right: 0.25em;
      width: 1.4em;
      height: 1.4em;
      border: 0.1em solid #2B73FF;
      border-radius: 0.2em;
      background-color: #F4F4F4;
      box-shadow: 0.2em -0.2em 0 #F4F4F4;
    }

    &:hover {
      outline: none !important;
      opacity: 0.8;

      &::after {
        background-color: #FFEEC3;
      }
    }

    &:focus {
      outline: none !important;
      border: 0.1em solid #001D56;
      background-color: #FFEEC3;

      &::after {
        border: 0.1em solid #001D56;
        background-color: #FFEEC3;
      }
    }
  }
}
</style>
