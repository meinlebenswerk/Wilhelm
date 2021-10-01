<template lang="pug">
.wilhelm-card
  slot
</template>

<style lang="scss">
.wilhelm-card {
  @apply bg-white text-black;
  @apply rounded-md p-6 flex;

  & > * {
    @apply m-auto;
  }
}
</style>
