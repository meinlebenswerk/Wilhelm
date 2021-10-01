<template lang="pug">
LazyHydrate(never)
  Layout
</template>

<script lang="ts">
import Vue from 'vue'
import LazyHydrate from 'vue-lazy-hydration'
import Layout from './default.vue'
export default Vue.extend({
  components: {
    LazyHydrate,
    Layout
  }
})
</script>
