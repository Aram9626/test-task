<template>
  <aside class="sidebar" :class="[' text-white transition-all duration-300', isCollapsed ? 'w-30' : 'w-78']">
    <div class="sidebar-header" :class="[isCollapsed ? '' : 'py-16']">
      <img alt="Logo" src="@/assets/images/logo.svg" class="logo" />
    </div>
    <div class="collapse-toggle">
      <button @click="isCollapsed = !isCollapsed" class="collapse-button">
        <span v-if="!isCollapsed">
          <img width="30px" alt="Arrow Left" src="@/assets/images/arrow-circle-left.svg" />
        </span>
        <span v-else>
          <img width="30px" alt="Arrow Right" src="@/assets/images/circle%20chevrons.svg" />
        </span>
      </button>
    </div>
    <ul class="menu">
      <li
          v-for="item in menuItems"
          :key="item.name"
          @click="navigate(item.route)"
          class="menu-item"
          :class="{'active': route.path.includes(item.route)}"
      >
        <div class="menu-item-content" :class="{'justify-center': isCollapsed}">
          <img width="30px" :alt="item.name" :src="getImgUrl(route.path.includes(item.route) ? item.ActivImg : item.Img)" />
          <span v-if="!isCollapsed" class="menu-item-text">{{ item.name }}</span>
        </div>
      </li>
    </ul>
  </aside>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()


const isCollapsed = ref(false)

const menuItems = [
  { name: 'Organization', ActivImg:'organization.svg', Img:'organization_.svg', route: '/about' },
  { name: 'Roles', ActivImg:'roles.svg', Img:'roles_.svg', route: '/roles' },
  { name: 'Users', ActivImg:'profile.svg', Img:'profile_.svg', route: '/users' },
  { name: 'Workers', ActivImg:'workers.svg', Img:'workers_.svg', route: '/workers' },
  { name: 'Places', ActivImg:'place.svg', Img:'place_.svg', route: '/places' },
  { name: 'Products', ActivImg:'product.svg', Img:'product_.svg', route: '/products' },
  { name: 'Orders', ActivImg:'orders.svg', Img:'orders_.svg', route: '/orders' },
  { name: 'Scan History', ActivImg:'scan-history.svg', Img:'scan-history_.svg', route: '/scan-history' },
]

function navigate(path) {
  router.push(path)
}
function getImgUrl(filename) {
  return new URL(`../assets/images/SideBar/${filename}`, import.meta.url).href
}
</script>

<style lang="scss" scoped>
$sidebar-bg: #1D1D26;
$hover-bg: #4B5563;
$active-bg: #ffffff;
$active-text: #f97316;
$text-color: #ffffff;

.sidebar {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
  background-color: $sidebar-bg;
  color: $text-color;
  transition: width 0.3s ease;

  &.w-30 {
    width: 7.5rem;
  }

  &.w-78 {
    width: 19.5rem;
  }

  .sidebar-header {
    //padding: 1rem 0;
    .logo {
      height: 85px;
      width: 114px;
    }
  }

  .collapse-toggle {
    position: relative;
    height: 1.25rem;

    .collapse-button {
      position: absolute;
      top: 0;
      right: -0.75rem;
      background: none;
      border: none;
      cursor: pointer;
    }
  }

  .menu {
    padding-top: 2rem;
    padding-bottom: 2rem;
    margin: 0;
    list-style: none;

    .menu-item {
      padding: 0.5rem 0.75rem;
      margin-bottom: 2.5rem;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: $hover-bg;
      }

      &.active {
        background-color: $active-bg;
        color: $active-text;

        .menu-item-text {
          font-weight: 700;
        }
      }

      .menu-item-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;

        &.justify-center {
          justify-content: center;
        }

        .menu-item-text {
          font-size: 0.875rem;
          transition: opacity 0.3s ease;
        }
      }
    }
  }
}
</style>
