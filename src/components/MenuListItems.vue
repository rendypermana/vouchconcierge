<template>
    <div class="MenuListItems" :id="title">
        <v-container>
            <div class="MenuListItems__header">
                <h2 class="MenuListItems__header-title">{{ cleanLetters(title) }}</h2>
                <div class="MenuListItems__content">
                    <MenuListItem :data="data" :type="title" @show="openDetail"/>
                </div>
            </div>
        </v-container>
    </div>
</template>

<script>
import MenuListItem from '@/components/MenuListItem.vue';
export default {
    name: "MenuListItems",
    props: {
        title: {
            type: String,
            default: '',
        },
        data: {
            type: Array,
            default: () => []
        }
    },
    components: {
        MenuListItem,
    },
    methods: {
        cleanLetters(value) {
            return value.replace(/_/g, ' ');
        },
        openDetail(value){
            this.$emit('openDetail', value);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.MenuListItems {
    margin: 0px;
    &__header {
        padding-bottom: 15px;
        &-title {
            font-size: 16px;
            color: $thickfont;
            text-transform: capitalize;
            margin-bottom: 15px;
        }
    }
    
}
</style>