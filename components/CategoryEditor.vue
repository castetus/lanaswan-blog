<template>
  <v-card>
      <v-btn
        @click="closeEditor"
        class="float-right"
        text>
          <v-icon>
              mdi-close
          </v-icon>
      </v-btn>
      <v-card-title>
          Редактор категорий
          <v-text-field 
            v-model="newCategoryName" />
          <v-btn
            text
            @click="createCategory">
              Создать категорию
          </v-btn>
      </v-card-title>
      <v-card-text>
            <v-simple-table
                width="100%">
                <thead>
                    <tr>
                        <th>Название</th>
                        <th>Slug</th>
                        <th>Удалить</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="(category, n) in categories" 
                        :key="category.id">
                        <td>
                            <v-text-field
                                v-model="categories[n].name"
                                outlined
                                @change="updateCategoryData(category)" />
                        </td>
                        <td>
                            <v-text-field
                                v-model="categories[n].slug"
                                outlined
                                @change="updateCategoryData(category)" />
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
  </v-card>
</template>

<script>
export default {
    name: 'category-editor',
    data (){
        return {
            newCategoryName: ''
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
        updateCategoryData (category){
            this.$store.dispatch('categories/updateCategoryData', category)
        },
        createCategory (name){
            if (this.newCategoryName === ''){
                return
            }
            const newCategory = {
                id: Date.now(),
                name: this.newCategoryName,
                slug: this.$transliterate(this.newCategoryName)
            }
            this.$store.dispatch('categories/createCategory', newCategory)
            this.newCategoryName = ''
        },
        closeEditor (){
            this.$emit('closeCategoryEditor')
        }
    }
}

</script>

<style>

</style>
