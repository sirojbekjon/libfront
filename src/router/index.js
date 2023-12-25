import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home";


Vue.use(VueRouter)

const routes = [
     {
    path: '/',
    name: 'home',
    component: Home
  },
    {
    path: '/login',
    name: 'MyLogin',
    component: () => import(/* webpackChunkName: "about" */ '../views/MyLogin.vue')
  },
    {
    path: '/statistic',
    name: 'Statistic',
    component: () => import(/* webpackChunkName: "about" */ '../views/Statistic.vue')
  },
  {
    path: '/library',
    name: 'Library',
    component: () => import(/* webpackChunkName: "about" */ '../views/Library.vue')
  },
  {
    path: '/type',
    name: 'Type',
    component: () => import(/* webpackChunkName: "about" */ '../views/BooksType.vue')
  },
  {
    path: '/books',
    name: 'book',
    component: () => import(/* webpackChunkName: "about" */ '../views/Books.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
