<template lang="pug">
.page-wrapper
  .content
    h2 Kritzelschutzrichtlinien
    .text Die einzige Regel der hier erbrachte Kunstwerke unterliegen, ist dass sie sich auf das vom Nutzer{{" "}}
      | ausgewählte Feld beschränken müssen.

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
