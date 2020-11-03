export const state = () => ({
    currentUser: null,
    admin: false,
})

export const actions = {
    async googleLogin ({commit}){
        const provider = this.$fireAuth
        console.log(provider)
        // const provider = this.$fireAuth.GoogleAuthProvider()
        await this.$fireAuth.signInWithPopup()
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
