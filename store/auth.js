export const state = () => ({
    currentUserId: null,
    admin: false,
})

export const actions = {
    async nuxtServerInit ({ dispatch, commit }, { res }) {
        if (res && res.locals && res.locals.user) {
          const { allClaims: claims, idToken: token, ...authUser } = res.locals.user
      
          await dispatch('setUser', {
            authUser,
            claims,
            token
          })
        }
      },
    async googleLogin ({commit}){
        const provider = new this.$firebase.auth.GoogleAuthProvider()
        await this.$firebase.auth().signInWithPopup(provider)
    },
    async login ({ commit }, { email, password }) {
        await this.$firebase.auth().signInWithEmailAndPassword(email, password)
    },
    setUser ({ commit }){
        this.$firebase.auth().onAuthStateChanged((user) => {
            if (user){
                commit('setCurrentUserId', user)
            }
        })
    },
    async logOut ({commit}) {
        await this.$firebase.auth().signOut()
        commit('logOut')
    },
    async emailRegister ({ commit }, { email, password, name, avatar }) {
      const newUser = await this.$firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .catch(error => console.log(error.code))
      await this.$firebase.storage().ref(`users/${newUser.user.uid}`).put(avatar)
      const imgUrl = await this.$firebase.storage().ref(`users/${newUser.user.uid}`).getDownloadURL()
      const currentUser = this.$firebase.auth().currentUser
      currentUser.updateProfile({
        displayName: name,
        photoURL: imgUrl
      })
      commit('setCurrentUserId', newUser.user)
    }
}

export const mutations = {
    setCurrentUserId (state, user){
        state.currentUserId = user.uid
        if (user.uid === 'bbsB7AV7ACZCE9iX2pXrNAAtbW93'){
            state.admin = true
        }
    },
    logOut (state){
        state.currentUserId = null
        state.admin = false
    }
}

export const getters = {
    currentUserId (state){
        return state.currentUserId
    },
}
