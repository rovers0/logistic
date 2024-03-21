<template>
  <Paginate :page-range="3" :margin-pages="0" :prev-text="'<'" :next-text="'>'" :container-class="'pagination'" :page-class="'page-item'" :first-last-button="true" :first-button-text="'<<'" :last-button-text="'>>'">
  </Paginate>
</template>
<script setup>
// import "@ocrv/vue-tailwind-pagination/styles";
import Paginate from "vuejs-paginate-next";
</script>

<style>
.pagination {
  display: inline-block;
  padding-left: 0;
  border-radius: 4px;
}

.pagination>li {
  display: inline;
}

.pagination>li:first-child>a,
.pagination>li:first-child>span {
  margin-left: 0;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
}

.pagination>li:last-child>a,
.pagination>li:last-child>span {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

.pagination>li>a,
.pagination>li>span {
  position: relative;
  float: left;
  padding: 6px 12px;
  margin-left: -1px;
  /* line-height: 1.42857143; */
  color: #337ab7;
  text-decoration: none;
  background-color: #fff;
  border: 1px solid #ddd;
}

.pagination>.active>a,
.pagination>.active>span,
.pagination>.active>a:hover,
.pagination>.active>span:hover,
.pagination>.active>a:focus,
.pagination>.active>span:focus {
  z-index: 2;
  color: #fff;
  cursor: default;
  background-color: #337ab7;
  border-color: #337ab7;
}

.pagination a {
  cursor: pointer;
}
</style>
