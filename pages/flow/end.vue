<template lang="pug">
.page-wrapper
  .content
    h1 Dar war's schon!
    .text Du kannst dir jetzt ein Feld auswählen und losmalen!
    .text Du kannst dir auch anschauen, von wem welche Kunstwerk ist, und was sicher der/die Künstler(in) dabei
      | gedacht hat.

  WilhelmButton(@click="gotoNextPage") Weiter

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    gotoNextPage (): void {
      this.$router.push('/app/art')
    }
  }
})
</script>

<style lang="scss" scoped>
.link {
  @apply underline cursor-pointer;
}
</style>
