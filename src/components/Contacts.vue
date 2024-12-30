<template>
  <div class="container mx-auto px-4 py-8">
    <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">通讯录</h2>
    <div class="mb-4">
      <input v-model="searchQuery" type="text" placeholder="搜索联系人..."
        class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white" />
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="contact in filteredContacts" :key="contact.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
        <div class="flex items-center space-x-4">
          <img :src="getAvatarUrl(contact.id)" :alt="contact.name" class="w-12 h-12 rounded-full" />
          <div>
            <h3 class="text-lg font-semibold text-gray-800 dark:text-white">{{ contact.name }}</h3>
            <p class="text-sm text-gray-600 dark:text-gray-400">{{ contact.email }}</p>
          </div>
        </div>
        <div class="mt-4 flex justify-between">
          <button @click="sendMessage(contact)" class="text-blue-500 hover:text-blue-700">
            <MessageCircleIcon class="h-5 w-5" />
          </button>
          <button @click="toggleFavorite(contact)" :class="contact.isFavorite ? 'text-yellow-500' : 'text-gray-400'">
            <StarIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { MessageCircleIcon, StarIcon } from 'lucide-vue-next'

const contacts = ref([
  { id: 1, name: "米乐", email: "Eimile@example.com", isFavorite: true },
  { id: 2, name: "芽芽", email: "yaya@example.com", isFavorite: false },
  { id: 3, name: "泡芙", email: "Puff@example.com", isFavorite: false },
])

const getAvatarUrl = (id) => {
  return new URL(`../assets/avatar${id}.jpg`, import.meta.url).href;
};
const searchQuery = ref('')

const filteredContacts = computed(() => {
  return contacts.value.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    contact.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const sendMessage = (contact) => {
  alert(`发送消息给 ${contact.name}`)
}

const toggleFavorite = (contact) => {
  contact.isFavorite = !contact.isFavorite
}
</script>