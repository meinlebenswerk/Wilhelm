<template lang="pug">
.page-wrapper
  .content
    h2 Es ist ein Problem aufgetreten....
    .text Leider ist wilhelm auf die Hilfe von echten Services, wie E-Mail angewiesen - und die scheinen gerade nicht zu funktionieren...
    .text Am besten wartest du kurz, dann sollte alles wieder funktionieren!
    .text Du kannst entweder manuell überprüfen, ob alles wieder okay ist - oder lass es die WebApp automatisch alle 10 Sekunden machen.

  WilhelmButton(@click="checkServer") Nochmal versuchen

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      refreshTimer: null as NodeJS.Timeout | null
    }
  },
  async mounted () {
    await this.checkServer()
    this.refreshTimer = setInterval(this.checkServer, 10000)
  },
  beforeDestroy () {
    if (this.refreshTimer) {
      clearInterval(this.refreshTimer)
    }
  },
  methods: {
    async checkServer () {
      const { data: { ok } } = await this.$axios.get('/api/status')
      if (ok) {
        this.$router.push('/')
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
