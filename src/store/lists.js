import firebase from 'firebase/app'
import {database} from '../firebase'
import {firebaseAction} from 'vuexfire'
import {compareOrder} from '../helper'

export default {
  state: {
    lists: [],
    listsLoaded: false,
    listsError: ''
  },

  getters: {
    lists(state) {
      return state.lists
    },

    listById(state) {
      return listId => {
        return state.lists.find(list => {
          return list._id === listId
        })
      }
    },

    listsSortedByOrder(state) {
      return state.lists.sort(compareOrder)
    },

    listsByBoardId(state) {
      return boardId => {
        return state.lists.filter(list => {
          return list.boardId === boardId
        })
      }
    },

    listsByBoardIdSortedByOrder(state) {
      return boardId => {
        return state.lists.filter(list => {
          return list.boardId === boardId
        }).sort(compareOrder)
      }
    },

    listsLoaded(state) {
      return state.listsLoaded
    },

    listsError(state) {
      return state.error
    }
  },

  mutations: {
    updateLoadListsStatus(state, payload) {
      state.listsLoaded = payload
    },

    setListsError(state, payload) {
      state.listsError = payload
    },
  },

  actions: {
    async addList({commit, getters}, {title, boardId}) {
      try {
        const lastAddedListRef = await database.ref().child('lists')
          .orderByChild('boardId')
          .equalTo(boardId)
          .limitToLast(1)
          .once('value')

        let lastOrderNumber = 0

        if (lastAddedListRef.val()) {
          const lastAddedList = lastAddedListRef.val()[Object.keys(lastAddedListRef.val())]
          lastOrderNumber = lastAddedList.order
        }

        const newListKey = await database.ref().child('lists').push().key
        const listData = {
          title,
          order: lastOrderNumber + 1,
          boardId,
          userId: getters.user._id,
          _id: newListKey
        }
        const updates = {}

        updates['/lists/' + newListKey] = listData
        await database.ref().update(updates)

        const board = getters.boardById(boardId)

        await database.ref('activities').push({
          action: 'added',
          type: 'list',
          listTitle: title,
          boardId: board['.key'],
          boardTitle: board['title'],
          userId: getters.user._id,
          created_at: firebase.database.ServerValue.TIMESTAMP
        })
      } catch (error) {
        commit('setListError', error.message)
      }
    },

    async changeListOrder({commit, getters}, {from, to}) {
      try {
        for (let list of getters.listsByBoardId(from.boardId)) {
          if (to.order < from.order) {
            if (list.order >= to.order && list.order < from.order) {
              await database.ref('lists').child(list['.key']).update({order: list.order + 1})
            }
          } else {
            if (list.order > from.order && list.order <= to.order) {
              await database.ref('lists').child(list['.key']).update({order: list.order - 1})
            }
          }
        }
        await database.ref('lists').child(from.id).update({order: to.order})
      } catch (error) {
        commit('setListsError', error.message)
      }
    },

    async updateListTitle({commit}, {id, newListTitle}) {
      try {
        await database.ref().child(`lists/${id}`).update({title: newListTitle})
      } catch (error) {
        commit('setListsError', error.message)
      }
    },

    async deleteList({commit, getters}, id) {
      try {
        const list = getters.listById(id)
        const board = getters.boardById(list.boardId)

        await database.ref('lists').child(id).remove()

        await database.ref('activities').push({
          action: 'deleted',
          type: 'list',
          listTitle: list.title,
          boardId: list.boardId,
          boardTitle: board.title,
          userId: getters.user._id,
          created_at: firebase.database.ServerValue.TIMESTAMP
        })
      } catch (error) {
        commit('setListsError', error.message)
      }
    },

    initLists: firebaseAction(({commit, getters, bindFirebaseRef}, boardId) => {
      // const listsRef = database.ref('lists').orderByChild('boardId').equalTo(boardId)
      const listsRef = database.ref('lists').orderByChild('userId').equalTo(getters.user._id)

      bindFirebaseRef('lists', listsRef, {
        readyCallback: () => {
          commit('updateLoadListsStatus', true)
        }
      })

      // bindFirebaseRef('lists', listsRef)

    })
  }
}