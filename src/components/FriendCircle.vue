<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">好友圈</h2>
    <div class="space-y-6">
      <div v-for="post in friendPosts" :key="post.id" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div class="flex items-center mb-4">
          <img :src="post.avatar" :alt="post.author" class="w-10 h-10 rounded-full mr-4">
          <div>
            <h3 class="font-semibold text-gray-800 dark:text-white">{{ post.author }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(post.date) }}</p>
          </div>
        </div>
        <p class="text-gray-700 dark:text-gray-300 mb-4">{{ post.content }}</p>
        <img v-if="post.image" :src="post.image" :alt="post.content" class="rounded-lg max-w-full h-auto mb-4">
        <div class="flex justify-between items-center">
          <div class="flex space-x-4">
            <button @click="likePost(post)"
              class="flex items-center text-gray-600 dark:text-gray-400 hover:text-blue-500">
              <ThumbsUpIcon :class="{ 'text-blue-500': post.liked }" class="h-5 w-5 mr-1" />
              <span>{{ post.likes }}</span>
            </button>
            <button @click="toggleComments(post)"
              class="flex items-center text-gray-600 dark:text-gray-400 hover:text-green-500">
              <MessageCircleIcon class="h-5 w-5 mr-1" />
              <span>{{ post.comments.length }}</span>
            </button>
          </div>
          <button @click="sharePost(post)" class="text-gray-600 dark:text-gray-400 hover:text-yellow-500">
            <ShareIcon class="h-5 w-5" />
          </button>
        </div>
        <div v-if="post.showComments" class="mt-4">
          <div v-for="comment in post.comments" :key="comment.id" class="bg-gray-100 dark:bg-gray-700 rounded p-3 mb-2">
            <p class="text-sm text-gray-800 dark:text-gray-200"><strong>{{ comment.author }}:</strong> {{
              comment.content }}</p>
          </div>
          <form @submit.prevent="addComment(post)" class="mt-2 flex">
            <input v-model="newComment" type="text" placeholder="添加评论..."
              class="flex-grow rounded-l-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-600 dark:border-gray-500 dark:text-white">
            <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600">发送</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ThumbsUpIcon, MessageCircleIcon, ShareIcon } from 'lucide-vue-next'

const friendPosts = ref([
  {
    id: 1,
    author: '茉莉',
    avatar: new URL('../assets/avatar4.jpg', import.meta.url).href,
    date: new Date('2023-06-15T10:30:00'),
    content: '今天去了长城，真是太壮观了！',
    image: new URL('../assets/greatwall.jpg', import.meta.url).href,
    likes: 15,
    liked: false,
    comments: [
      { id: 1, author: '贝贝', content: '看起来很棒！下次我也要去。' },
      { id: 2, author: '帆帆', content: '长城真的很震撼，你们玩得开心吗？' }
    ],
    showComments: false
  },
  {
    id: 2,
    author: '帆帆',
    avatar: new URL('../assets/avatar5.jpg', import.meta.url).href,
    date: new Date('2023-06-14T14:20:00'),
    content: '刚刚品尝了一家新开的日料店，味道真不错！',
    image: new URL('../assets/riliao.jpg', import.meta.url).href,
    likes: 8,
    liked: false,
    comments: [],
    showComments: false
  }
])

const newComment = ref('')

const formatDate = (date) => {
  return new Intl.DateTimeFormat('zh-CN', { dateStyle: 'full', timeStyle: 'short' }).format(date)
}

const likePost = (post) => {
  post.liked = !post.liked
  post.likes += post.liked ? 1 : -1
}

const toggleComments = (post) => {
  post.showComments = !post.showComments
}

const sharePost = (post) => {
  alert(`分享帖子: ${post.content}`)
}

const addComment = (post) => {
  if (newComment.value.trim()) {
    post.comments.push({
      id: Date.now(),
      author: '当前用户',
      content: newComment.value.trim()
    })
    newComment.value = ''
  }
}
</script>