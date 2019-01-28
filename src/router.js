import Vue from 'vue'
import Router from 'vue-router'

import store from './store'

import Home from './views/Home'
import Main from './views/Main'
import Boards from './views/Boards'
import Board from './views/Board'
import SignIn from './views/SignIn'
import SignUp from './views/SignUp'
import Profile from './views/Profile'
import Test from './views/__Test'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    // {
    //   path: '/',
    //   // name: 'home',
    //   component: Boards,
    // },
    // {
    //   path: '/user/:id/boards',
    //   name: 'boards',
    //   component: Boards,
    //   beforeEnter: AuthGuard
    // },
    {
      path: '/',
      // name: 'home',
      component: Home,
      children: [
        {
          path: '',
          name: 'main',
          component: Main,
        },
        {
          path: '/user/:id/boards',
          name: 'boards',
          component: Boards,
          beforeEnter: AuthGuard
        }
      ]
    },
    {
      path: '/login',
      name: 'signin',
      component: SignIn,
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp,
    },
    {
      path: '/b/:id/:name',
      name: 'board',
      component: Board,
      props: true,
      beforeEnter: AuthGuard,
      // beforeEnter: (to, from, next) => { AuthGuard(to, from, next); isBoardExist(to, from, next) }
},
    {
      path: '/user/:id',
      name: 'profile',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '/user/:id/account',
      name: 'settings',
      component: Profile,
      beforeEnter: AuthGuard
    },
    {
      path: '*',
      redirect: '/'
    },
    // {
    //   path: '/test',
    //   name: 'test',
    //   component: Test,
    // }
  ],
})

function AuthGuard (to, from, next) {
  if (store.getters.user) {
    next()
  } else {
    next('/login')
  }
}

// function isBoardExist (to, from, next) {
//   setTimeout(() => {
//     if (store.getters.boardById(to.params.id)) {
//       next()
//     } else {
//       next(`/user/${store.getters.user._id}/boards`)
//     }
//   }, 3000)
// }
