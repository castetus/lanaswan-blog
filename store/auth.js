export const state = () => ({
    currentUser: null,
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
        const provider = new this.$fireAuthObj.GoogleAuthProvider()
        await this.$fireAuth.signInWithPopup(provider)
    },
    async login ({ commit }, { email, password }) {
        await this.$fireAuth.signInWithEmailAndPassword(email, password)
    },
    setUser ({ commit }){
        this.$fireAuth.onAuthStateChanged((user) => {
            if (user){
                commit('setCurrentUser', user)
            }
        })
    },
    async logOut ({commit}) {
        await this.$fireAuth.signOut()
        commit('logOut')
    }
}

export const mutations = {
    setCurrentUser (state, user){
        console.log(user)
        state.currentUser = user.uid
        if (user.uid === 'bbsB7AV7ACZCE9iX2pXrNAAtbW93'){
            state.admin = true
        }
    },
    logOut (state){
        state.currentUser = null
        state.admin = false
    }
}

export const getters = {
    isAuth (state){
        return state.currentUser
    }
}
