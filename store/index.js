// import Vue from 'vue'
// import Vuex from 'vuex'

// Vue.use(Vuex)

// const store = () =>
//   new Vuex.Store({
//     state: {
//       counter: 0
//     },
//     actions: {
//         setAllPosts({commit}, data){
//             commit('setAllPosts', data)
//         }
//     },
//     mutations: {
//         setAllPosts(state, data){
//             state.posts = data
//         }
//     },
//     getters: {
//         getAllPosts(state){
//             return state.posts
//         }
//     }
//   })

// export default store

// import Vuex from 'vuex';
// import data from "~/store/posts";

// const createStore = () => {
//   return new Vuex.Store({
//     modules: {
//       data: {
//         namespaced: true,
//         ...data
//       }
//     }
//   });
// };

// export default createStore;

export const state = () => ({})
export const getters = {}
export const actions = {}