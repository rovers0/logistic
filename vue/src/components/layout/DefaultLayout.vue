<template>
  <link rel="stylesheet" type="text/css" href="css/selectize.min.css" />
  <link rel="stylesheet" type="text/css" href="css/main.css" />
  <link rel="stylesheet" type="text/css" href="css/mobile.css" />
  <link rel="stylesheet" type="text/css" href="css/animate.css">
  <link rel="stylesheet" type="text/css" href="css/font-awesome-animation.min.css">
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
  <div class="main">
    <template v-if="menu == 0">
      <banner></banner>
      <header-page></header-page>
    </template>
    <template v-else>
      <menu-left></menu-left>
      <banner-top></banner-top>
    </template>
    <div class="page" :class="menu != 1 ? 'page2' : ''">
      <router-view></router-view>
    </div>
  </div>
  <div class="footer">
    <p>© Phần mềm Logistics - www.vantaihaiphong.com.vn</p>
  </div><span class="back-top" title="Back to top"><i class="fa fa-arrow-up"></i></span>
</template>
<script setup>
import Banner from "./partials/Banner.vue";
import BannerTop from "./partials/BannerTop.vue";
import HeaderPage from "./partials/Header.vue";
import MenuLeft from "./partials/MenuLeft.vue";
</script>
<script>
export default {
  data: function () {
    return {
      menu: null
    }
  },
  mounted: function () {
    this.loadScript();
    this.refreshPage();
  },
  methods: {
    loadScript: function () {
      let files = [
        'plugins/ckeditor/ckeditor.js',
        'js/jquery-3.5.1.min.js',
        'js/jquery-ui.min.js',
        'js/jquery.colorbox-min.js',
        // 'js/jquery-ui.multidatespicker.min.js',
        'js/selectize.min.js',
        'js/jquery.tablesorter.min.js',
        'js/main.js',
      ];

      files.forEach((file, i) => {
        let script = document.createElement('script')
        script.setAttribute('src', file)
        document.head.appendChild(script)
      });
    },
    refreshPage: function () {
      if (this.isMobile()) {
        this.menu = 0;
      } else {
        this.menu = JSON.parse(localStorage.getItem('setting')).menu;
      }
    },
    isMobile: function () {
      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
