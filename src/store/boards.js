import firebase from 'firebase/app'
import { database } from '../firebase'
import { firebaseAction } from 'vuexfire'

export default {
  state: {
    boards: [],
    boardsLoaded: false,
    boardsError: ''
  },

  getters: {
    boards(state) {
      return state.boards
    },

    boardById(state) {
      return id => {
        return state.boards.find(board => {
          return board._id === id
        })
      }
    },

    boardsLoaded(state) {
      return state.boardsLoaded
    },

    boardsError(state) {
      return state.boardsError
    }
  },

  mutations: {
    updateLoadBoardsStatus(state, payload) {
      state.boardsLoaded = payload
    },

    setBoardsError(state, payload) {
      state.boardsError = payload
    },
  },

  actions: {
    async createBoard({commit, getters}, {title, background}) {
      try {
        const newBoardKey = await database.ref().child('boards').push().key
        const boardData = {
          _id: newBoardKey,
          title,
          background,
          userId: getters.user._id
        }
        const updates = {}

        updates['/boards/' + newBoardKey] = boardData
        await database.ref().update(updates)

        await database.ref('activities').push({
          action: 'created',
          type: 'board',
          boardId: newBoardKey,
          boardTitle: title,
          userId: getters.user._id,
          created_at: firebase.database.ServerValue.TIMESTAMP
        })
      } catch (error) {
        commit('setBoardsError', error.message)
      }
    },

    async changeBoardBackground({commit, getters}, {boardId, boardTitle, background}) {
      try {
        await database.ref('boards').child(boardId).update({background})

        await database.ref('activities').push({
          action: 'changed',
          type: 'the background',
          boardId,
          boardTitle,
          userId: getters.user._id,
          created_at: firebase.database.ServerValue.TIMESTAMP
        })
      } catch (error) {
        commit('setBoardsError', error.message)
      }
    },

    async updateBoardTitle({commit, getters}, {board, boardNewTitle}) {
      try {
        await database.ref('boards').child(board['.key']).update({title: boardNewTitle})

        await database.ref('activities').push({
          action: 'renamed',
          type: 'board',
          boardId: board['.key'],
          boardOldTitle: board.title,
          boardNewTitle,
          boardTitle: boardNewTitle,
          userId: getters.user._id,
          created_at: firebase.database.ServerValue.TIMESTAMP
        })
      } catch (error) {
        commit('setBoardsError', error.message)
      }
    },

    async deleteBoard({commit, getters}, board) {
      try {
        await database.ref('boards').child(board['.key']).remove()

        await database.ref('activities').push({
          action: 'deleted',
          type: 'board',
          boardId: board['.key'],
          boardTitle: board.title,
          userId: getters.user._id,
          created_at: firebase.database.ServerValue.TIMESTAMP
        })
      } catch (error) {
        commit('setBoardsError', error.message)
      }
    },

    initBoards: firebaseAction(async ({commit, getters, bindFirebaseRef}) => {
      const boardsRef = await database.ref('boards').orderByChild('userId').equalTo(getters.user._id)

      bindFirebaseRef('boards', boardsRef, {
        readyCallback: () => {
          commit('updateLoadBoardsStatus', true)
        }
      })
    }),
  }
}