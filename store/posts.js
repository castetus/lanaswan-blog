export const state = () => ({
    posts: [],
    currentPost: {},
    test: false
})

export const actions = {
    async savePost ({commit, dispatch}, post){
        if (post.img){
            const imgRef = await this.$firebase.storage().ref('postImgs/' + post.id)
            imgRef.getDownloadURL().then((url) => {
                this.$firebase.storage().ref('postImgs/' + post.id).delete()
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
            await this.$firebase.database().ref('allPosts/' + post.id).set({
                id: post.id,
                slug: post.slug,
                type: post.type,
                title: post.title,
                categories: post.categories,
                excerpt: post.excerpt,
            })
            await this.$firebase.database().ref('posts/' + post.id).set({
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
                imgUrl: this.$firebase.storage().ref('postImgs/' + post.id).getDownloadURL()
            })
            for (const cat of post.categories){
                await this.$firebase.database().ref('categories/' + cat + '/posts').update({
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
            await this.$firebase.storage().ref('postImgs/' + post.id).put(post.img)
        }
    },
    async loadAllPosts ({commit}){
        // try {
        //     const posts = await (await this.$firebase.database().ref('allPosts').once('value')).val()
        //     commit('loadAllPosts', posts)
        // } catch (error) {
        //     console.log(error)
        // }
    },
    async removePost ({commit}, args){
        try {
            await this.$firebase.database().ref('allPosts/' + args.postId).remove()
            await this.$firebase.database().ref('posts/' + args.postId).remove()
            await this.$firebase.storage().ref('postImgs/' + args.postId).delete()
            for (const catId of args.catsIds){
                await this.$firebase.database().ref('categories/' + catId + '/posts/' + args.postId).remove()
            }
            commit('removePost', args)
        } catch (error) {
            console.log(error)
        }
    },
    async loadSinglePost ({commit}, postId){
        try {
            const post = await (await this.$firebase.database().ref('posts/' + postId).once('value')).val()
            let comments = await (await this.$firebase.database().ref('comments/' + postId + '/comments').once('value')).val()
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
            const ref = await this.$firebase.storage().ref('postImgs/' + postId)
            const url = await ref.getDownloadURL()
            commit('imgUrl', url)
        } catch (error) {
            console.log(error)
        }
    },
    async saveComment ({state, rootState, commit}, data){
        // const currentUserId = rootState.auth.currentUserId
        const comment = {
            date: data.date,
            text: data.text
        }
        // comment.userName = await (await this.$firebase.database().ref('users/' + currentUser.id + '/name').once('value')).val()
        // comment.avatarUrl = await this.$firebase.storage().ref('users/' + currentUser.id).getDownloadURL()
        const user = this.$firebase.auth().currentUser
        comment.userName = user.displayName
        comment.avatarUrl = user.photoURL
        commit('addComment', comment)
        const comments = state.currentPost.comments
        try {
            await this.$firebase.database().ref('comments/' + data.postId).update({
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
