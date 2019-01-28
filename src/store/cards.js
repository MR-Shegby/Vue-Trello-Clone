import firebase from 'firebase/app'
import {database} from '../firebase'
import {firebaseAction} from 'vuexfire'
import {comparebyProperty} from '../helper'

export default {
  state: {
    cards: [],
    cardsLoaded: false,
    cardsError: '',
  },

  getters: {
    cards(state) {
      return state.cards
    },

    cardById(state) {
      return cardId => {
        return state.cards.find(card => {
          return card['.key'] === cardId
        })
      }
    },

    cardsByListId(state) {
      return listId => {
        return state.cards.filter(card => {
          return card.listId === listId
        })
      }
    },

    cardsByListIdSortedByOrder(state) {
      return listId => {
        return state.cards.filter(card => {
          return card.listId === listId
        }).sort(comparebyProperty('order'))
      }
    },

    cardsLoaded(state) {
      return state.cardsLoaded
    },

    cardsError(state) {
      return state.cardsError
    }
  },

  mutations: {
    updateLoadCardsStatus(state, payload) {
      state.cardsLoaded = payload
    },

    setCardsError(state, payload) {
      state.cardsError = payload
    },
  },

  actions: {
    async addCard({commit, getters}, {title, listId, listTitle, boardId}) {
      try {
        const lastAddedCardRef = await database.ref().child('cards')
          .orderByChild('listId')
          .equalTo(listId)
          .limitToLast(1)
          .once('value')

        let lastOrderNumber = 0

        if (lastAddedCardRef.val()) {
          const lastAddedCard = lastAddedCardRef.val()[Object.keys(lastAddedCardRef.val())]
          lastOrderNumber = lastAddedCard.order
        }

        // const newCardKey = await database.ref().child('cards').push().key

        const cardData = {
          title,
          order: lastOrderNumber + 1,
          listId,
          boardId,
          userId: getters.user._id
          // _id: newCardKey,
        }

        // const updates = {}
        //
        // updates['/cards/' + newCardKey] = cardData
        // await database.ref().update(updates)

        await database.ref('cards').push(cardData)

        const board = getters.boardById(boardId)

        await database.ref('activities').push({
          action: 'added',
          type: 'card',
          cardTitle: title,
          listTitle,
          boardId: boardId,
          boardTitle: board.title,
          userId: getters.user._id,
          created_at: firebase.database.ServerValue.TIMESTAMP
        })
      } catch (error) {
        commit('setCardsError', error.message)
      }
    },

    async changeCardOrder({state, getters}, {from, to}) {
      try {
        if (getters.overListId) {
          to.listId = getters.overListId
        }

        if (to.listId === from.listId) {
          for (let card of getters.cardsByListId(from.listId)) {
            if (to.order < from.order) {
              if (card.order >= to.order && card.order < from.order) {
                await database.ref('cards').child(card['.key']).update({order: card.order + 1})
              }
            } else {
              if (card.order > from.order && card.order <= to.order) {
                await database.ref('cards').child(card['.key']).update({order: card.order - 1})
              }
            }
          }
          await database.ref('cards').child(from.id).update({order: to.order})
        } else {
          if (!getters.overListId) {
            if (getters.nodePlacement === 'after') {
              for (let card of getters.cardsByListId(to.listId)) {
                if (card.order > to.order) {
                  await database.ref('cards').child(card['.key']).update({order: card.order + 1})
                }
              }

              await database.ref('cards').child(from.id).update({listId: to.listId, order: to.order + 1})

            } else {
              for (let card of getters.cardsByListId(to.listId)) {
                if (card.order >= to.order) {
                  await database.ref('cards').child(card['.key']).update({order: card.order + 1})
                }
              }

              await database.ref('cards').child(from.id).update({listId: to.listId, order: to.order})
            }

          } else await database.ref('cards').child(from.id).update({listId: to.listId, order: 1})

          for (let card of getters.cardsByListId(from.listId)) {
            if (card.order > from.order) {
              await database.ref('cards').child(card['.key']).update({order: card.order - 1})
            }
          }
        }
      } catch (error) {
        commit('setCardsError', error.message)
      }
    },

    async updateCard({}, {title, id}) {
      try {
        await database.ref().child(`cards/${id}`).update({title: title})
      } catch (error) {
        commit('setCardsError', error.message)
      }
    },

    async deleteCard({getters}, id) {
      try {
        const card = getters.cardById(id)
        const list = getters.listById(card.listId)
        const board = getters.boardById(list.boardId)

        await database.ref('cards').child(id).remove()

        await database.ref('activities').push({
          action: 'deleted',
          type: 'card',
          cardTitle: card.title,
          listTitle: list.title,
          boardId: list.boardId,
          boardTitle: board.title,
          userId: getters.user._id,
          created_at: firebase.database.ServerValue.TIMESTAMP
        })
      } catch (error) {
        commit('setCardsError', error.message)
      }
    },

    initCards: firebaseAction(({commit, getters, bindFirebaseRef}, boardId) => {
      const cardsRef = database.ref('cards').orderByChild('userId').equalTo(getters.user._id)
      // const cardsRef = database.ref('cards').orderByChild('boardId').equalTo(boardId)

      bindFirebaseRef('cards', cardsRef, {
        readyCallback: () => {
          commit('updateLoadCardsStatus', true)
        }
      })

    })
  }
}