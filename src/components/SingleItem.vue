<template>
    <div class="CardSingle" @click="detailShow">
        <div class="CardSingle-left">
           <h3 class="CardSingle-left-title">{{ data.name }}</h3>
           <div class="CardSingle-left-content">
               <div class="content-area">
                <p>{{ data.description }}</p>
               </div>
               <ul class="tags">
                    <li class="item-tags on" v-for="(item, index) in data.tags.slice(0, 2)" :key="index">
                       {{ cleanLetters(item) }}
                    </li>
               </ul>
               <div class="price">
                    <div class="price-tag">SGD {{data.display_price}},00</div>
                    <div class="price-discount" v-if="data.is_discount">SGD {{data.display_price}},00</div>
               </div>
           </div>
        </div>
        <div class="CardSingle-right">
            <div class="img-right">
                <div class="discount-icon" v-if="data.is_discount">
                    <v-icon color="#FFF" >percent</v-icon>
                </div>
                <img :src="data.image_url" />
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SingleItem',
    props: {
        data: {
            type: Object,
            default: null
        }
    },
    methods: {
        cleanLetters(value) {
            return value.replace(/_/g, ' ');
        },
        detailShow() {
            this.$parent.$emit('show', this.data);
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';

.CardSingle {
    position: relative;
    background: $white;
    width: 100%;
    display: flex;
    border-radius: 8px;
    margin-bottom: 8px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
    max-height: 170px;
    cursor: pointer;
    &-left {
        width: 60%;
        padding: 15px;
        &-title {
            font-size: 14px;
            color: $thickfont;
            margin-bottom: 8px;
        }
        &-content {
            .content-area {
                margin-bottom: 8px;
                height: 40px;
                p {
                    font-size: 10px;
                }
            }
        }
    }
    &-right {
        width: 40%;
        .img-right {
            height: 170px;
            position: relative;
            overflow: hidden;
            border-radius: 0 8px 8px 0;
            img {
                position: absolute;
                width: 100%;
                height: 170px;
                object-fit: cover;
                border-radius: 0 8px 8px 0;
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
    }
}
.tags {
    padding-inline-start: 0;
    list-style: none;
    display: block;
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
.price {
    margin-top: 8px;
    display: flex;
    &-tag {
        font-size: 12px;
        color: $thickfont;
        font-weight: bold;
        margin-right: 15px;
    }
    &-discount {
        font-size: 12px;
        color: $regularLight;
        font-weight: bold;
        text-decoration: line-through;
    }
}
</style>