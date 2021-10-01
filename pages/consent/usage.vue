<template lang="pug">
.page-wrapper
  .content
    h2 Nutzungsbedingungen
    .text Mit verwendung dieser WebApp verpflichte ich mich, ausschließlich ein das von mir{{" "}}
      | ausgewählte Kästchen zu malen und nicht die Kunstwerke anderer zu übermalen, beschädigen usw.{{" "}}
      | Die Betreiber dieser genialen Lösung behalten sich die Rechte, Nutzer, deren Daten und Kommentare{{" "}}
      | wieder zu entfernen, wenn sie entweder Platz brauchen oder der Nutzer nicht länger Teil unserer{{" "}}
      | Künstlergruppe ist.{{" "}}
    .text Datensicherheit ist eine Sache, die wir zwar cool finden, aber alle Informationen, die in dieser App{{" "}}
      | eigegeben werden, werden in Klartext, d.h. nicht verschlüsselt, gespeichert.

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      termsAccepted: false
    }
  },
  computed: {
    buttonDisabled (): boolean {
      return !this.termsAccepted
    }
  },
  methods: {
    termsChanged (val: boolean): void {
      this.termsAccepted = val
    },
    gotoNextPage (): void {
      this.$router.push('/gatekeeper/data')
    }
  }
})
</script>

<style lang="scss" scoped>
.link {
  @apply underline cursor-pointer;
}
</style>
