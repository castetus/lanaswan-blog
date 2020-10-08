<template>
  <div class="social-icons">
      <a v-for="item in icons" :key="item.icon"
        :href="item.link">
        <v-btn icon>
            <v-icon>{{item.icon}}</v-icon>
        </v-btn>
        </a>
  </div>
</template>

<script>

export default {
    name: 'social-icons',

    data(){
        return{
            icons: [
                {
                    link: '#',
                    icon: 'mdi-facebook'
                },
                                {
                    link: '#',
                    icon: 'mdi-twitter'
                },
                                {
                    link: '#',
                    icon: 'mdi-vk'
                },
                                {
                    link: '#',
                    icon: 'mdi-instagram'
                },
            ]
        }
    }
}
</script>

<style>

</style>