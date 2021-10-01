<template lang="pug">
button.wilhelm-button(:class="className" @click="handleClick")
  slot
</template>

<script lang="ts">
import Vue from 'vue'

type ButtonVariant = 'contained' | 'text' | 'outlined'

export default Vue.extend({
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    variant: {
      type: String as () => ButtonVariant,
      default: 'contained'
    },
    small: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    className (): string {
      let className = ''

      if (this.disabled) {
        className += ' disabled'
      }
      if (this.small) {
        className += ' small'
      }

      switch (this.variant) {
        case 'contained':
          className += ' contained'
          break
        case 'outlined':
          className += ' outlined'
          break
        case 'text':
          className += ' text-only'
          break
      }

      return className
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) { this.$emit('click') }
    }
  }
})
</script>

<style lang="scss" scoped>
.wilhelm-button {
  @apply rounded-full px-6 py-1 w-full my-2 h-12;
  @apply  font-sans font-semibold;
  @apply max-w-xl;

  &.contained {
    @apply bg-white text-gray-800;

    &.disabled {
      // TODO, even the luca styling is shit here
      @apply text-gray-400 bg-gray-200;
    }
  }

  &.text-only {
    @apply bg-transparent text-white;

    &.disabled {
      @apply text-gray-400;
    }
  }

  &.outlined {
    @apply bg-transparent text-white border border-white;

    &.disabled {
      @apply text-gray-400 border-gray-400;
    }
  }

  &.small {
    @apply w-auto p-2 h-auto;
  }

  & > * {
    @apply inline-block h-full;
  }
}
</style>
