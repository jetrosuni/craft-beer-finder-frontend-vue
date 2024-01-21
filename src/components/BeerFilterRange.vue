<template>
  <div class="relative mb-6">
    <label for="steps-range" class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">{{
      label
    }}</label>
    <input
      id="steps-range"
      type="range"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      class="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 dark:bg-gray-700"
      @change.stop="(event: Event) => $emit('change', +(event.target as HTMLInputElement).value)"
    />
    <template v-if="ticks?.[0]">
      <span class="absolute -bottom-6 start-0 text-sm text-gray-500 dark:text-gray-400">{{
        ticks[0]
      }}</span>
      <span
        class="absolute -bottom-6 start-1/4 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400 rtl:translate-x-1/2"
        >{{ ticks[1] }}</span
      >
      <span
        class="absolute -bottom-6 start-2/4 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400 rtl:translate-x-1/2"
        >{{ ticks[2] }}</span
      >
      <span
        class="absolute -bottom-6 start-3/4 -translate-x-1/2 text-sm text-gray-500 dark:text-gray-400 rtl:translate-x-1/2"
        >{{ ticks[3] }}</span
      >
      <span class="absolute -bottom-6 end-0 text-sm text-gray-500 dark:text-gray-400">{{
        ticks[4]
      }}</span>
    </template>
    <template v-else>
      <span class="absolute -bottom-6 start-0 text-sm text-gray-500 dark:text-gray-400">{{
        min
      }}</span>
      <span class="absolute -bottom-6 end-0 text-sm text-gray-500 dark:text-gray-400">{{
        max
      }}</span>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'

export default defineComponent({
  name: 'BeerFilterRange',
  props: {
    isDisabled: { type: Boolean, default: () => false },
    min: { type: [String, Number, undefined] as PropType<string | number | undefined> },
    max: { type: [String, Number, undefined] as PropType<string | number | undefined> },
    step: { type: [String, Number, undefined] as PropType<string | number | undefined> },
    label: String,
    ticks: { type: [Array, undefined] as PropType<Array<string> | undefined> },
    value: { type: [String, Number, undefined] as PropType<string | number | undefined> },
  },
})
</script>
