<template>
  <link rel="stylesheet" type="text/css" href="css/selectize.min.css" />
  <link rel="stylesheet" type="text/css" href="css/main.css" />
  <link rel="stylesheet" type="text/css" href="css/mobile.css" />
  <link rel="stylesheet" type="text/css" href="css/animate.css">
  <link rel="stylesheet" type="text/css" href="css/font-awesome-animation.min.css">
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
  <div class="main">
    <banner></banner>
    <header-page></header-page>
    <router-view></router-view>
  </div>
  <div class="footer">
    <p>© Phần mềm Logistics - www.vantaihaiphong.com.vn</p>
  </div><span class="back-top" title="Back to top"><i class="fa fa-arrow-up"></i></span>
</template>
<script setup>
import Banner from "./partials/Banner.vue";
import HeaderPage from "./partials/Header.vue";
</script>
<script>
export default {
  data: function () {

  },
  mounted: function () {
    this.loadScript()
  },
  methods: {
    loadScript: function () {
      let files = [
        'plugins/ckeditor/ckeditor.js',
        'js/jquery-3.5.1.min.js',
        'js/jquery-ui.min.js',
        'js/jquery.colorbox-min.js',
        'js/jquery-ui.multidatespicker.min.js',
        'js/selectize.min.js',
        'js/jquery.tablesorter.min.js',
        'js/main.js',
      ];

      files.forEach((file, i) => {
        let script = document.createElement('script')
        script.setAttribute('src', file)
        document.head.appendChild(script)
      });
    }
  }
}
</script>