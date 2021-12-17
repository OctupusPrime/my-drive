import Vue from 'vue'
import VueRouter from 'vue-router'

import Drive from '../views/Drive.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Drive,
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
