<template lang="pug">
.page-wrapper
  .content
    h2 Wie heißt du?
    .text * Pflichtfeld
    WilhelmInput(:value="firstname" label="Vorname" placeholder="Albert" required @change="firstnameChanged")
    WilhelmInput(:value="lastname" label="Nachname" placeholder="Hofmann" required @change="lastnameChanged")

  WilhelmButton(:disabled="buttonDisabled" @click="gotoNextPage") Weiter

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  computed: {
    buttonDisabled (): boolean {
      return this.firstname.length < 2 || this.lastname.length < 2
    },
    firstname: {
      get (): string {
        return this.$store.getters['setup/firstname']
      },
      set (val: string) {
        this.$store.commit('setup/setName', { firstname: val, lastname: this.lastname })
      }
    },
    lastname: {
      get (): string {
        return this.$store.getters['setup/lastname']
      },
      set (val: string) {
        this.$store.commit('setup/setName', { firstname: this.firstname, lastname: val })
      }
    }
  },
  methods: {
    firstnameChanged (val: string): void {
      this.firstname = val
    },
    lastnameChanged (val: string): void {
      this.lastname = val
    },
    gotoNextPage (): void {
      this.$router.push('/flow/contact')
    }
  }
})
</script>

<style lang="scss" scoped>
.link {
  @apply underline cursor-pointer;
}
</style>
