<template lang="pug">
.page-wrapper
  .content
    h2 Login mit TAN
    .text * Pflichtfeld
    .text Willkommen zurück, wenn du schon einmal da warst, und eine TAN von uns bekommen hast,{{" "}}
      | kannst du dich einfach mit der wieder einloggen.
    .text Falls du dich nicht mehr erinnern kannst, weil du letztes mal zu betrunken warst,{{" "}}
      | registrier dich einfach nochmal.{{" "}}
      | Falls du schon einen Account hast, wird dir wieder die gleiche TAN zugewiesen.
    .text.small.error(v-if="error") Die TAN die du eigeben hast war leider falsch.{{" "}}
      | Entweder du hast noch keinen Account, oder es ist was schief gegangen.{{" "}}
      | Wenn du dir sicher bist, dass du einen Account haben solltest, kannst du dich an den Support wenden.
    WilhelmInput(:value="tan" label="TAN" placeholder="z.B. 123JJ56" required @change="tanChanged")
    WilhelmButton(@click="gotoSignup" variant="text") Ich habe meine TAN gelöscht/vergssen

  WilhelmButton(:disabled="buttonDisabled" @click="signin") Bestätigen

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
    }
  },
  methods: {
    tanChanged (val: string): void {
      this.tan = val
    },
    gotoSignup (): void {
      this.$router.push('/flow/start')
    },
    async signin (): Promise<void> {
      this.$nuxt.$loading.start()
      //  TODO deal with 404 here
      await this.$store.dispatch('user/login', this.tan)
      this.$nuxt.$loading.finish()
      // check if we're logged in, now
      if (this.$store.getters['user/isLoggedIn']) {
        this.$router.push('/app/art')
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
