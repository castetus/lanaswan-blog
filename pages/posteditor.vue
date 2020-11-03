<template>
    <div class="post-editor">
          <v-container>
              <v-row>
                <v-text-field
                    v-model="post.title"
                    class="post-title-input" 
                    placeholder="Заголовок" />
                <v-menu
                    v-model="menu"
                    :close-on-content-click="false"
                    offset-x
                    >
                    <template v-slot:activator="{ on: menu, attrs }">
                        <v-tooltip bottom>
                            <template v-slot:activator="{ on: tooltip }">
                        <v-btn
                        text
                        v-bind="attrs"
                        v-on="{ ...tooltip, ...menu }">
                        <v-icon>
                            mdi-dots-vertical
                        </v-icon>
                        </v-btn>
                        </template>
                        <span>Редактор мета данных</span>
                        </v-tooltip>
                    </template>
            <v-card
                class="meta-editor">
                <v-radio-group
                    v-model="post.type"
                    row>
                    <v-radio
                        label="Запись"
                        value="post" />
                    <v-radio
                        label="Страница"
                        value="page" />
                </v-radio-group>
                <v-textarea
                    v-model="post.excerpt"
                    placeholder="Отрывок" />
                <v-text-field 
                    v-model="post.slug"
                    label="Ссылка" />
                <v-file-input
                    v-model="post.img"
                    label="Изображение" />
                    <v-img 
                        class="post__img-thumb"
                        :src="imgUrl" />
                <v-text-field 
                    v-model="post.metaTitle"
                    label="Title" />
                <v-text-field 
                    v-model="post.metaDescription"
                    label="Description" />

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="red"
            text
            @click="menu = false">
            Отмена
          </v-btn>
          <v-btn
            color="success"
            text
            @click="menu = false">
            Сохранить
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
              </v-row>
          </v-container>
      <v-container>
          <v-row>
            <div class="post-data">
                <div class="categories-list">
                <h4>Категории: </h4>
                <v-select
                    v-model="post.categories"
                    :items="categories"
                    item-text="name"
                    item-value="id"
                    multiple
                    placeholder="Категории">
                        <template v-slot:prepend-item>
                        <v-dialog
                            v-model="catEditor">
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                        v-bind="attrs"
                                        v-on="on"
                                        @click="catEditor = true"
                                        text>
                                        Управление категориями
                                    </v-btn>
                                </template>
                                <category-editor 
                                    @closeCategoryEditor="catEditor=false"/>
                            </v-dialog>
                        </template>
                    </v-select>
                </div>
                 <v-text-field 
                    v-model="post.date"
                    placeholder="Дата" />
                </div>
        </v-row>
        </v-container>
        <v-container>
             <editor 
                v-model="post.content"
                :init="{
                    inline: post.content.length,
                    height: 400,
                    plugins: [
                    'lists link image paste help wordcount'
                    ],
                    toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help'
                }" />
       </v-container>
       <v-container>
           <v-row>
               <v-btn
                    @click="savePost">
                    Сохранить
                </v-btn>
                <v-btn
                    @click="removePost">
                    Удалить пост
                </v-btn>
                <v-btn
                    @click="exitEditor">
                    Выйти из редактора
                </v-btn>
           </v-row>
       </v-container>
    </div>
</template>

<script>
import Editor from '@tinymce/tinymce-vue'
import CategoryEditor from '../components/CategoryEditor'

export default {
    components: {
        CategoryEditor,
        Editor
    },
    data (){
        return {
            menu: false,
            catEditor: false,
            imgUrl: '',
            post: {
                type: 'post',
                id: null,
                title: '',
                categories: [],
                date: new Intl.DateTimeFormat('ru').format(new Date()),
                slug: '',
                img: null,
                excerpt: '',
                content: '',
                metaTitle: '',
                metaDescription: ''
            }
        }
    },
    computed: {
        categories (){
            return this.$store.state.categories.categories
        },
    },
    async fetch (){
        if (this.$route.query.id){
            try {
                const ref = await this.$fireStorage.ref('postImgs/' + this.post.id)
                const url = await ref.getDownloadURL()
                this.imgUrl = url
            } catch (error) {
                console.log('2' + error)
            }
        }
    },
    fetchOnServer: false,
    created (){
        if (this.$route.query.id){
            const currentPost = this.$store.getters['posts/currentPost']
            this.post = Object.assign({}, currentPost)
        }
    },
    methods: {
        exitEditor (){
            if (this.post.slug.length){
                this.$router.push(`/posts/${this.post.slug}`)
            } else {
                this.$router.push('/')
            }
        },
        async savePost (){
            this.preparePost(this.post)
            try {
                await this.$store.dispatch('posts/savePost', this.post)
            } catch (error) {
                console.log(error)
            }
        },
        async removePost (){
            const args = {postId: this.post.id, catsIds: this.post.categories}
            await this.$store.dispatch('posts/removePost', args)
            this.$router.push('/')
        },
        preparePost (){
            if (!this.post.type === 'undefined'){
                this.post.type = 'post'
            }
            if (!this.post.id){
                this.post.id = Date.now()
            }
            if (this.post.slug === ''){
                this.post.slug = this.$transliterate(this.post.title)
            }
            // if (this.$store.getters['posts/allPosts'].find(post => post.slug === this.post.slug)){
            //     this.post.slug += '-1'
            // }
            if (this.post.metaTitle === ''){
                this.post.metaTitle = this.post.title
            }
            if (this.post.metaDescription === ''){
                this.post.metaDescription = this.$trancate(this.post.content, 160)
            }
            if (!this.post.categories.length || this.post.type === 'post'){
                this.post.categories = [1602597291833]
            }
            if (this.post.excerpt === ''){
                this.post.excerpt = this.$trancate(this.post.content, 120) + '...'
            }
        }
    }
}
</script>

<style>
    .post-title-input input{
        font-size: 2em;
        font-weight: bold;
    }
    .meta-editor {
        padding: 3em;
    }
    .post__img-thumb{
        width: 60px;
        height: auto;
    }
</style>
