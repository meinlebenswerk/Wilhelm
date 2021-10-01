<template lang="pug">
.page-wrapper
  .content
    h2 Bist du dir sicher?
    .text Bist du dir sicher, dass du diesen Platz ({{ coordinates }}) für deine Kunstwerk haben willst?
      br
      | Du kannst deine Auswahl (ohne höhere Mächte) nicht ändern.

  .button-wrapper
    WilhelmButton(@click="goBack" variant="text") Nein
    WilhelmButton(@click="claim") Ja!

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    coordinates (): string {
      return this.$route.params.coordinates ?? ''
    }
  },
  methods: {
    async claim (): Promise<void> {
      await this.$axios.post('/api/art/board/claim', { tan: this.$store.getters['user/tan'], coordinates: this.coordinates })
      this.$router.push(`/app/grid/${this.coordinates}`)
    },
    goBack (): void {
      this.$router.push(`/app/grid/${this.coordinates}`)
    }
  }
})
</script>

<style lang="scss" scoped>
.link {
  @apply underline cursor-pointer;
}
</style>
