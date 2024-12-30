<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">收藏</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="entry in favorites" :key="entry.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ entry.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(entry.date) }} - 由 {{ entry.author }} 发布
            </p>
          </div>
          <button @click="removeFromFavorites(entry)" class="text-yellow-500 hover:text-yellow-700">
            <StarIcon class="h-6 w-6 fill-current" />
          </button>
        </div>
        <p class="text-gray-700 dark:text-gray-300 mb-4">{{ entry.excerpt }}</p>
        <img v-if="entry.image" :src="entry.image" :alt="entry.title" class="rounded-lg max-w-full h-auto mb-4">
        <div class="flex justify-between items-center">
          <router-link :to="'/diary/' + entry.id" class="text-blue-500 hover:text-blue-700">阅读全文</router-link>
          <div class="flex items-center space-x-2">
            <button @click="likeEntry(entry)" class="text-gray-500 hover:text-red-500">
              <HeartIcon :class="{ 'text-red-500': entry.liked }" class="h-5 w-5" />
            </button>
            <span class="text-gray-600 dark:text-gray-400">{{ entry.likes }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { StarIcon, HeartIcon } from 'lucide-vue-next'

const favorites = ref([
  {
    id: 1,
    title: "神秘的古城",
    author: "贺念辰",
    date: new Date('2023-06-08'),
    excerpt: "今天我探索了一座神秘的古城，这里的建筑和历史让我着迷...",
    image: new URL('../assets/gucheng.jpg', import.meta.url).href,
    likes: 45,
    liked: false
  },
  {
    id: 2,
    title: "雪山之巅",
    author: "兰濯池",
    date: new Date('2023-06-11'),
    excerpt: "经过三天的艰苦攀登，我终于到达了雪山之巅，眼前的景色让我终生难忘...",
    image: new URL('../assets/xueshan.jpg', import.meta.url).href,
    likes: 67,
    liked: true
  },
  {
    id: 3,
    title: "热带雨林探险",
    author: "周也",
    date: new Date('2023-06-14'),
    excerpt: "在这片神秘的热带雨林中，我遇到了许多奇特的动植物，这里的生态系统真是太神奇了...",
    image: new URL('../assets/tropic.jpg', import.meta.url).href,
    liked: false
  }
])

const formatDate = (date) => {
  return new Intl.DateTimeFormat('zh-CN', { dateStyle: 'full' }).format(date)
}

const removeFromFavorites = (entry) => {
  if (confirm(`确定要从收藏中移除 "${entry.title}" 吗？`)) {
    favorites.value = favorites.value.filter(e => e.id !== entry.id)
  }
}

const likeEntry = (entry) => {
  entry.liked = !entry.liked
  entry.likes += entry.liked ? 1 : -1
}
</script>