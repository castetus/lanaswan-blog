export const state = () => ({
    categories: [
        {
            id: 1,
            slug: 'category-1',
            name: 'Категория 1'
        },
        {
            id: 2,
            slug: 'category-2',
            name: 'Категория 2'
        },
        {
            id: 3,
            slug: 'category-3',
            name: 'Категория 3'
        },
    ]
})

export const actions = {
    async removeCategory ({commit, state}, n){
        const catId = state.categories[n].id
        try {
            await this.$fireDb.ref('categories/' + catId).remove()
            commit('removeCategory', n)
        } catch (error) {
            console.log(error)
        }
    },
    async updateCategoryData ({commit}, category){
        try {
            await this.$fireDb.ref('categories/' + category.id).update({
                name: category.name,
                slug: category.slug
            })
            commit('updateCategoryData', category)
        } catch (error) {
            console.log(error)
        }
    },
    async createCategory ({commit}, category){
        try {
            await this.$fireDb.ref('categories/' + category.id).set({
                id: category.id,
                name: category.name,
                slug: category.slug
            })
            commit('createCategory', category)
        } catch (error) {
            console.log(error)
        }
    }
}

export const mutations = {
    loadCategories (state, categories){
        state.categories = categories
    },
    removeCategory (state, n){
        state.categories.splice(n, 1)
    },
    updateCategoryData (state, category){
        const updatedCategory = state.categories.findIndex(cat => cat.id === category.id)
        state.categories[updatedCategory].name = category.name
        state.categories[updatedCategory].slug = category.slug
    },
    createCategory (state, category){
        state.categories.unshift(category)
    }
}

export const getters = {
    allCategories (state){
        return state.categories
    }
}
