<template>
  <div class="Home">
    <MenuListItems 
      v-for="(item, index) in listData" :key="index"
      :title="item.category_id" 
      :data="item.items"
      @openDetail="openDetail"
    />
    <DetailItem 
      :show="dialog" 
      :data="detailData"
      :option="optionData"
      @close="closeDetail"
    />
  </div>
</template>

<script>
import MenuListItems from '@/components/MenuListItems.vue';
import DetailItem from '@/components/DetailItem.vue';
import { RepositoryAPI } from '@/api/api_repository';
const callApi  = RepositoryAPI.get('frontend_request');

export default {
  name: 'Home',
  data() {
    return {
      dialog: false,
      detailData: null,
      optionData: null,
    }
  },
  components: {
    MenuListItems,
    DetailItem,
  },
  mounted(){
    this.fetchData();
  },

  methods: {
    async fetchData() {
      try {
        const data = await callApi.getDataHome();
        this.$store.commit('updateMenuNavBar', data.data.categories);
        this.$store.commit('updateListData', data.data.list);
      } catch( error ) {
        console.log( error );
      }
    },
    async openDetail(value) {
      this.dialog = !this.dialog;
      this.detailData = value;
      try {
        const data = await callApi.getDataDetail();
        this.optionData = data.data;
      } catch( error ) {
        console.log( error );
      }
    },
    closeDetail() {
      this.dialog = !this.dialog;
    }
  },
  computed: {
    listData() {
      return this.$store.getters.getListData;
    },
  }
}
</script>

