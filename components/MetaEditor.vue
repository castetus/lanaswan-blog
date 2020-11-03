<template>
              <v-card>
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
                <v-text-field 
                    v-model="post.metaTitle"
                    label="Title" />
                <v-text-field 
                    v-model="post.metaDescription"
                    label="Description" />

        <v-card-actions>
          <v-spacer />

          <v-btn
            text
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="primary"
            text
            @click="menu = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
</template>

<script>
export default {

}
</script>

<style>

</style>