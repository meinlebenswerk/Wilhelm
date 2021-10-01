<template lang="pug">
.page-wrapper
  .content
    h2 Überprüfe deine E-Mail
    .text * Pflichtfeld
    .text Wenn du keine TAN erhalten hast, bitte schau erst in deinen E-Mails nach und gib dem Server ein bisschen Zeit{{" "}}
      | bis die ankommt (Sollte aber so im 1-5 Minuten passieren).
    .text Falls dann immernoch nichts passiert ist, kannst du deine E-Mail nochmal ändern:
    WilhelmInput(:value="email" label="E-Mail" placeholder="albert.hofmann@sandoz.ch" required @change="emailChanged")

  .button-wrapper
    WilhelmButton(@click="gotoTANCheck" variant="text") TAN erhalten
    WilhelmButton(@click="gotoNextPage") Weiter

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    buttonDisabled (): boolean {
      return this.email.length > 2
    },
    email: {
      get (): string {
        return this.$store.getters['setup/email']
      },
      set (val: string): void {
        this.$store.commit('setup/setContactInformation', { email: val, phone: this.phone })
      }
    },
    phone: {
      get (): string {
        return this.$store.getters['setup/phone']
      },
      set (val: string): void {
        this.$store.commit('setup/setContactInformation', { email: this.email, phone: val })
      }
    }
  },
  methods: {
    emailChanged (val: string): void {
      this.email = val
    },
    phoneChanged (val: string): void {
      this.phone = val
    },
    gotoTANCheck (): void {
      this.$router.push('/flow/verifyTAN')
    },
    gotoNextPage (): void {
      // This should dispatch a call to the backend here and the navigate.
      this.$axios.post('/api/users/create', this.$store.getters['setup/userInfo'])
      this.$router.push('/flow/verifyTAN')
    }
  }
})
</script>

<style lang="scss" scoped>
.link {
  @apply underline cursor-pointer;
}
</style>
