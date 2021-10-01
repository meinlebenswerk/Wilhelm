<template lang="pug">
.wilhelm-input
  .wilhelm-input-wrapper
    input(:type="inputType" v-model.lazy="internalValue" id="input" :placeholder="computedPlaceholder")
    label(for="input" v-if="label") {{computedLabel}}
  .hint(v-if="showHint") Dies ist ein Pflichtfeld.
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    numeric: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dirty: false
    }
  },
  computed: {
    internalValue: {
      get (): string {
        return this.value
      },
      set (val: string) {
        this.$emit('change', val)
        this.dirty = true
      }
    },
    showHint (): boolean {
      return this.dirty && this.required && this.value.length === 0
    },
    computedPlaceholder (): string {
      return `z.B. ${this.placeholder}`
    },
    computedLabel (): string {
      return `${this.required ? '* ' : ''}${this.label}`
    },
    inputType (): string {
      if (this.numeric) { return 'number' }
      return 'text'
    }
  },
  mounted () {
    this.dirty = false
  }
})
</script>

<style lang="scss" scoped>
.wilhelm-input-wrapper {
  @apply font-semibold relative;

  input {
    @apply h-14 w-full rounded-md p-4 transition-all duration-200;
    @apply border border-solid border-gray-500;
    @apply bg-black text-xl font-semibold;

    &::placeholder {
      @apply opacity-0 transition-opacity duration-300;
    }

    &:focus,
    &:hover {
      @apply border-white;
    }
  }

  label {
    @apply bg-black absolute px-2 text-xl font-semibold;
    @apply transition-all duration-200;
    @apply text-gray-400;

    top: 50%;
    left: 16px;

    transform: translateY(-50%);
  }

  // Show placeholder only if selected / hovered:
  input:placeholder-shown:focus,
  input:placeholder-shown:hover {
    &::placeholder {
      opacity: 1;
    }
  }

  input:focus + label,
  input:hover + label,
  input:not(:placeholder-shown) + label {
    @apply top-0 text-base text-white;
  }
}

.wilhelm-input {
  @apply mb-4;

  .hint {
    @apply text-sm font-semibold my-1;
  }
}

// Hide Spinners on numeric input
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
</style>
