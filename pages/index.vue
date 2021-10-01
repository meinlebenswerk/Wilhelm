<template lang="pug">
.page-wrapper
  .content
    h2 Willkommen bei der WebApp von wilhelm
    .text Wilhelm funktioniert am besten überall, egal ob auf PC oder deinem Smartphone.{{" "}}
      | Da sind wir einfach besser als andere WebApps, die vielleicht ähnlich aussehen.{{" "}}
      | Wobei jeden Ähnlichkeit mit lebenden oder toten Apps natürlich reiner Zufall ist.
    .text Wenn das dein erstes mal bei uns oder mit wilhelm ist, dann musst du erst durch den Login-Prozess,{{" "}}
      | sonst kannst du dich einfach mit deiner TAN einloggen!
  .button-wrapper
    WilhelmButton(@click="gotoLogin" variant="outlined") Login
    WilhelmButton(@click="gotoSignup") Registrieren

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  async mounted () {
    const { data: { ok } } = await this.$axios.get('/api/status')
    if (!ok) {
      this.$router.push('/error')
    }
  },
  methods: {
    gotoLogin () {
      this.$router.push('flow/login')
    },
    gotoSignup () {
      this.$router.push('flow/start')
    }
  }
})
</script>

<style lang="scss" scoped>
.link {
  @apply underline cursor-pointer;
}
</style>
