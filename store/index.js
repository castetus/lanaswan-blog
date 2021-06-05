export const state = () => ({})
export const getters = {}
export const actions = {
    async nuxtServerInit ({ commit}, { req }) {
        try {
            const categories = await (await this.$firebase.database().ref('categories/').once('value')).val()
            commit('categories/loadCategories', Object.values(categories))
            const posts = await (await this.$firebase.database().ref('allPosts').once('value')).val()
            commit('posts/loadAllPosts', Object.values(posts))
        } catch (error) {
            console.log(error)
        }
    },
    test (){
        console.log('test')
    }
}
