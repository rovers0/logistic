<template>
  <div class="main-wrapper">
    <header>
      <div class="left">
        <img style="height: auto; width: 60%; min-width: 160px; max-width: 280px;" src="/logo-1.png" alt="Workflow" />
      </div>
      <div class="text-center title-large" style="width: 40%;">
        {{ header_page }}
      </div>
      <div class="right">
        <span class="flex-1 title-small ellip text-end">{{ user ? "SMD）" + user.username : "" }}</span>
        <button class="mx-3 btn default" @click="isOpenChangePassword = true">パスワード変更</button>
        <button class="btn logout" @click="logout">ログアウト</button>
      </div>
    </header>
    <side-bar class="sidebar"></side-bar>
    <side-bar-child class="sidebar-child" :listView="listView"></side-bar-child>
    <main>
      <div class="wrapper-scroll">
        <div class="parent-scroll">
          <div class="view-scroll d-flex" :class="[transit.class]" style="width: 100%; height: 100%; overflow-x: hidden;">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </main>
    <footer>
      <div class="gap-2 d-flex" v-on:dblclick="setDeleteButton(true)">
        <div>
          <!-- <span>エス・エム・ディ株式会社</span> -->
        </div>
        <div>
          <span>Copyright© Specialty Medical Distribution Corporation All rights reserved.</span>
        </div>
      </div>
    </footer>
  </div>

  <LoadingModal v-if="loading"></LoadingModal>
  <ConfirmModal ref="cfDialog"></ConfirmModal>
  <ChangePasswordModal
    v-if="isOpenChangePassword"
    :show="isOpenChangePassword"
    @close="isOpenChangePassword = false"></ChangePasswordModal>
</template>
<script setup>
import { mapState, mapGetters, mapMutations } from "vuex";
import { useRoute } from "vue-router";
import route from "@/router";
import SideBar from "./partials/Sidebar.vue";
import SideBarChild from "./partials/SidebarChild.vue";
import LoadingModal from "./modal/LoadingModal.vue";
import ConfirmModal from "@/components/layout/modal/ConfirmModal.vue";
import ChangePasswordModal from "@/views/commons/ChangePasswordModal.vue";
import {
  NAVIGATION,
  TRANSIT_RENT,
  RENT_DETAIL_HEADER,
  TRANSIT_ACHIEVEMENT,
  FAILURE_DETAIL_HEADER,
  TRANSIT_EXCHANGE,
  EXCHANGE_DETAIL_HEADER } from '@/components/Constants.vue';
const router = new useRoute();
</script>
<script>
export default {
  computed: {
      ...mapState(['transit', 'loading', 'errorModal']),
      ...mapGetters(['user']),
      ...mapState(['isDeleteButton'])
  },
  watch: {
    $route:function (to, from){
      this.findMenu();
    },
    'transit.status':  function () {
      this.findMenu();
    },
    'errorModal': {
        deep: true,
        handler: async function () {
            if (this.errorModal.active) {
              await this.$refs.cfDialog.show(this.errorModal);
              this.$store.commit('initErrorModal');
            }
        }
    },
  },
  data: function () {
    return {
      navigation: NAVIGATION,
      header_page: '',
      listView: [],
      isOpenChangePassword: false,
    };
  },
  created: function(){
    this.findMenu();
  },
  methods: {
    ...mapMutations(['setDeleteButton']),
    findMenu:function(){
      var listMenu = this.navigation.find((group, index) => {
        var index = group.child.findIndex(v => v.page.name == this.$router.currentRoute.value.name);
        if(index >= 0) {
          let sub_title = group.child.length > 1 ? ' － '+group.child[index].title : '';
          if(this.transit.status) {
            if(this.transit.type == TRANSIT_RENT) {
              sub_title = ' － '+RENT_DETAIL_HEADER;
            }
            if(this.transit.type == TRANSIT_ACHIEVEMENT) {
              sub_title = ' － '+FAILURE_DETAIL_HEADER;
            }
            if(this.transit.type == TRANSIT_EXCHANGE) {
              sub_title = ' － '+EXCHANGE_DETAIL_HEADER;
            }
          }
          this.header_page = group.title + sub_title;
        }
        else
          this.header_page = '';

        return index >= 0;
      });
      this.listView = listMenu != null ? listMenu.child : [];
    },
    logout:function(){
        this.$store.dispatch("logout").then(() => {
          window.location.reload();
            /*this.$router.push({
                name: "Login",
            });*/
            return;
        });
    },
  }
};
</script>