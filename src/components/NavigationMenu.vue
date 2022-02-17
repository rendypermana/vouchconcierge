<template>
    <div class="NavigationMenu">
        <div class="NavigationMenu__items">
            <div
                v-for="(item, index) in dataNavigation" :key="index"
                class="NavigationMenu__item" 
                :class="[{activeNav : isActive == index}]"
                v-ripple="{ center: true }"
                @click="linkTo(index, item._id)"
            >
                {{ item.name }}
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'NavigationMenu',
    props: {
        dataNavigation: {
            type: Array,
            default: () => []
        }
    },
    data() {
        return {
            isActive: 0,
        }
    },
    methods: {
        linkTo(value, id) {
            this.isActive = value;
            const elmnt = document.getElementById(id).offsetTop;
            const navbar = document.getElementById('headertop').offsetHeight - 110;
            const position = elmnt - navbar;
            window.scrollTo(0, position);
        },
    }
    
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
    .NavigationMenu {
        &__items {
            display: flex;
            height: 45px;
            margin: 0;
            background: $white;
            box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
            overflow-y: scroll;
            -ms-overflow-style: none;
            scrollbar-width: none;
            &::-webkit-scrollbar {
                display: none;
            }
        }
        &__item {
            min-width: 7vw;
            padding: 10px;
            font-size: 14px;
            color: $regularFont;
            text-align: center;
            border-bottom: 3px solid transparent;
            transition: all .3s;
            text-decoration: none;
            &:hover {
                cursor: pointer;
            }
            @include breakpoint(extrasmall) {
                min-width: 25vw;
                font-size: 12px;
            }
            @include breakpoint(mobileonly) {
                min-width: 25vw;
            }
            @include breakpoint(tablet) {
                min-width: 25vw;
            }
        }
    }
    .activeNav {
        color: $bluePersib!important;
        border-bottom: 2px solid $bluePersib!important;
    }
</style>