<template lang="pug">
.page-wrapper
  .content

    h1
      WilhelmButton(small variant="text" @click="goBack")
        BackIcon(fill="#fff")
      | {{" "}}Kunstwerk {{ coordinates }}
      LockedIcon.lock-icon(v-if="isOwned")
      UnlockedIcon.lock-icon(v-else)
    .text(v-if="isOwnedByCurrentUser") Hier kannst du einen Kommentar zu deinem Kunstwerk hinterlassen, um den Besuchern{{" "}}
      | unserer Ausstellung näher zu bringen, was du dir dabei gedacht hast.
    .text(v-else) {{ localComment }}
    WilhelmTextbox(:value="localComment" @change="handleCommentChange" v-if="isOwnedByCurrentUser").comment-box
    WilhelmButton(v-if="dirtyFlag" @click="saveComment") Speichern
  .owner-info(v-if="isOwned")
    .name {{ ownerName }}
    .date {{ dateCreated }}
  .button-wrapper
    WilhelmButton( @click="goBack" variant="text") Zurück
    WilhelmButton(v-if="canBeClaimed" @click="claim") Auswählen

</template>

<script lang="ts">
import Vue from 'vue'
import BackIcon from '~/assets/arrow-left-circle.svg'
import LockedIcon from '~/assets/lock.svg'
import UnlockedIcon from '~/assets/lock-open.svg'
import { ArtGridElement } from '~/types/API'

export default Vue.extend({
  components: {
    BackIcon,
    LockedIcon,
    UnlockedIcon
  },
  data () {
    return {
      info: null as ArtGridElement | null,
      localComment: '' as string,
      userCanClaimGridlet: false
    }
  },
  computed: {
    coordinates ():string {
      return this.$route.params.coordinate
    },
    isOwned (): boolean {
      if (!this.info) { return true }
      return !!this.info.owner
    },
    canBeClaimed (): boolean {
      return this.userCanClaimGridlet && !this.isOwned
    },
    ownerName (): string {
      if (!this.info?.owner) { return '' }
      return `${this.info.owner.firstname} ${this.info.owner.lastname}`
    },
    dateCreated (): string {
      if (!this.info?.ownedAt) { return '' }
      return new Date(this.info.ownedAt).toISOString?.().slice(0, 10) ?? ''
    },
    isOwnedByCurrentUser (): boolean {
      if (!this.info?.owner) { return false }
      return this.info.owner.id === this.$store.getters['user/id']
    },
    dirtyFlag (): boolean {
      if (!this.info) { return false }
      return !(this.info.comment === this.localComment)
    }
  },
  async mounted () {
    this.info = (await this.$axios.get(`/api/art/board/${this.coordinates}`)).data
    const userInfo = (await this.$axios.get(`/api/art/status/${this.$store.getters['user/tan']}`)).data
    this.userCanClaimGridlet = !userInfo.ownsGridlet
    this.localComment = this.info?.comment ?? ''
  },
  methods: {
    goBack () {
      this.$router.push('/app/art')
    },
    claim () {
      this.$router.push(`/gatekeeper/selection/${this.coordinates}`)
    },
    handleCommentChange (val: string) {
      this.localComment = val
    },
    async saveComment (): Promise<void> {
      const body = {
        tan: this.$store.getters['user/tan'],
        coordinates: this.coordinates,
        comment: this.localComment
      }
      this.info = (await this.$axios.post('/api/art/board/update', body)).data
    }
  }
})
</script>

<style lang="scss" scoped>
.content {
  @apply flex flex-col;
}

.lock-icon {
  @apply mx-2 inline-block;
  fill: #fff;
}

.owner-info {
  @apply ml-auto mr-2;
}

.comment-box {
  @apply flex-1;
}
</style>
