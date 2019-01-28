import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase/app'

import actionButton from './components/global/ActionButton'
import closeButton from './components/global/CloseButton'
import userIcon from './components/global/UserIcon'
import actionForm from './components/global/ActionForm'
import pulseSpinner from './components/global/PulseLoaderSpinner'
import backgroundThumbnail from './components/global/BackgroundThumbnail'
import popupMenu from './components/global/PopUpMenu'
import activityItem from './components/global/ActivityItem'
Vue.component('AppActionButton', actionButton)
Vue.component('AppCloseButton', closeButton)
Vue.component('AppUserIcon', userIcon)
Vue.component('AppActionForm', actionForm)
Vue.component('AppLoaderSpinner', pulseSpinner)
Vue.component('AppBackgroundThumbnail', backgroundThumbnail)
Vue.component('AppPopUpMenu', popupMenu)
Vue.component('AppActivityItem', activityItem)

import './directives/ClickOutside'

Vue.use(require('vue-moment'))

Vue.config.productionTip = false

firebase.auth().onAuthStateChanged((user) => {
  if (user) store.dispatch('updateUserState', user)
    else store.dispatch('logOutUser')

  new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App),
    created() {
      if (user) {
        store.dispatch('initBoards')
        store.dispatch('initLists')
        store.dispatch('initCards')
        store.dispatch('initActivities')
      }
    }
  })

})


