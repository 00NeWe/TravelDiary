<template>
  <nav>
    <draggable v-model="localItems" item-key="id" @end="onDragEnd" :animation="200" ghost-class="ghost-item">
      <template #item="{ element }">
        <router-link :to="element.route"
          class="flex items-center px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors duration-200"
          :class="{ 'active-item': isActive(element.route) }">
          {{ element.name }}
        </router-link>
      </template>
    </draggable>
  </nav>
</template>


<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import draggable from 'vuedraggable'

const route = useRoute()
const props = defineProps({
  items: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['reorder', 'select'])

const localItems = ref([...props.items])

watch(() => props.items, (newItems) => {
  localItems.value = [...newItems]
})

const isActive = (path) => {
  return route.path === path
}

const onDragEnd = () => {
  emit('reorder', localItems.value)
}
</script>

<style scoped>
/* 拖动时的样式 */
.ghost-item {
  opacity: 0.5;
  background: #c8ebfb;
}

/* 选中项的样式 */
.active-item {
  background-color: #bde9fd;
  /* 白天模式选中背景 */
  color: #004c6d;
  /* 白天模式选中文本颜色 */
}

.dark .active-item {
  background-color: #2a5363;
  /* 夜间模式选中背景 */
  color: #a7d8f0;
  /* 夜间模式选中文本颜色 */
}

/* 悬停效果（未选中项） */
.router-link:hover {
  background-color: #d0efff;
  /* 白天模式悬停 */
}

.dark .router-link:hover {
  background-color: #334e5b;
  /* 夜间模式悬停 */
}
</style>
