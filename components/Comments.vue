<template>
  <div class="comments">
      <v-list>
        <v-subheader>
            Комментарии
        </v-subheader>
        <v-divider />
        <template>
        <v-list-item
            v-for="(item, index) in items"
            :key="index">
          <v-list-item-avatar>
            <v-img :src="item.avatar" />
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title v-html="item.title" />
            <v-list-item-subtitle v-html="item.subtitle" />
          </v-list-item-content>
        </v-list-item>
        <v-divider />
      </template>
    </v-list>
  </div>
</template>

<script>
export default {
    name: 'comments',
    props: ['postId'],
    data: () => ({
      items: [
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/1.jpg',
          title: 'Brunch this weekend?',
          subtitle: '<span class="text--primary">Ali Connors</span> &mdash; Ill be in your neighborhood doing errands this weekend. Do you want to hang out?  Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sequi cum aliquid voluptatibus dignissimos saepe assumenda quidem. Voluptatum, corporis ipsam itaque possimus, repellendus magnam reprehenderit dolorem esse, cum laboriosam reiciendis nulla alias labore similique excepturi accusantium ullam eius non sed aliquam a. Architecto, ut! Quisquam placeat laudantium quasi, officiis illo dolor accusamus asperiores omnis aliquam, natus vel repellat ex nisi autem maxime sed laboriosam ipsa iste! Fugiat quidem rerum deserunt atque molestias. Nesciunt ipsam sed asperiores possimus. Aspernatur aperiam mollitia autem eligendi, error, beatae vero modi itaque dicta natus sequi! Veritatis, nihil ut. Ea, voluptatum debitis doloribus neque et minus eius!',
        },
       {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/2.jpg',
          title: 'Summer BBQ <span class="grey--text text--lighten-1">4</span>',
          subtitle: '<span class="text--primary">to Alex, Scott, Jennifer</span> &mdash; Wish I could come, but Im out of town this weekend.',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/3.jpg',
          title: 'Oui oui',
          subtitle: '<span class="text--primary">Sandra Adams</span> &mdash; Do you have Paris recommendations? Have you ever been?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/4.jpg',
          title: 'Birthday gift',
          subtitle: '<span class="text--primary">Trevor Hansen</span> &mdash; Have any ideas about what we should get Heidi for her birthday?',
        },
        {
          avatar: 'https://cdn.vuetifyjs.com/images/lists/5.jpg',
          title: 'Recipe to try',
          subtitle: '<span class="text--primary">Britta Holt</span> &mdash; We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
        },
      ],
    }),
    computed: {
      comments (){
        return this.$store.getters['posts/getPostComments']
      }
    },
}
</script>

<style>

</style>
