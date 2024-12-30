<template>
  <div>
    <h2 class="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">已完成的日记</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="entry in entries" :key="entry.id"
        class="bg-white dark:bg-gray-800 shadow rounded-lg p-4 transition-all duration-300 hover:shadow-lg">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ entry.title }}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-400">{{ entry.date }}</p>
        <p class="mt-2 text-gray-700 dark:text-gray-300 line-clamp-3">{{ entry.content }}</p>
        <img v-if="entry.image" :src="entry.image" alt="日记图片" class="mt-2 rounded-md max-w-full h-auto" />
        <p v-if="entry.location" class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          位置: {{ entry.location }}
        </p>
        <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
          可见性: {{ getVisibilityText(entry.visibility) }}
        </p>
        <div class="mt-4 flex space-x-4">
          <button @click="likeEntry(entry)" class="text-blue-500 hover:text-blue-600">
            <ThumbsUpIcon :class="{ 'fill-current': entry.liked }" /> {{ entry.likes }}
          </button>
          <button @click="toggleComments(entry)" class="text-green-500 hover:text-green-600">
            <MessageCircleIcon /> {{ entry.comments.length }}
          </button>
          <button @click="shareEntry(entry)" class="text-yellow-500 hover:text-yellow-600">
            <ShareIcon />
          </button>
          <button @click="toggleFavorite(entry)" class="text-red-500 hover:text-red-600">
            <BookmarkIcon :class="{ 'fill-current': entry.favorited }" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ThumbsUpIcon, MessageCircleIcon, ShareIcon, BookmarkIcon } from 'lucide-vue-next'

const props = defineProps({
  entries: {
    type: Array,
    required: true
  }
})

const getVisibilityText = (visibility) => {
  switch (visibility) {
    case 'public': return '公开'
    case 'friends': return '好友可见'
    case 'private': return '仅自己可见'
    default: return '未知'
  }
}

const likeEntry = (entry) => {
  entry.liked = !entry.liked
  entry.likes += entry.liked ? 1 : -1
}

const toggleComments = (entry) => {
  entry.showComments = !entry.showComments
}

const shareEntry = (entry) => {
  alert(`分享日记: ${entry.title}`)
}

const toggleFavorite = (entry) => {
  entry.favorited = !entry.favorited
}
</script>