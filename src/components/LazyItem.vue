<template>
  <li ref="targetEl" :style="`min-height:${fixedMinHeight ? fixedMinHeight : minHeight}px`">
    <slot v-if="shouldRender"></slot>
  </li>
</template>

<script lang="ts">
import { useIntersectionObserver } from '@vueuse/core'
import { ref, nextTick } from 'vue'

function onIdle(cb = () => {}) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(cb)
  } else {
    setTimeout(() => {
      nextTick(cb)
    }, 300)
  }
}

// NOTE: Credits to: https://medium.com/js-dojo/lazy-rendering-in-vue-to-improve-performance-dcccd445d5f

export default {
  props: {
    renderOnIdle: Boolean,
    unrender: Boolean,
    minHeight: Number,
    unrenderDelay: {
      type: Number,
      default: 10000,
    },
  },
  setup(props) {
    const shouldRender = ref(false)
    const targetEl = ref()
    const fixedMinHeight = ref(0)
    let unrenderTimer: number
    let renderTimer: number

    const { stop } = useIntersectionObserver(
      targetEl,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          clearTimeout(unrenderTimer)

          renderTimer = setTimeout(() => (shouldRender.value = true), props.unrender ? 200 : 0)

          shouldRender.value = true

          if (!props.unrender) {
            stop()
          }
        } else if (props.unrender) {
          clearTimeout(renderTimer)

          unrenderTimer = setTimeout(() => {
            fixedMinHeight.value = targetEl.value?.clientHeight
            shouldRender.value = false
          }, props.unrenderDelay)
        }
      },
      {
        rootMargin: '600px',
      },
    )

    if (props.renderOnIdle) {
      onIdle(() => {
        shouldRender.value = true

        if (!props.unrender) {
          stop()
        }
      })
    }

    return { targetEl, shouldRender, fixedMinHeight }
  },
}
</script>
