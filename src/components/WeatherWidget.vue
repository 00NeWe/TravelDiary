<template>
  <div class="relative" @click.stop>
    <div class="flex items-center space-x-4">
      <!-- 现在的天气 -->
      <div v-if="weather" class="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
        <CloudIcon v-if="weather.now.text?.includes('云')" class="h-5 w-5" />
        <SunIcon v-else-if="weather.now.text?.includes('晴')" class="h-5 w-5" />
        <CloudRainIcon v-else-if="weather.now.text?.includes('雨')" class="h-5 w-5" />
        <CloudFogIcon v-else class="h-5 w-5" />
        <span>{{ weather.location?.name }}</span>
        <span>{{ weather.now?.temp }}°C</span>
        <span>{{ weather.now?.text }}</span>
      </div>
      <div v-else class="text-sm text-gray-600 dark:text-gray-400">
        加载天气信息...
      </div>
      <!-- 下拉按钮 -->
      <button @click.stop="toggleForecast"
        class="inline-flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 focus:outline-none">
        <ChevronDownIcon v-if="!showForecast" class="h-5 w-5" />
        <ChevronUpIcon v-else class="h-5 w-5" />
      </button>
    </div>
    <!-- 下拉面板 -->
    <Transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 translate-y-1">
      <div v-if="showForecast && weather"
        class="absolute top-full right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 z-20">
        <div class="space-y-3">
          <div v-for="forecast in weather.forecasts" :key="forecast.date" class="flex items-center justify-between">
            <div class="flex items-center space-x-2">
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(forecast.date) }}</span>
              <span class="text-sm text-gray-600 dark:text-gray-400">{{ forecast.week }}</span>
            </div>
            <div class="flex items-center space-x-2">
              <CloudIcon v-if="forecast.text_day?.includes('云')" class="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <SunIcon v-else-if="forecast.text_day?.includes('晴')" class="h-4 w-4 text-yellow-400" />
              <CloudRainIcon v-else-if="forecast.text_day?.includes('雨')" class="h-4 w-4 text-blue-400" />
              <CloudFogIcon v-else class="h-4 w-4 text-gray-400" />
              <span class="text-sm font-medium text-gray-700 dark:text-gray-300">
                {{ forecast.low }}° ~ {{ forecast.high }}°
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  CloudIcon,
  SunIcon,
  CloudRainIcon,
  CloudFogIcon,
  ChevronDownIcon,
  ChevronUpIcon
} from 'lucide-vue-next'

const weather = ref(null)
const showForecast = ref(false)

const toggleForecast = () => {
  showForecast.value = !showForecast.value
}

const formatDate = (dateStr) => {
  const date = new Date(dateStr)
  return `${date.getMonth() + 1}/${date.getDate()}`
}

const fetchWeather = async () => {
  try {
    const response = await fetch(
      'https://cn.apihz.cn/api/tianqi/tqybbaiducn.php?id=10001181&key=1b9cbf43b123a131c0e8ed5068966274&sheng=广东&place=从化'
    )
    const data = await response.json()
    if (data.status === 0 && data.code === 200) {
      weather.value = data.result
    } else {
      console.error('获取天气信息失败:', data.message)
    }
  } catch (error) {
    console.error('获取天气信息失败:', error)
  }
}

const closeOnClickOutside = (event) => {
  //失焦关闭
  if (showForecast.value && !event.target.closest('.relative')) {
    showForecast.value = false
  }
}

onMounted(() => {
  fetchWeather()
  document.addEventListener('click', closeOnClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', closeOnClickOutside)
})
</script>