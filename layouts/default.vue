<template lang="pug">
.app-wrapper
  WilhelmLogo
  Nuxt
</template>

<style lang="scss">

// Global Font imports
@import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Monoton&display=swap');

.app-wrapper {
  @apply w-full h-screen overflow-x-hidden;
  @apply font-sans flex flex-col p-4;
  @apply text-white bg-black;
  @apply text-base;
  flex-direction: column;
  max-width: 100vw;
}

.page-wrapper {
  @apply font-sans flex flex-col p-4 h-full;
  .content {
    @apply flex-1 px-2 py-2 w-full max-w-xl;
  }

  & > * {
    @apply mx-auto;
  }
}

h1,
h2,
h3,
h4,
h5,
h6 {
  @apply font-sans select-none;
}

h1 {
  @apply text-2xl font-black mb-6;
}
h2 {
  @apply text-xl font-bold;
}

.text,
.hint {
  @apply max-w-lg text-justify;
}

.text {
  @apply mb-8 mt-2;

  &.small {
    @apply text-sm text-gray-400;
  }

  &.error {
    @apply text-red-300;
  }
}

.button-wrapper {
  @apply flex flex-row w-full max-w-xl;
  & > * {
    @apply mx-2;
  }
}

</style>
