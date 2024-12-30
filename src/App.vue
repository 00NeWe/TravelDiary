<template>
  <div class="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
    <!-- 移动端汉堡菜单 -->
    <div class="lg:hidden">
      <button @click="toggleMobileMenu"
        class="fixed top-4 left-4 z-50 p-2 rounded-lg dark:bg-gray-800 text-gray-800 dark:text-white">
        <MenuIcon v-if="!showMobileMenu" class="h-6 w-6" />
      </button>

      <Transition name="slide">
        <div v-if="showMobileMenu" class="fixed inset-0 bg-gray-800/75 backdrop-blur-sm z-40">
          <div class="bg-gray-100 dark:bg-gray-900 w-64 h-full overflow-y-auto relative">
            <button @click="toggleMobileMenu"
              class="absolute top-4 right-4 p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white">
              <XIcon class="h-6 w-6" />
            </button>
            <div class="p-4 mb-4 flex items-center">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%97%85%E8%A1%8C-FF7jsf4lMG65xayI5LNhEeQUvGM5pk.png"
                alt="Logo" class="h-8 w-8 mr-2" />
              <h1 class="text-2xl font-bold text-gray-800 dark:text-white">旅行日记</h1>
            </div>

            <NavigationMenu :items="navigationItems" @reorder="handleReorder" @select="handleMobileMenuSelect" />

            <!-- 移动端用户信息 -->
            <div class="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 px-4">
              <UserAccount :user="currentUser" @logout="handleLogout" />


            </div>
          </div>
        </div>
      </Transition>
    </div>

    <div class="flex">
      <!-- 桌面端导航栏 -->
      <div
        class="hidden lg:block w-64 bg-gray-100 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen overflow-y-auto fixed">
        <div class="p-4 mb-4 flex items-center">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%E6%97%85%E8%A1%8C-FF7jsf4lMG65xayI5LNhEeQUvGM5pk.png"
            alt="Logo" class="h-8 w-8 mr-2" />
          <h1 class="text-2xl font-bold text-gray-800 dark:text-white">旅行日记</h1>
        </div>
        <NavigationMenu :items="navigationItems" @reorder="handleReorder" />
      </div>

      <!-- 主内容区 -->
      <div class="lg:ml-64 flex-1">
        <div class="container mx-auto px-4 py-8">
          <!-- 顶部栏 -->
          <header class="mb-8 flex justify-end items-center">
            <div class="flex items-center space-x-2 md:space-x-4">
              <!-- 搜索栏（移动端为图标） -->
              <div class="relative">
                <button @click="toggleSearch"
                  class="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white">
                  <SearchIcon class="h-5 w-5" />
                </button>

                <div class="hidden md:block">
                  <SearchBar @search="handleSearch" @clear="clearSearch" />
                </div>

                <!-- 移动端搜索弹出框 -->
                <Transition name="fade">
                  <div v-if="showMobileSearch" class="absolute top-full right-0 mt-2 w-screen max-w-md md:hidden">
                    <SearchBar @search="handleMobileSearch" @clear="clearSearch" />
                  </div>
                </Transition>
              </div>

              <WeatherWidget />

              <button @click="toggleDarkMode"
                class="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white">
                <SunIcon v-if="isDarkMode" class="h-5 w-5 text-yellow-400" />
                <MoonIcon v-else class="h-5 w-5" />
              </button>

              <!-- 桌面端用户账号 -->
              <UserAccount :user="currentUser" @logout="handleLogout" class="hidden md:block" />
            </div>
          </header>

          <!-- 搜索结果 -->
          <SearchResults v-if="showSearchResults" :results="searchResults" />
          <transition name="fade">
            <div v-if="results.length > 0" class="mt-4">
              <h2 class="text-lg font-semibold mb-2">搜索结果：</h2>
              <ul>
                <li v-for="result in results" :key="result.id" class="border-b py-2 dark:border-gray-700">
                  {{ result.title }} - {{ result.content }}
                </li>
              </ul>
            </div>
          </transition>

          <!-- 路由视图 -->
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { SunIcon, MoonIcon, MenuIcon, XIcon, SearchIcon } from 'lucide-vue-next'
import NavigationMenu from './components/NavigationMenu.vue'
import WeatherWidget from './components/WeatherWidget.vue'
import UserAccount from './components/UserAccount.vue'
import SearchBar from './components/SearchBar.vue'
import SearchResults from './components/SearchResults.vue'

const router = useRouter()
const isDarkMode = ref(false)
const showMobileMenu = ref(false)
const showMobileSearch = ref(false)
const searchResults = ref([])
const showSearchResults = ref(false)
const currentUser = ref({
  name: 'plum',
  avatar: 'default-avatar.png',
})
defineProps({
  results: {
    type: Array,
    default: () => [],
  },
})
const navigationItems = ref([
  { id: 0, name: '首页', route: '/' },
  { id: 1, name: '我的日记', route: '/my-diary' },
  { id: 2, name: '日记统计', route: '/diary-stats' },
  { id: 3, name: '通讯录', route: '/contacts' },
  { id: 4, name: '好友圈', route: '/friend-circle' },
  { id: 5, name: '赞过的日记', route: '/liked-entries' },
  { id: 6, name: '收藏', route: '/favorites' },
  { id: 7, name: '浏览记录', route: '/browsing-history' },
])


const toggleDarkMode = () => {
  isDarkMode.value = !isDarkMode.value
  document.documentElement.classList.toggle('dark')
}

const toggleMobileMenu = () => {
  showMobileMenu.value = !showMobileMenu.value
  if (showMobileMenu.value) {
    showMobileSearch.value = false
  }
}

const toggleSearch = () => {
  showMobileSearch.value = !showMobileSearch.value
  if (showMobileSearch.value) {
    showMobileMenu.value = false
  }
}

const handleMobileMenuSelect = () => {
  showMobileMenu.value = false
}

const handleReorder = (newOrder) => {
  navigationItems.value = newOrder
}

const handleLogout = () => {
  // 实现登出逻辑
  showMobileMenu.value = false
}

const handleSearch = async (keyword) => {
  const results = await searchDiaries(keyword) // 调用搜索函数
  searchResults.value = results
  showSearchResults.value = true
}
const clearSearch = () => {
  searchResults.value = []
  showSearchResults.value = false
}
const handleMobileSearch = async (keyword) => {
  await handleSearch(keyword)
  showMobileSearch.value = false
}

const searchDiaries = async (keyword) => {
  // 模拟搜索API调用
  return [
    { id: 1, title: '我的日记1', content: '包含关键词的内容...', type: 'my' },
    { id: 2, title: '朋友的日记1', content: '包含关键词的内容...', type: 'friend' },
  ]
}

onMounted(() => {
  console.log('Current user:', currentUser.value)
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    isDarkMode.value = true
    document.documentElement.classList.add('dark')
  }
})

// 监听路由变化，关闭移动菜单
watch(() => router.currentRoute.value, () => {
  showMobileMenu.value = false
})
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.parallax {
  background-attachment: fixed;
}

.leaflet-container {
  z-index: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>