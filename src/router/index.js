import { createRouter, createWebHistory } from 'vue-router'

// 组件导入
import Home from '../components/Home.vue'
import MyDiary from '../components/MyDiary.vue'
import DiaryStats from '../components/DiaryStats.vue'
import Contacts from '../components/Contacts.vue'
import FriendCircle from '../components/FriendCircle.vue'
import LikedEntries from '../components/LikedEntries.vue'
import Favorites from '../components/FavoritedEntries.vue'
import BrowsingHistory from '../components/BrowsingHistory.vue'




// 路由配置
const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { title: '首页' }
  },
  {
    path: '/my-diary',
    name: 'my-diary',
    component: MyDiary,
    meta: { title: '我的日记' }
  },
  {
    path: '/diary-stats',
    name: 'diary-stats',
    component: DiaryStats,
    meta: { title: '日记统计' }
  },
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts,
    meta: { title: '联系人' }
  },
  {
    path: '/friend-circle',
    name: 'friend-circle',
    component: FriendCircle,
    meta: { title: '朋友圈' }
  },
  {
    path: '/liked-entries',
    name: 'liked-entries',
    component: LikedEntries,
    meta: { title: '点赞记录' }
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: Favorites,
    meta: { title: '收藏夹' }
  },
  {
    path: '/browsing-history',
    name: 'browsing-history',
    component: BrowsingHistory,
    meta: { title: '浏览历史' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('../components/NotFound.vue'),
    meta: { title: '页面未找到' }
  }
]

// 创建路由实例
const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || '日记应用'
  console.log(`路由切换: 从 ${from.path} 到 ${to.path}`)
  next()
})

// 路由错误处理
router.onError((error) => {
  console.error('路由错误:', error)
})

export default router