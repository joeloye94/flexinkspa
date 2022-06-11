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
    component:() => import('../views/BBSListView.vue')
  },
  {
    path:'/bbs/list/view/:id',
    name:'bbsListItemView',
    component:() => import('../views/BBSListItemView.vue'),
    //props:true
    props: route => ({ queryID: route.params.id })
  },
  {
    path:'/bbs/list/view/modify/:id',
    name:'bbsListModify',
    component:() => import('../views/BBSListItemEditView.vue'),
    props: route => ({ routeParams: route.params })
    //enable props for edit view
    
  },
  {
    path:'/bbs/register',
    name:'bbsListAdd',
    component:() => import('../views/BBSListItemAddView.vue'),
    //differentiate if adding or editing list item
    props: route => ({ route: route.params })
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
