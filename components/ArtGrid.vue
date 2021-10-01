// This component also queries the available thingies ect

<template lang="pug">
.art-grid-wrapper(ref="wrapper")
  .art-grid
    .grid-column(v-for="gridColumn in columns")
      .grid-element(v-for="gridElement in gridColumn" :style="gridElementStyle" @click.stop="showElementDetails(gridElement.coordinates)")
        ClaimedIcon.icon(v-if="gridElement.owner")
        .coordinate(v-else) {{ gridElement.coordinates }}
        //- UnlockedIcon(src="~/assets/account-lock-open.svg").icon(v-else)
</template>

<script lang="ts">
import Vue from 'vue'
import ResizeObserver from 'resize-observer-polyfill'
import ClaimedIcon from '~/assets/flag.svg'
import { ArtGrid, ArtGridElement } from '~/types/API'

export default Vue.extend({
  components: {
    ClaimedIcon
  },
  data () {
    return {
      artGrid: null as ArtGrid | null,
      resizeObserver: null as ResizeObserver | null,
      elementSize: 0
    }
  },
  computed: {
    gridElementStyle (): Partial<CSSStyleDeclaration> {
      return {
        width: `${this.elementSize}px`,
        height: `${this.elementSize}px`
      }
    },
    columns (): ArtGridElement[][] {
      if (!this.artGrid) { return [] }
      return this.artGrid.data
    }
  },
  async mounted () {
    this.artGrid = (await this.$axios.get('/api/art/board')).data

    // Hook the resize-observer
    this.$nextTick(() => {
      this.resizeObserver = new ResizeObserver(this.resizeObserverCallback)
      this.resizeObserver.observe(this.$refs.wrapper as Element)
    })
  },
  methods: {
    resizeObserverCallback (entries: ResizeObserverEntry[], _: ResizeObserver): void {
      const entry = entries[0]
      // entry.borderBoxSize
      const { width, height } = entry.contentRect

      const elementSizeX = width / (this.artGrid?.size.x ?? 1)
      const elementSizeY = height / (this.artGrid?.size.y ?? 1)
      this.elementSize = Math.min(elementSizeX, elementSizeY)
    },
    showElementDetails (coordinates: string) {
      this.$router.push(`/app/grid/${coordinates}`)
    }
  }
})
</script>

<style lang="scss" scoped>

.art-grid-wrapper {
  @apply w-full h-full flex;
  max-height: 60vh;
}

.art-grid {
  @apply flex flex-row h-full mx-auto;
}

.grid-column {
  @apply max-h-full overflow-hidden;

  &:first-child > :first-child {
    @apply rounded-tl-md;
  }
  &:first-child > :last-child {
    @apply rounded-bl-md;
  }

  &:last-child > :first-child {
    @apply rounded-tr-md;
  }
  &:last-child > :last-child {
    @apply rounded-br-md;
  }

  & > :first-child {
    @apply border-t border-white;
  }
  & > :last-child {
    @apply border-b border-white;
  }

  &:last-child > * {
    @apply border-r border-white;
  }

  & > * {
    @apply border-l border-b border-white;
  }
}

.grid-element {
  @apply flex relative cursor-pointer;
  @apply transition-all duration-300;

  &:hover {
    @apply bg-white text-black;

    & .icon {
      fill: #000;
    }
  }

  .coordinate {
    @apply m-auto select-none;
  }

  .icon {
    @apply m-auto select-none;
    @apply transition-all duration-300;
    fill: #fff;
  }
}
</style>
