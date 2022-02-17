<template>
<div>
    <div class="option">
      <div class="toping">{{dataAdd.name}}</div>
      <div class="qty" v-if="selected.length > 0">
          <span v-if="count">
              <span class="min" @click="remove">
                  <v-icon>remove</v-icon>
              </span>
              <span class="amount">{{ amount }}</span>
              <span class="plus" @click="add">
                  <v-icon>add</v-icon>
              </span>
          </span>
      </div>
      <div class="cuan">
          <span class="prc">
              SGD {{dataAdd.additional_price}}
          </span>
          <span class="sgd">
              <input type="checkbox" :value="dataAdd" v-model="selected">
          </span>
      </div>

    </div>
</div>
</template>
<script>
export default {
   name:"OptionAddons",
   props: {
       dataAdd: {
           type: Object,
            default: () => {},
       },
       count: {
           type: Boolean,
           default: false
       }
   },
   data() {
       return {
           selected: [],
           amount: 1,
           defaultPrice: this.dataAdd.additional_price,
       }
   },
   watch: {
        selected: function(value) {
            if (value.length == 1) {
                const data = {
                    flag: 'pick',
                    price: value[0].additional_price,
                }
                this.$emit('filled', data);
            }else {
                const data = {
                    flag: 'discard',
                    price: this.defaultPrice,
                }
                this.$emit('filled', data);
            }
            
        },
   },
   methods: {
       remove() {
            if(this.amount > 0) {
               this.amount -= 1;
                const data = {
                    flag: 'remove',
                    price: this.selected[0].additional_price,
                }
                this.$emit('filled', data);
            }
       },
       add() {
           this.amount += 1;
           const data = {
               flag: 'add',  
               price: this.selected[0].additional_price, 
           }
            this.$emit('filled', data);
       },
   }
}
</script>
<style lang="scss" scoped>
@import '@/assets/styles/variables.scss';
.option {
      display: flex;
      padding: 15px 0;
      border-bottom: 1px solid #ddd;
      .toping {
          flex: 1;
          font-size: 14px;
      }
      .qty {
          width: 30%;
          .min {
              padding: 5px 10px;
              cursor: pointer;
              i {
                  color: $bluePersib;
                  font-size: 14px;
              }
          }
          .amount {
              padding: 5px 10px;
              font-size: 14px;
              font-weight: bold;
              color: $thickfont;
          }
          .plus {
              padding: 5px 10px;
              cursor: pointer;
              i {
                  color: $bluePersib;
                  font-size: 14px;
              }
          }
      }
      .cuan {
          width: 20%;
          .prc {
              font-size: 14px;
              font-weight: bold;
              margin-right: 8px;
          }
      }
}
</style>
