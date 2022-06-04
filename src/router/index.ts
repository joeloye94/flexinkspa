import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path:'/bbs/list',
    name:'bbsList',
    component:() => import(/* webpackChunkName: "about" */ '../views/BBSListView.vue')
  },
  {
    path:'/bbs/list/view/:id',
    name:'bbsListItemView',
    component:() => import(/* webpackChunkName: "about" */ '../views/BBSListItemView.vue')
  },
  {
    path:'/bbs/list/view/modify/:id',
    name:'bbsListModify',
    component:() => import(/* webpackChunkName: "about" */ '../views/BBSListItemEditView.vue')
  },
  {
    path:'/bbs/register',
    name:'bbsListAdd',
    component:() => import(/* webpackChunkName: "about" */ '../views/BBSListItemEditView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
