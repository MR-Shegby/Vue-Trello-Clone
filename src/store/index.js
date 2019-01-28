import Vue from 'vue'
import Vuex from 'vuex'
import { firebaseMutations } from 'vuexfire'

import user from './user'
import boards from './boards'
import lists from './lists'
import cards from './cards'
import activities from './activities'
import backgrouds from './backgrouds'
import cardDraggable from './card-draggable'

Vue.use(Vuex)

export default new Vuex.Store({
  mutations: {
    ...firebaseMutations
  },

  modules: {
    user,
    boards,
    lists,
    cards,
    activities,
    backgrouds,
    cardDraggable
  }
})