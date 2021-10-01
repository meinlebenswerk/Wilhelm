<template lang="pug">
.page-wrapper
  .content
    h2 E-Mail verifizieren
    .text * Pflichtfeld
    .text Wir haben dir eine TAN an {{email}} geschickt.{{" "}}
      br
      | Gib die TAN hier ein, um deine E-Mail zu bestätigen.
    .text.small.error(v-if="error") Die TAN die du eigeben hast war leider falsch.{{" "}}
      br
      | Kopier einfach die TAN aus der E-Mail die du bekommen hast.{{" "}}
      | Wenn du keine Mail bekommen hast, kannst du entweder noch kurz warten, oder eine neue E-Mail{{" "}}
      | anfordern via "Ich habe keine TAN erhalten"
    WilhelmInput(:value="tan" label="TAN" placeholder="z.B. 123JJ56" required @change="tanChanged")
    WilhelmButton(@click="gotoEmail" variant="text") Ich habe keine TAN erhalten
  .button-wrapper
    WilhelmButton(@click="gotoHome" variant="outlined") Abbrechen
    WilhelmButton(:disabled="buttonDisabled" @click="login") Bestätigen

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      tan: '',
      error: false
    }
  },
  computed: {
    buttonDisabled (): boolean {
      return this.tan.length !== 8
    },
    email (): string {
      return this.$store.getters['setup/email']
    }
  },
  methods: {
    tanChanged (val: string): void {
      this.tan = val
    },
    gotoHome (): void {
      this.$router.push('/')
    },
    gotoEmail (): void {
      this.$router.push('/flow/email')
    },
    async login (): Promise<void> {
      this.$nuxt.$loading.start()
      //  TODO deal with 404 here
      await this.$store.dispatch('user/login', this.tan)
      this.$nuxt.$loading.finish()
      // check if we're logged in, now
      if (this.$store.getters['user/isLoggedIn']) {
        this.$router.push('/flow/end')
      } else {
        this.error = true
      }
    }
  }
})
</script>

<style lang="scss" scoped>
.link {
  @apply underline cursor-pointer;
}
</style>
