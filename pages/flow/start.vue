<template lang="pug">
.page-wrapper
  .content
    h2 Hallo
    .text wilhelm hilft dir bei und "sicheren" Angabe deiner Kontaktinformationen,
      |  wenn du Kunstwerke auf unserer Tafel hinterlassen willst.
    .text Ich habe die{{" "}}
      NuxtLink(to="/consent/kritzelschutz").link Kritzelschutzrichtlinien
      | {{" "}}zu Kenntnis genommen

    WilhelmCheckbox(:value="termsAccepted" @change="termsChanged") Ich stimme den{{" "}}
      NuxtLink(to="/consent/usage").link Nutzungsbedingungen
      | {{" "}}zu.

  WilhelmButton(:disabled="buttonDisabled" @click="gotoNextPage") Los geht's

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
