<template>
  <div class="mb-8">
    <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">搜索结果</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <h3 class="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">我的日记</h3>
        <ul class="space-y-2">
          <li v-for="result in myResults" :key="result.id" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h4 class="font-semibold text-gray-800 dark:text-white">{{ result.title }}</h4>
            <p class="text-gray-600 dark:text-gray-400">{{ result.content }}</p>
          </li>
        </ul>
      </div>
      <div>
        <h3 class="text-xl font-semibold mb-2 text-gray-700 dark:text-gray-300">好友的日记</h3>
        <ul class="space-y-2">
          <li v-for="result in friendResults" :key="result.id" class="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
            <h4 class="font-semibold text-gray-800 dark:text-white">{{ result.title }}</h4>
            <p class="text-gray-600 dark:text-gray-400">{{ result.content }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  results: {
    type: Array,
    required: true
  }
})

const myResults = computed(() => props.results.filter(result => result.type === 'my'))
const friendResults = computed(() => props.results.filter(result => result.type === 'friend'))
</script>