import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/drive',
    component: () => import('../views/Drive.vue'),
    children: [
      {
        path: '/',
        name: 'Drive',
        component: () => import('../views/DriveRoot.vue')
      },
      {
        path: 'folder/:id',
        name: 'Folder',
        component: () => import('../views/DriveFolder.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
