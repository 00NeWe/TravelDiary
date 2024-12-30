<template>
  <div class="relative" @click.stop>
    <button @click="toggleMenu" class="flex items-center space-x-2">
      <img :src="avatarSrc" alt="用户头像" class="w-8 h-8 rounded-full object-cover" />
      <span class="text-gray-800 dark:text-white">{{ user.name }}</span>
    </button>
    <Transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <div v-if="showMenu"
        class="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
        <a href="#"
          class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          个人资料
        </a>
        <a href="#"
          class="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          设置
        </a>
        <button @click="logout"
          class="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          退出登录
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
// 导入默认头像
import defaultAvatar from '@/assets/default-avatar.png'

const props = defineProps({
  user: {
    type: Object,
    required: true,
    default: () => ({
      name: 'plum',
      avatar: 'default-avatar.png'
    })
  }
})

const emit = defineEmits(['logout'])
const showMenu = ref(false)

// 计算属性处理头像路径
const avatarSrc = computed(() => {
  try {
    // 如果是完整的URL
    if (props.user.avatar?.startsWith('http')) {
      return props.user.avatar
    }
    // 如果是相对路径，尝试动态导入
    return new URL(`../assets/${props.user.avatar}`, import.meta.url).href
  } catch (error) {
    console.warn('Avatar loading failed:', error)
    return defaultAvatar // 使用默认头像
  }
})

const toggleMenu = () => {
  showMenu.value = !showMenu.value
}

const logout = () => {
  showMenu.value = false
  emit('logout')
}

const closeMenuOnClickOutside = (event) => {
  if (showMenu.value && !event.target.closest('.relative')) {
    showMenu.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', closeMenuOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeMenuOnClickOutside)
})
</script>