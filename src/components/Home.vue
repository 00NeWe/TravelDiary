<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <!-- 视频轮播 -->
    <div class="relative h-[70vh] overflow-hidden">
      <div class="absolute inset-0 bg-black bg-opacity-50 z-10"></div>
      <Transition name="fade" mode="out-in">
        <video :key="currentVideoIndex" ref="videoPlayer" :src="videoSources[currentVideoIndex]"
          class="absolute inset-0 w-full h-full object-cover" autoplay loop muted playsinline></video>
      </Transition>
      <div class="absolute inset-0 flex items-center justify-center z-20">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold text-white mb-4">记录你的旅行故事</h1>
          <p class="text-xl md:text-2xl text-white mb-8">探索世界，分享精彩</p>
          <router-link to="/my-diary"
            class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105">
            开始写日记
          </router-link>
        </div>
      </div>
      <div class="absolute bottom-4 left-4 right-4 flex justify-between z-20">
        <button @click="prevVideo"
          class="bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition duration-300">
          <ChevronLeftIcon class="h-6 w-6 text-black" />
        </button>
        <button @click="nextVideo"
          class="bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition duration-300">
          <ChevronRightIcon class="h-6 w-6 text-black" />
        </button>
      </div>
    </div>

    <div class="container mx-auto px-4 py-12">
      <!-- 精选日记 -->
      <section class="mb-16">
        <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">精选日记</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="diary in featuredDiaries" :key="diary.id"
            class="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out transform hover:scale-105">
            <img :src="diary.imageUrl" :alt="diary.title" class="w-full h-48 object-cover" />
            <div class="p-6">
              <h3 class="text-xl font-semibold text-gray-800 dark:text-white mb-2">{{ diary.title }}</h3>
              <p class="text-gray-600 dark:text-gray-300 mb-4">{{ diary.excerpt }}</p>
              <div class="flex items-center justify-between">
                <span class="text-sm text-gray-500 dark:text-gray-400">{{ diary.date }}</span>
                <router-link :to="`/diary/${diary.id}`"
                  class="text-blue-500 hover:text-blue-600 font-medium">阅读更多</router-link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 热门博主 -->
      <section>
        <h2 class="text-3xl font-bold text-gray-800 dark:text-white mb-6">热门博主</h2>
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          <div v-for="blogger in popularBloggers" :key="blogger.id" class="flex flex-col items-center">
            <img :src="blogger.avatar" :alt="blogger.name" class="w-24 h-24 rounded-full mb-4 object-cover" />
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white mb-1">{{ blogger.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-300 mb-2">{{ blogger.followers }} 关注者</p>
            <button
              class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full text-sm transition duration-300 ease-in-out">
              关注
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'


const videoSources = [
  new URL('../assets/videos/travel1.mp4', import.meta.url).href,
  new URL('../assets/videos/travel2.mp4', import.meta.url).href,
  new URL('../assets/videos/travel3.mp4', import.meta.url).href,
  new URL('../assets/videos/travel4.mp4', import.meta.url).href,
  new URL('../assets/videos/travel5.mp4', import.meta.url).href
]

const currentVideoIndex = ref(0)
const videoPlayer = ref(null)

const nextVideo = () => {
  currentVideoIndex.value = (currentVideoIndex.value + 1) % videoSources.length
}

const prevVideo = () => {
  currentVideoIndex.value = (currentVideoIndex.value - 1 + videoSources.length) % videoSources.length
}
// 添加自动播放逻辑
let autoplayInterval

const startAutoplay = () => {
  autoplayInterval = setInterval(nextVideo, 5000) // 每5秒切换一次视频
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
}
onMounted(() => {
  if (videoPlayer.value) {
    videoPlayer.value.addEventListener('ended', nextVideo)
    // 开始自动播放
    startAutoplay()
  }
})
onUnmounted(() => {
  if (videoPlayer.value) {
    videoPlayer.value.removeEventListener('ended', nextVideo)
  }
  // 清理自动播放定时器
  stopAutoplay()
})
const featuredDiaries = [
  {
    id: 1,
    title: '巴黎的浪漫时光',
    excerpt: '漫步塞纳河畔，感受艺术与历史的交织...',
    imageUrl: new URL('../assets/seine-paris.jpg', import.meta.url).href,
    date: '2023年6月15日'
  },
  {
    id: 2,
    title: '东京美食之旅',
    excerpt: '从街边小吃到米其林餐厅，探索日本的味蕾盛宴...',
    imageUrl: new URL('../assets/Japan.jpg', import.meta.url).href,
    date: '2023年7月2日'
  },
  {
    id: 3,
    title: '纽约的文化冒险',
    excerpt: '从百老汇到现代艺术博物馆，体验多元文化的魅力...',
    imageUrl: new URL('../assets/Broadway.jpg', import.meta.url).href,
    date: '2023年8月10日'
  }
]

const popularBloggers = [
  {
    id: 1,
    name: '旅行家葛浩文',
    avatar: new URL('../assets/traveller.jpg', import.meta.url).href,
    followers: '10.5K'
  },
  {
    id: 2,
    name: '美食探险家伊万卡',
    avatar: new URL('../assets/gourmet.jpg', import.meta.url).href,
    followers: '8.2K'
  },
  {
    id: 3,
    name: '摄影师戴乃迭',
    avatar: new URL('../assets/cameraman.jpg', import.meta.url).href,
    followers: '15.7K'
  },
  {
    id: 4,
    name: '背包客林西莉',
    avatar: new URL('../assets/backpacker.jpg', import.meta.url).href,
    followers: '6.9K'
  }
]
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>