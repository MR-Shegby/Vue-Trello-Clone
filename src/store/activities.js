import { database } from '../firebase'
import { firebaseAction } from 'vuexfire'
import {comparebyProperty} from '../helper'

export default {
  state: {
    activities: [],
    activitiesLoaded: false
  },

  getters: {
    activities(state) {
      return state.activities
    },

    activitiesSortedByDate(state) {
      return state.activities.sort(comparebyProperty('created_at'))
    },

    activitiesByBoardId(state) {
      return boardId => {
        return state.activities.filter(activity => {
          return activity.boardId === boardId
        })
      }
    },

    activitiesLoaded(state) {
      return state.activitiesLoaded
    }
  },

  mutations: {
    updateLoadActivitiesStatus(state, payload) {
      state.activitiesLoaded = payload
    }
  },

  actions: {
    initActivities: firebaseAction(async ({commit, getters, bindFirebaseRef }) => {
      const activitiesRef = await database.ref('activities').orderByChild('userId').equalTo(getters.user._id)

      bindFirebaseRef('activities', activitiesRef, {readyCallback: () => {
          commit('updateLoadActivitiesStatus', true)
        }})
    })
  }
}