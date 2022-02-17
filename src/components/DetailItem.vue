<template>
    <div class="DetailItem">
        <v-dialog
          v-model="show"
          persistent
          width="400"
          transition="dialog-bottom-transition"
        >
        <div class="DetailItem__section" v-if="option && data">
          <div class="block-close">
            <div class="block-close--icon" @click="close"></div>
          </div>
          <div class="DetailItem__content">
              <v-container>
                <div class="slider" v-if="data">
                    <slick
                    ref="slick"
                    :options="slickOptions"
                    >
                        <div class="img-slide">
                            <img :src="detailData.image_url" alt="">
                        </div>
                        <div class="img-slide">
                            <img :src="detailData.image_url" alt="">
                        </div>
                        <div class="img-slide">
                            <img :src="detailData.image_url" alt="">
                        </div>
                    </slick>
                </div>
                <div class="details">
                    <h3>{{ detailData.name }}</h3>
                    <div class="desc">
                        {{ detailData.description }}
                    </div>
                    <ul class="tags">
                        <li class="item-tags on" v-for="(item, index) in detailData.tags" :key="index">
                        {{ cleanLetters(item) }}
                        </li>
                    </ul>
                    <div class="price">
                        <div class="price-tag">SGD {{detailData.display_price}},00</div>
                        <div class="price-discount" v-if="detailData.is_discount">SGD {{detailData.display_price}},00</div>
                    </div>
                </div>
              </v-container>
              <div class="divider" />
              <v-container>
                <div class="variants">
                    <label>Variants</label>
                    {{isiVariant}}
                    <v-select
                        :items="variants"
                        item-text="item"
                        :v-model="isiVariant"
                        label="Choose One"
                        solo
                        class="selectvariant"
                        @change="fillSelect"
                    ></v-select>
                </div>
              </v-container>
              <div class="divider" />
              <v-container>
                <div class="dish" v-for="(item, index) in optionData.addons.slice(0, 1)" :key="index">
                    <label>{{item.addon_cateogry_name}}</label>
                    <OptionAddons v-for="(data, idx) in item.addon_items" :key="idx" 
                        :dataAdd="data" 
                        @filled="filledIn"
                        :count="true" 
                    />
                </div>
              </v-container>
              <div class="divider" />
              <v-container>
                <div class="dish" v-for="(item, index) in optionData.addons.slice(1, 3)" :key="index">
                    <label>{{item.addon_cateogry_name}}</label>
                    <OptionAddons v-for="(data, idx) in item.addon_items" :key="idx" 
                        :dataAdd="data" 
                        @filled="filledIn"
                    />
                </div>
              </v-container>
              <div class="divider" />
              <v-container>
                <div class="notes">
                    <label>Notes</label>
                    <p>Optional</p>
                    <v-textarea
                        rows="1"
                        solo
                        label="Eg. No Mushroom"
                        v-model="notes"
                        maxlength="200"
                    ></v-textarea>
                    <span class="length">{{notesLength}}/200</span>
                </div>
              </v-container>
          </div>
          <div class="DetailItem__footer">
            <v-container>
                <div class="footer">
                    <div class="addItem">
                        <span class="min"  @click="minCart">
                            <v-icon>remove</v-icon>
                        </span>
                        <span class="amount">{{valueCart}}</span>
                        <span class="plus" @click="plusCart">
                            <v-icon>add</v-icon>
                        </span>
                    </div>
                    <div class="btn">
                        <v-btn
                            v-if="valueCart == 0"
                            large
                            block
                            color="#E1604D"
                            @click="removeItem"
                        >
                            Remove Item
                        </v-btn>
                        <v-btn
                            v-else-if="valueCart > 0 && addToCart == true"
                            large
                            block
                            color="#3377FF"
                            @click="checkoutCart"
                        >
                            Add to Cart - SGD {{totalPrice}}.00
                        </v-btn>
                        <v-btn
                            v-else
                            large
                            block
                            color="#b2b2b2"
                            @click="addingToCart"
                        >
                            Add to Cart
                        </v-btn>
                    </div>
                </div>
            </v-container>
           </div>
        </div>
      </v-dialog>
    </div>
</template>

<script>
import Slick from 'vue-slick';
import 'slick-carousel/slick/slick.css';
import OptionAddons from '@/components/OptionAddons.vue';
export default {
  name: 'DetailItem',
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
        type: Object,
        default: null,
    },
    option: {
        type: Object,
        default: () => {},
    }
  },
  components: {
    Slick,
    OptionAddons
  },
  data() {
    return {
        slickOptions: {
            slidesToShow: 1,
            dots: true,
            arrows: false,
        },
        isiVariant: null,
        filled: 0,
        filledSelect: false,
        notes: null,
        notesLength: 0,
        valueCart: 1,
        addToCart: false,
        buy: false,
        price: 0,
        totalPrice: 0,
    }
  },
  watch: {
      filledSelect: function(val) {
          console.log(val)
      },
      notes: function(val) {
          this.notesLength = val.length;
      },
      valueCart: function(val) {
          if (val == 0) this.addToCart = false;
      }
  },
  methods: {
    close() {
      this.$emit('close');
    },
    cleanLetters(value) {
        return value.replace(/_/g, ' ');
    },
    filledIn(value) {
        if(value.flag === 'pick' ){
            this.price += value.price;
            this.addToCart = false;
        } else if(value.flag === 'add') {
            this.price  += value.price;
            this.addToCart = false;
        } else if(value.flag === 'remove') {
            this.price  -= value.price;
            this.addToCart = false;
        } else if(value.flag === 'discard') {
            this.price  -= value.price;
            this.addToCart = false;
        }

    },
    fillSelect() {
        this.filledSelect = true;
    },
    addingToCart(){
        this.addToCart = true;
        this.totalPrice = this.price * this.valueCart;
    },
    minCart() {
        if(this.valueCart > 0) this.valueCart -= 1;
        this.addToCart = false;
    },
    plusCart() {
        this.valueCart += 1;
        this.addToCart = false;
    },
    checkoutCart() {
        this.$emit('close');
    },
    removeItem() {
        this.$emit('close');
    }
  },
  computed: {
    detailData() {
      if (this.data) return this.data;
      else return null;
    },
    optionData() {
        if (this.option) return this.option;
        else return null;
    },
    variants() {
        const x = [];
        this.option.variants.map((data) => {
            const y = {
                item: data.name,
                value: data._id,
            }
            x.push(y); 
        })
        return x;
    }
  }
}
</script>


<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
  .DetailItem {
    &__section {
      position: relative;
      height: 100%;
      background: $white;
      border-top-left-radius: 16px!important;
      border-top-right-radius: 16px!important;
      .block-close {
          position: relative;
          width: 100%;
          text-align: center;
          padding-top: 15px;
        &--icon {
            margin: 0px auto;
            width: 40px;
            height: 5px;
            background: grey;
            opacity: .3;
            border-radius: 10px;
            cursor: pointer;
        }
      }
    }
    &__content {
        margin-top: 15px;
        height: 80vh;
        overflow: auto;
        &::-webkit-scrollbar {
            display: none;
        }
        .slider {
            .img-slide {
                position: relative;
                height: 200px;
                overflow: hidden;
                border-radius: 16px;
                width: 100%;
                @include breakpoint(tablet) {
                    height: 250px;
                }
                img {
                    position: absolute;
                    height: 250px;
                    object-fit: cover;
                    width: 100%;
                }
            }
        }
        .details {
            margin-top: 21px;
            h3 {
                font-size: 18px;
                letter-spacing: 1px;
                color: $thickfont;
            }
            .desc {
                color: $regularFont;
                font-size: 12px;
            }
            .tags {
                margin-top: 8px;
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
        }
        .variants {
            position: relative;
            label {
                font-size: 14px;
                font-weight: bold;
                color: $thickfont;
                margin-bottom: 8px;
            }
            .selectvariant {
                margin-top: 8px;
                box-shadow: none!important;
            }
            
        }
        .dish {
            position: relative;
            margin-bottom: 8px;
            label {
                font-size: 14px;
                font-weight: bold;
                color: $thickfont;
                margin-bottom: 8px;
            }
        }
        .notes {
            position: relative;
            margin-bottom: 45px;
            @include breakpoint(mobileonly) {
                margin-bottom: 100px;
            }
            @include breakpoint(tablet) {
                margin-bottom: 20px;
            }
            label {
                font-size: 14px;
                font-weight: bold;
                color: $thickfont;
                margin-bottom: 8px;
            }
            .v-textarea {
                font-size: 14px;
                margin-bottom: -30px;
                margin-top: -15px;
                .v-label {
                    font-size: 14px;
                    color: $regularLight;
                }
            }
            p {
                font-size: 12px;
                color: $regularLight;
            }
            .length {
                margin-top: 20px;
                color: $regularLight;
                font-size: 12px;
            }
        }
    }
    &__footer {
        z-index: 99;
        background: $white;
        bottom: 0;
        position: fixed;
        width: 400px;
        height: auto;
        padding: 0;
        display: flex;
        @include breakpoint(mobileonly) {
            width: 100%!important;
        }
        @include breakpoint(tablet) {
            width: 100%!important;
        }
        .footer {
            display: flex;
            background: $white;
        }
        .footer {
            .addItem {
                width: 30%;
                display: flex;
                margin-right: 10px;
                font-size: 14px;
                align-items: center;
                border-radius: 5px;
                box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
                .min {
                    padding: 10px 20px;
                    cursor: pointer;
                    i{
                        color: $bluePersib;
                        font-size: 16px;
                    }
                }
                .amount {
                    font-size: 14px;
                    color: $thickfont;
                    font-weight: bold;
                }
                .plus {
                    padding: 10px 20px;
                    cursor: pointer;
                    i{
                        color: $bluePersib;
                        font-size: 16px;
                    }
                }
            }
            .btn {
                width: 70%;
                button {
                    color: $white!important;
                    text-transform: capitalize!important;
                }
                .v-btn--is-elevated {
                    box-shadow: 0 3px 10px rgb(0 0 0 / 20%)!important;
                }
            }
        }
    }

  }
  .divider {
    width: 100%;
    height: 10px;
    background: hsla(0,0%,50.2%,.1);
  }
</style>
