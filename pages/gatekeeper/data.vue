<template lang="pug">
.page-wrapper
  .content
    h2 Deine Daten
    .text Bitte gib im nächsten Schritt deine Kontaktinformationen an.{{" "}}
      | Deine Daten werden{{" "}}
      b nicht{{" "}}
      | verschlüsselt. Ich hab keinen Bock mir dafür was cooles auszudenken, und wenn du ein
      | Problem damit hast, ist das halt dein Problem.
    .text Zudem stelle bitte sicher, dass du dich nicht im privaten Modus deines Browsers befindest.
    .text Das funktionert zu 100% auch, aber du bist halt nicht mehr angemeldet, wenn du die Seite das{{" "}}
      | nächste mal aufmachst.
    .text Weil ich keinen Bock habe, sowas wie Passwörter, etc... einzubauen wirds dazu noch ne super Müll{{" "}}
      | Lösung geben, aber mal sehen.

  WilhelmButton(@click="gotoNextPage") Verstanden!

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  methods: {
    gotoNextPage (): void {
      this.$router.push('/flow/name')
    }
  }
})
</script>

<style lang="scss" scoped>
.link {
  @apply underline cursor-pointer;
}
</style>
