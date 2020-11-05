export const state = () => ({
    isVisible: false,
    alert: {
        type: '',
        message: ''
    }
})
  
export const actions = {
    showAlert ({commit}, {type, message}){
        commit('showAlert', {type, message})
    },
    hideAlert ({commit}){
        commit('hideAlert')
    }
}
  
export const mutations = {
    showAlert (state, {type, message}){
        state.isVisible = true
        state.alert = {
            type: type,
            message: message
        }
    },
    hideAlert (state){
        state.isVisible = false
        state.alert = {
            type: '',
            message: ''
        }
    }
}
  
export const getters = {
    alertVisible (state){
        return state.isVisible
    },
    alert (state){
        return state.alert
    }
}
