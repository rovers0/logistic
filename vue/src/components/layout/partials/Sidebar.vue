<template>
  <aside class="wrapper-scroll" aria-label="Sidebar">
    <div class="sb-header d-flex align-items-center">
      <img src="/images/icons/note.png" alt="note" style="display: inline; height: auto; width: 25%; margin-left: 5px; padding: 0.25rem;"/>
      <span style="width: 100%; white-space: nowrap;">ポンプ管理</span>
    </div>
    
    <div class="parent-scroll">
      <nav class="sb-content view-scroll">
        <li class="nav-group" v-for="group in navigation" :class="group.disabled ? 'disabled' : ''">
          <router-link v-if="group.child.length >= 1" :to="group.child[0].page" class="" :class="router.name == group.child[0].page.name ? 'actived' : ''" ><span>{{group.title}}</span></router-link>
          <ul v-if="group.child.length > 1" class="nav-item">
            <li v-for="item in group.child" :class="router.name == item.page.name ? 'actived fw-bold' : ''" class="justify-content-center">
              <router-link :to="item.page"><span>{{item.title}}</span></router-link>
            </li>
          </ul>
        </li>
      </nav>
    </div>
  </aside>
</template>
<script setup>
import { useRoute } from "vue-router";
import { NAVIGATION } from '@/components/Constants.vue';

const router = new useRoute();
</script>
<script>
export default {
  data() {
    return {
      navigation: NAVIGATION,
    };
  },
};
</script>
