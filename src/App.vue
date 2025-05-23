<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SideBar from "./components/SideBar.vue";
import NavBar from "./components/NavBar.vue";

import { useWarehouseStore } from '@/stores/warehouseStore';

const store = useWarehouseStore();
</script>

<template>
  <header :class="{'h-100vh': store.isTableView}">

    <div class="wrapper">
      <SideBar />
    </div>
  </header>

<main class="main-body px-4 text-gray-900">
 <NavBar/>
  <br>
 <RouterView />
</main>
</template>

<style lang="scss" scoped>
$gray-200: #e5e7eb;

.bg-gray-200 {
  background-color: $gray-200;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

  header {
    display: flex;
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
  }

.main-body {
  padding: 1rem;
  color: #1f2937;
}
</style>
