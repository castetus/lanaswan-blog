<template>
<div class="categories-list">
    <v-btn
        @click="closeEditor"
        class="float-right"
        text>
          <v-icon>
              mdi-close
          </v-icon>
      </v-btn>
      <category-editor 
        v-if="catEditor"
        :id="catId" />
    <v-card v-else>
      <v-card-text>
            <v-simple-table
                width="100%">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Редактировать</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(category, n) in categories" 
                        :key="category.id">
                        <td>
                            {{ category.name }}
                        </td>
                        <td>
                            <v-icon
                                @click="editCategory(category.id)">
                                mdi-pencil
                            </v-icon>
                        </td>
                        <td>
                            <v-icon
                                @click="removeCategory(n)">
                                mdi-trash-can-outline
                            </v-icon>
                        </td>
                    </tr>
                </tbody>
            </v-simple-table>
      </v-card-text>
      <v-card-actions>
        <v-btn
            text
            @click="editCategory">
              Создать новую категорию
          </v-btn>
        </v-card-actions>
  </v-card>
</div>
</template>

<script>
export default {
    name: 'categories-list',
    data (){
        return {
            catId: null,
            catEditor: false
        }
    },
    computed: {
        categories: {
            get (){
               return this.$store.getters['categories/allCategories'].map((cat, idx) => Object.assign({ index: idx }, cat))
            },
            set (val){
                this.updateCategoryData(val)
            }
        }
    },
    methods: {
        removeCategory (n){
            this.$store.dispatch('categories/removeCategory', n)
        },
        editCategory (id = null){
            this.catId = id
            this.catEditor = true
        },
        // updateCategoryData (category){
        //     this.$store.dispatch('categories/updateCategoryData', category)
        // },
        // createCategory (name){
        //     if (this.newCategoryName === ''){
        //         return
        //     }
        //     const newCategory = {
        //         id: Date.now(),
        //         name: this.newCategoryName,
        //         slug: this.$transliterate(this.newCategoryName)
        //     }
        //     this.$store.dispatch('categories/createCategory', newCategory)
        //     this.newCategoryName = ''
        // },
        closeEditor (){
            this.$emit('closeCategoryEditor')
        }
    }
}

</script>

<style>

</style>
