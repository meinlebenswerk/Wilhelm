<template lang="pug">
.wilhelm-checkbox-wrapper
  input(type="checkbox" v-model="internalValue")
  slot
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    value: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    internalValue: {
      get (): boolean {
        return this.value
      },
      set (val: boolean) {
        this.$emit('change', val)
      }
    }
  }
})
</script>
