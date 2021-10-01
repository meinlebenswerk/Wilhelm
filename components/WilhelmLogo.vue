<template lang="pug">
  .wilhelm-logo(@click="gotoHome") wilhelm
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  methods: {
    gotoHome () {
      this.$router.push('/app/art')
    }
  }
})
</script>

<style lang="scss">
.wilhelm-logo {
  @apply font-display text-5xl m-4 select-none;
}
</style>
