<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-semibold text-gray-800 dark:text-white">我的日记</h2>
      <button @click="showNewEntryForm = true"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2">
        <PlusIcon class="h-5 w-5" />
        新建日记
      </button>
    </div>

    <!-- 筛选选项 -->
    <div class="mb-6 flex flex-wrap gap-4">
      <div class="flex-1">
        <label for="dateFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">按日期筛选</label>
        <input type="date" id="dateFilter" v-model="dateFilter"
          class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          @change="applyFilters">
      </div>
      <div class="flex-1">
        <label for="regionFilter" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">按区域筛选</label>
        <select id="regionFilter" v-model="regionFilter"
          class="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          @change="applyFilters">
          <option value="">全部区域</option>
          <option v-for="region in regions" :key="region" :value="region">{{ region }}</option>
        </select>
      </div>
    </div>

    <!-- 日记列表 -->
    <div class="space-y-6" v-if="!showNewEntryForm">
      <div v-for="entry in filteredEntries" :key="entry.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 transition-all hover:shadow-lg">
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ entry.title }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ formatDate(entry.date) }}</p>
          </div>
          <div class="flex space-x-2">
            <button @click="editEntry(entry)" class="text-blue-500 hover:text-blue-700">
              <EditIcon class="h-5 w-5" />
            </button>
            <button @click="deleteEntry(entry.id)" class="text-red-500 hover:text-red-700">
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
        <p class="mt-4 text-gray-700 dark:text-gray-300">{{ entry.content }}</p>
        <div v-if="entry.image" class="mt-4 max-w-md mx-auto">
          <img :src="entry.image" :alt="entry.title"
            class="w-full h-auto object-cover rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition-shadow duration-300" />
        </div>
        <div class="mt-4 flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
          <p v-if="entry.location" class="flex items-center">
            <MapPinIcon class="h-4 w-4 mr-1" />
            {{ entry.location.name }}
          </p>
          <p class="flex items-center">
            <LockIcon class="h-4 w-4 mr-1" />
            {{ getVisibilityText(entry.visibility) }}
          </p>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="filteredEntries.length === 0" class="text-center py-12">
        <BookOpenIcon class="h-16 w-16 mx-auto text-gray-400" />
        <p class="mt-4 text-xl font-medium text-gray-600 dark:text-gray-400">还没有日记</p>
        <p class="mt-2 text-gray-500">点击"新建日记"开始记录你的旅行故事吧！</p>
      </div>
    </div>

    <!-- 新建日记表单 -->
    <div v-if="showNewEntryForm" class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-6">
        <h3 class="text-xl font-semibold text-gray-800 dark:text-white">新建日记</h3>
        <button @click="closeNewEntryForm"
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300">
          <XIcon class="h-5 w-5" />
        </button>
      </div>

      <form @submit.prevent="addNewEntry" class="space-y-6">
        <div>
          <label for="title" class="block text-sm font-medium text-gray-700 dark:text-gray-300">标题</label>
          <input v-model="newEntry.title" type="text" id="title" required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
        </div>

        <div>
          <label for="content" class="block text-sm font-medium text-gray-700 dark:text-gray-300">内容</label>
          <textarea v-model="newEntry.content" id="content" rows="4" required
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"></textarea>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300">上传图片</label>
          <div class="mt-1 flex items-center space-x-4">
            <input type="file" @change="handleImageUpload" accept="image/*"
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100 dark:file:bg-gray-600 dark:file:text-gray-200" />
            <div v-if="newEntry.imagePreview" class="w-24 h-24 overflow-hidden rounded-lg flex-shrink-0">
              <img :src="newEntry.imagePreview" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">选择位置</label>
          <div ref="mapContainer" class="h-64 rounded-lg border border-gray-300 dark:border-gray-600 mb-2"></div>
          <input v-model="locationSearch" @input="searchLocation" type="text" placeholder="搜索位置..."
            class="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
          <p v-if="selectedLocation" class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            已选位置: {{ selectedLocation }}
          </p>
        </div>

        <div>
          <label for="visibility" class="block text-sm font-medium text-gray-700 dark:text-gray-300">访问权限</label>
          <select v-model="newEntry.visibility" id="visibility"
            class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <option value="public">公开</option>
            <option value="friends">仅好友可见</option>
            <option value="private">仅自己可见</option>
          </select>
        </div>

        <div class="flex justify-end space-x-3">
          <button type="button" @click="closeNewEntryForm"
            class="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">
            取消
          </button>
          <button type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
            保存
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick, watch } from 'vue'
import {
  EditIcon,
  TrashIcon,
  PlusIcon,
  XIcon,
  MapPinIcon,
  LockIcon,
  BookOpenIcon
} from 'lucide-vue-next'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const showNewEntryForm = ref(false)
const newEntry = ref({
  title: '',
  content: '',
  image: null,
  imagePreview: null,
  location: null,
  visibility: 'public'
})

const diaryEntries = ref([
  {
    id: 1,
    title: "巴黎博物馆之旅",
    date: new Date('2023-06-01'),
    content: "今天参观了卢浮宫，令人惊叹的艺术作品让人流连忘返...",
    image: new URL('../assets/louvre.png', import.meta.url).href,
    location: { name: "巴黎" },
    visibility: 'public'
  },
  {
    id: 2,
    title: "东京美食探索",
    date: new Date('2023-06-02'),
    content: "在筑地市场品尝了最新鲜的寿司，随后去了秋叶原...",
    image: new URL('../assets/sushi.png', import.meta.url).href,
    location: { name: "东京" },
    visibility: 'friends'
  },
  {
    id: 3,
    title: "巴厘岛度假",
    date: new Date('2023-06-03'),
    content: "在金巴兰海滩度过了完美的一天，晚霞太美了...",
    image: new URL('../assets/Bali.jpg', import.meta.url).href,

    location: { name: "巴厘岛" },
    visibility: 'private'
  },
])

const locationSearch = ref('')
const selectedLocation = ref(null)
const mapContainer = ref(null)
let map = null
let marker = null

const dateFilter = ref('')
const regionFilter = ref('')

const regions = computed(() => {
  return [...new Set(diaryEntries.value.map(entry => entry.location?.name).filter(Boolean))]
})

const filteredEntries = computed(() => {
  return diaryEntries.value.filter(entry => {
    const dateMatch = !dateFilter.value ||
      new Date(entry.date).toDateString() === new Date(dateFilter.value).toDateString()
    const regionMatch = !regionFilter.value || entry.location?.name === regionFilter.value
    return dateMatch && regionMatch
  })
})

const formatDate = (date) => {
  return new Intl.DateTimeFormat('zh-CN', { dateStyle: 'full' }).format(date)
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      newEntry.value.image = e.target.result
      newEntry.value.imagePreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const initMap = () => {
  if (mapContainer.value && !map) {
    map = L.map(mapContainer.value).setView([0, 0], 2)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map)

    map.on('click', (e) => {
      if (marker) {
        marker.setLatLng(e.latlng)
      } else {
        marker = L.marker(e.latlng).addTo(map)
      }
      updateSelectedLocation(e.latlng)
    })
  }
}

const searchLocation = async () => {
  if (locationSearch.value.length < 2) return

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationSearch.value)}`
    )
    const data = await response.json()

    if (data.length > 0) {
      const { lat, lon, display_name } = data[0]
      map.setView([lat, lon], 13)
      if (marker) {
        marker.setLatLng([lat, lon])
      } else {
        marker = L.marker([lat, lon]).addTo(map)
      }
      updateSelectedLocation({ lat, lng: lon }, display_name)
    }
  } catch (error) {
    console.error('Error searching location:', error)
  }
}

const updateSelectedLocation = (latlng, displayName = null) => {
  if (!displayName) {
    fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng.lat}&lon=${latlng.lng}`)
      .then(response => response.json())
      .then(data => {
        selectedLocation.value = data.display_name
        newEntry.value.location = {
          lat: latlng.lat,
          lng: latlng.lng,
          name: data.display_name
        }
      })
  } else {
    selectedLocation.value = displayName
    newEntry.value.location = {
      lat: latlng.lat,
      lng: latlng.lng,
      name: displayName
    }
  }
}

const addNewEntry = () => {
  const newEntryData = {
    id: Date.now(),
    title: newEntry.value.title,
    content: newEntry.value.content,
    date: new Date(),
    image: newEntry.value.image,
    location: newEntry.value.location,
    visibility: newEntry.value.visibility
  }
  diaryEntries.value.unshift(newEntryData)
  closeNewEntryForm()
}

const editEntry = (entry) => {
  alert(`编辑日记: ${entry.title}`)
}

const deleteEntry = (id) => {
  if (confirm('确定要删除这篇日记吗？')) {
    diaryEntries.value = diaryEntries.value.filter(entry => entry.id !== id)
  }
}

const closeNewEntryForm = () => {
  newEntry.value = {
    title: '',
    content: '',
    image: null,
    imagePreview: null,
    location: null,
    visibility: 'public'
  }
  selectedLocation.value = null
  showNewEntryForm.value = false
  if (marker) {
    marker.remove()
    marker = null
  }
  if (map) {
    map.setView([0, 0], 2)
  }
}

const getVisibilityText = (visibility) => {
  switch (visibility) {
    case 'public': return '公开'
    case 'friends': return '仅好友可见'
    case 'private': return '仅自己可见'
    default: return '未知'
  }
}

const applyFilters = () => {

}

onMounted(() => {
  nextTick(() => {
    if (showNewEntryForm.value) {
      initMap()
    }
  })
})

watch(showNewEntryForm, (newValue) => {
  if (newValue) {
    nextTick(() => {
      initMap()
    })
  }
})
</script>

<style scoped>
.leaflet-container {
  z-index: 0;
}

.diary-image {
  max-height: 300px;
  width: 100%;
  object-fit: cover;
}

@media (max-width: 640px) {
  .diary-image {
    max-height: 200px;
  }
}
</style>