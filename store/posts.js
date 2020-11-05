export const state = () => ({
    posts: [],
    currentPost: {},
    test: false
})

export const actions = {
    async savePost ({commit, dispatch}, post){
        if (post.img){
            const imgRef = await this.$fireStorage.ref('postImgs/' + post.id)
            imgRef.getDownloadURL().then((url) => {
                this.$fireStorage.ref('postImgs/' + post.id).delete()
                dispatch('savePostImg', post)
            }).catch((err) => {
                if (err.code === 'storage/object-not-found'){
                    dispatch('savePostImg', post)
                } else {
                    console.log('1' + err)
                }
            })
        }

        try {
            await this.$fireDb.ref('allPosts/' + post.id).set({
                id: post.id,
                slug: post.slug,
                type: post.type,
                title: post.title,
                categories: post.categories,
                excerpt: post.excerpt,
            })
            await this.$fireDb.ref('posts/' + post.id).set({
                type: post.type,
                id: post.id,
                slug: post.slug,
                title: post.title,
                date: post.date,
                categories: post.categories,
                excerpt: post.excerpt,
                content: post.content,
                metaTitle: post.metaTitle,
                metaDescription: post.metaDescription,
                imgUrl: this.$fireStorage.ref('postImgs/' + post.id).getDownloadURL()
            })
            for (const cat of post.categories){
                await this.$fireDb.ref('categories/' + cat + '/posts').update({
                    postId: post.id
                })
            }
            commit('savePost', post)
        } catch (error) {
            console.log(error)
        }   
    },
    async savePostImg ({dispatch}, post){
        if (post.img && post.img !== null){
            await this.$fireStorage.ref('postImgs/' + post.id).put(post.img)
        }
    },
    async loadAllPosts ({commit}){
        // try {
        //     const posts = await (await this.$fireDb.ref('allPosts').once('value')).val()
        //     commit('loadAllPosts', posts)
        // } catch (error) {
        //     console.log(error)
        // }
    },
    async removePost ({commit}, args){
        try {
            await this.$fireDb.ref('allPosts/' + args.postId).remove()
            await this.$fireDb.ref('posts/' + args.postId).remove()
            await this.$fireStorage.ref('postImgs/' + args.postId).delete()
            for (const catId of args.catsIds){
                await this.$fireDb.ref('categories/' + catId + '/posts/' + args.postId).remove()
            }
            commit('removePost', args)
        } catch (error) {
            console.log(error)
        }
    },
    async loadSinglePost ({commit}, postId){
        try {
            const post = await (await this.$fireDb.ref('posts/' + postId).once('value')).val()
            let comments = await (await this.$fireDb.ref('comments/' + postId + '/comments').once('value')).val()
            if (!comments){
                comments = []
            }
            post.comments = comments
            commit('loadCurrentPost', post)
        } catch (error) {
            console.log(error)
        }
    },
    async getImg ({commit}, postId){
        try {
            const ref = await this.$fireStorage.ref('postImgs/' + postId)
            const url = await ref.getDownloadURL()
            commit('imgUrl', url)
        } catch (error) {
            console.log(error)
        }
    },
    async saveComment ({state, rootState, commit}, data){
        const currentUser = rootState.auth.currentUser
        const comment = {
            date: data.date,
            text: data.text
        }
        comment.userName = await (await this.$fireDb.ref('users/' + currentUser + '/name').once('value')).val()
        comment.avatarUrl = await this.$fireStorage.ref('users/' + currentUser).getDownloadURL()
        commit('addComment', comment)
        const comments = state.currentPost.comments
        try {
            await this.$fireDb.ref('comments/' + data.postId).update({
                comments
            })
        } catch (error) {
            console.log(error)
        }
    },
}

export const mutations = {
    savePost (state, post){
        const index = state.posts.findIndex(existingPost => existingPost.id === post.id)
        if (index !== -1){
            state.posts[index] = post
        } else {
            state.posts.push(post)
        }
    },
    loadAllPosts (state, posts){
        state.posts = posts
    },
    removePost (state, args){
        const postIndex = state.posts.findIndex(post => post.id === args.postId)
        state.posts.splice(postIndex, 1)
    },
    loadCurrentPost (state, post){
        state.currentPost = post
    },
    imgUrl (state, url){
        state.imgUrl = url
    },
    addComment (state, comment){
        state.currentPost.comments.unshift(comment)
    },
}

export const getters = {
    allPosts (state){
        return state.posts
    },
    currentPost (state){
        return state.currentPost
    },
    getImgUrl (state){
        return state.imgUrl
    },
    getPostComments (state){
        return state.currentPost.comments
    }
}
