export const state = () => ({
    comments: []
})

export const actions = {
    async saveComment ({commit}, data){
        await this.$fireDb.ref('comments/' + data.postId)
    }
}

export const mutations = {
    
}

export const getters = {

}
