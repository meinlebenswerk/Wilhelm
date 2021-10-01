<template lang="pug">
.page-wrapper
  .content
    h2 Herzlich Willkommen bei Wilhelm, {{ name }}
    .text Deine TAN ist:
    WilhelmCard.tan-card
      .tan {{ tan }}
    .text Du kannst sie direkt bei deinem Registrierungsprozess eingeben oder dich direkt damit{{" "}}
      a(href="http://wilhelm.app/flow/login").link einloggen
      | .
      br
      span.text.small Der Link funktioniert nur, wenn du dich in unserem Netzwerk befindest.
    .text Diese TAN ist direkt an deinen Account gebunden und funktioniert als dein Passwort,{{" "}}
      b gib sie nicht weiter
      | , sonst kann jemand deine Kunstwerke stehlen!

    .text.small Wenn du dich nicht registriert hast, kannst du diese Email ignorieren.
    .text.small Außer du weißt, wer von deinen Freunden der Spaßvogel war, dann schuldet er/sie dir nämlich jetzt ein Bier.

</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  layout: 'static',
  asyncData ({ query }): { name: string, tan: string} {
    let name = ''
    if (query.name) {
      if (Array.isArray(query.name)) {
        name = query.name[0] ?? ''
      } else {
        name = query.name
      }
    }

    let tan = ''
    if (query.tan) {
      if (Array.isArray(query.tan)) {
        tan = query.tan[0] ?? ''
      } else {
        tan = query.tan
      }
    }
    return { tan, name }
  },
  head: {
    link: [
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: '' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600&display=swap' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css2?family=Monoton&display=swap' }
    ]
  }
})
</script>

<style lang="scss">
.tan {
  @apply font-semibold text-lg;
}

.tan-card {
  @apply mb-8;
}
</style>
