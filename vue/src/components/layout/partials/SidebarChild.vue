<template>
   <aside aria-label="SidebarChild">
    <div class="d-flex">
      <div class="menu" style="width: 70%;">
        <router-link v-for="view in listView" :to="view.page" :class="view.disabled ? 'disabled' : '', router.name == view.page.name ? 'actived' : ''" class=""><span>{{view.title}}</span></router-link>
      </div>
      <div class="d-flex justify-content-end align-items-center" style="width: 30%; padding-right: 10px;">
        <span class="title-small">{{currDate}}現在</span>
        <button class="btn default ml-[1rem]" v-if="transit.status" @click="backFromTransitDetail()">一覧に戻る</button>
      </div>
    </div>
   </aside>
</template>
<style scoped>
    button.btn{
        font-size: 1rem;
    }
</style>
<script setup>
import { NAVIGATION } from '@/components/Constants.vue';
import { useRoute } from "vue-router";
import moment from 'moment'
import { mapState } from "vuex";
const router = new useRoute();
</script>
<script>
export default {
  props:['listView'],
  created: function(){
    this.currDate = moment().format('YYYY年MM月DD日')+'(' +new Date().toLocaleString('ja', {  weekday: 'short' })+') ';
  },
  data() {
    return {
      navigation: NAVIGATION,
      currDate: '',
    };
  },
  computed: {
    ...mapState(['transit'])
  },
  methods: {
    backFromTransitDetail: function () {
      this.$store.commit('setIsOpenTransitDetail');
    }
  }
};
</script>
