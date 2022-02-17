<template>
    <div 
        class="Header"
        id="headertop"
    >
        <v-toolbar
            :src="bgImage"
            flat
            :prominent="expand"
            min-height="50"
            max-height="120"
            width="100%"
        >
            <v-overlay z-index="0" opacity="0.2"></v-overlay>
            <v-btn icon>
                <v-icon color="#FFF" >chevron_left</v-icon>
            </v-btn>

            <v-toolbar-title class="Header--title" >Dining</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon>
                <span>
                    <v-icon color="#FFF">language</v-icon>
                    <v-icon color="#FFF" class="right">arrow_drop_down</v-icon>
                </span>
            </v-btn>
        </v-toolbar>
        <NavigationMenu 
            :data-navigation="getCategories"
        />
    </div>
</template>
<script>
import header from '@/assets/images/bg-header.jpg';
import NavigationMenu from '@/components/NavigationMenu.vue';
export default {
    name: 'Header',
    data() {
        return {
            bgImage: header,
            expand: true,
            offsetTop: 0,
            lastScrollPosition: 0
        }
    },
    components: {
        NavigationMenu,
    },
    created() {
        window.addEventListener('scroll', this.onScrollNavbar)
    },
    methods: {
        onScrollNavbar() {
            const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
            if (currentScrollPosition > 100) {
                this.expand = false;
            } 
            if (currentScrollPosition == 0) {
                this.expand = true;
            } 
        }
    },
    computed: {
        getCategories() {
            return this.$store.getters.getMenuNavBar;
        }
    }
}
</script>

<style lang="scss" scoped>
.right {
  font-size: 18px!important;
  margin-left: -5px;
}
</style>
