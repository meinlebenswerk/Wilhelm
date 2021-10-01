<template lang="pug">
.page-wrapper
  .content
    h2 Wie können wir dich kontaktieren?
    .text * Pflichtfeld
    .text An die E-Mail, die du angibst, schicken wir zur Verifizierung eine TAN, damit kannst du dich auch später wieder einloggen.{{" "}}
      | Du kannst auch gerne deine Mobil- oder Festnetznummer angeben.{{" "}}
      | Für deine Registrierung brauchen wir die nicht, aber irgendwer muss dem Maxi ja eine Freundin suchen.
    WilhelmInput(:value="email" label="E-Mail" placeholder="albert.hofmann@sandoz.ch" required @change="emailChanged")
    WilhelmInput(:value="phone" label="Telefonnummer" placeholder="32168" numeric @change="phoneChanged")

  WilhelmButton(:disabled="buttonDisabled" @click="gotoNextPage") Weiter

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    buttonDisabled (): boolean {
      // eslint-disable-next-line no-control-regex
      const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21\x23-\x5B\x5D-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0B\x0C\x0E-\x1F\x21-\x5A\x53-\x7F]|\\[\x01-\x09\x0B\x0C\x0E-\x7F])+)\])/
      if (this.email.length < 2) { return true }
      if (!emailRegex.test(this.email)) { return true }

      return false
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
