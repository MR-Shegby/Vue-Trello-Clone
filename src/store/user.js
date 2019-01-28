import firebase from 'firebase/app'

export default  {
  state: {
    user: null,
    userUpdating: false,
    userLoading: false
  },

  getters: {
    user (state) {
      return state.user
    },

    isUserSignedIn (state) {
      return state.user !== null
    },

    userLoading (state) {
      return state.userLoading
    },

    userUpdating (state) {
      return state.userUpdating
    },
  },

  mutations: {
    setUser (state, payload) {
      state.user = payload
    },

    updateUserData(state, {name}) {
      state.user.name = name
    },

    userLoading(state, payload) {
      state.userLoading = payload
    },

    userUpdating(state, payload) {
      state.userUpdating = payload
    },

  },

  actions: {
    async signUpUser({commit}, {email, password}) {
      await firebase.auth().createUserWithEmailAndPassword(email, password)
      const currentUser = await firebase.auth().currentUser

      return await currentUser.updateProfile({
        displayName: currentUser.email.split('@')[0] + '@'
      })
        .then(() => {
          const user = {
            name: currentUser.displayName,
            email: currentUser.email,
            _id: currentUser.uid
          }
          commit('setUser', user)
          return user
        })
        .catch((error) => {
          console.log(error)
        })

      // console.log(currentUser)
      //
      // const user = {
      //   name: currentUser.displayName
      //   email: currentUser.email,
      //   _id: currentUser.uid
      // }
      // commit('setUser', user)

      // console.log(user)
      //
      // return user

    },

    async logInUser({commit}, {email, password}) {
      commit('userLoading', true)

      await firebase.auth().signInWithEmailAndPassword(email, password)
      const currentUser = await firebase.auth().currentUser
      const user = {
        name: currentUser.displayName,
        email: currentUser.email,
        _id: currentUser.uid
      }
      commit('setUser', user)
      commit('userLoading', false)
      return user
    },

    async logOutUser ({commit}) {
      await firebase.auth().signOut()
      commit('setUser', null)
    },

    async updateUserData ({commit}, name) {
      commit('userUpdating', true)

      try {
        const currentUser = await firebase.auth().currentUser
        await currentUser.updateProfile({
          displayName: name
        })

        commit('updateUserData', {
          name: name
        })
        commit('userUpdating', false)
      }
      catch (e) {
        console.log(e)
      }
    },

    updateUserState ({commit}, user) {
      commit('setUser', {
        _id: user.uid,
        email: user.email,
        name: user.displayName
      })
    },
  }
}


