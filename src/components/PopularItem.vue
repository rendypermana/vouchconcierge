<template>
    <div class="PopularItem">
        <slick
            ref="slick"
            :options="slickOptions"
        >
            <div class="CardPopular" v-for="(item, index) in dataPopular" :key="index" @click="detailShow(item)">
                <div class="CardPopular__img">
                    <div class="discount-icon" v-if="item.is_discount">
                        <v-icon color="#FFF" >percent</v-icon>
                    </div>
                    <img :src="item.image_url" />
                </div>
                <div class="CardPopular__content">
                    <h3 class="CardPopular__content-title">{{ item.name }}</h3>
                    <div class="CardPopular__content-desc">
                        {{ textClean(item.description) }}
                    </div>
                    <ul class="tags">
                        <li class="item-tags on" v-for="(data, index) in item.tags.slice(0, 2)" :key="index">
                            {{ cleanLetters(data) }}
                        </li>
                    </ul>
                    <div class="CardPopular__content-price">
                        <span class="normal">SGD {{item.display_price}}, 00</span>
                        <span class="discount" v-if="item.is_discount">SGD {{item.display_price}}, 00</span>
                    </div>
                </div>
            </div>
        </slick>
    </div>
</template>

<script>
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';
export default {
    name: "PopularItem",
    props: {
        dataPopular: {
            type: Array,
            default: () => [],
        }
    },
    data() {
        return {
            slickOptions: {
                slidesToShow: 2,
                arrows: false,
                responsive: [
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 2,
                            arrows: false,
                        },
                        
                    },
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            arrows: false,
                        }
                    },
                ]
            },
        }
    },
    components: {
        Slick,
    },
    methods: {
        cleanLetters(value) {
            return value.replace(/_/g, ' ');
        },
        textClean(value) {
            return value.substr(0, 50) +'...';
        },
        detailShow(value) {
            this.$parent.$emit('show', value);
        }
    }
}
</script>


<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
    .PopularItem {
        .CardPopular {
            display: inline-block;
            position: relative;
            background: $white;
            border-radius: 8px;
            box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
            width: 100%;
            height: 30vh;
            margin: 15px 0px;
            cursor: pointer;
            @include breakpoint(mobileonly) {
                height: 40vh;
            }
            &__img {
                width: 100%;
                position: relative;
                overflow: hidden;
                height: 130px;
                img {
                    position: absolute;
                    width: 100%;
                    height: 150px;
                    -o-object-fit: cover;
                    object-fit: cover;
                    border-radius: 8px 8px 0 0;
                }
                .discount-icon {
                    position: absolute;
                    right: 15px;
                    top: 15px;
                    z-index: 2;
                    background-color: #DA1414;
                    padding: 3px;
                    border-radius: 4px;
                    i {
                        font-size: 16px;
                    }
                }
            }
            &__content {
                margin: 15px;
                position: relative;
                height: 100px;
                &-title {
                    font-size: 14px;
                    color: $thickfont;
                }
                &-desc {
                    font-size: 10px;
                }
                &-price {
                    display: flex;
                    position: absolute;
                    bottom: -35px;
                    .normal {
                        font-weight: bold;
                        font-size: 12px;
                        color: #151522;
                        margin-right: 15px;
                    }
                    .discount {
                        font-weight: bold;
                        font-size: 12px;
                        color: $regularLight;
                        text-decoration: line-through;
                    }
                    
                }
            }
        }
    }

.tags {
    padding-inline-start: 0;
    list-style: none;
    display: block;
    margin-top: 8px;
    .item-tags {
        position: relative;
        max-width: 0;
        opacity: 0;
        margin-bottom: 3px;
        &.on {
            max-width: 150px;
            opacity: 1;
            margin-right: 3px;
            display: inline-block;
            font-size: 10px;
            opacity: 1;
            color: $bluePersib;
            background:$blueXtc;
            text-transform: capitalize;
            padding: 2px 5px;
            border-radius: 6px;
            font-weight: bold;
        }
    }
    
}
</style>