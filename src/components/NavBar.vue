<script setup >
import Translate from "@/components/Translate.vue";

import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted, watch} from "vue";

const route = useRoute()

const pathNames = ref([])
function capitalizeFirst(text) {
  if (!text) return ''
  return text.charAt(0).toUpperCase() + text.slice(1)
}
watch(
    () => route.path,
    (newPath, oldPath) => {
      if(newPath){
        pathNames.value = newPath.split('/').filter(el => el)
      }
    }
)
</script>

<template>
  <div class="navbar-container">
    <div class="navbar-grid ">
      <div class="breadcrumbs">
        <div class="breadcrumb-items">
          <div
              v-for="(el, idx) in pathNames"
              :key="el"
              class="breadcrumb-item"
          >
            <img
                v-if="idx > 0"
                alt="right arrow icon"
                src="@/assets/images/Arrow-Right.svg"
                class="breadcrumb-arrow"
            />
            <span  :class="{ 'active': idx === pathNames.length - 1 }">
              {{ capitalizeFirst(el) }}
            </span>
          </div>
        </div>
      </div>

      <div class="navbar-right">
        <div class="navbar-right-grid">
          <div>
            <Translate />
          </div>

          <div>
            <button class="notification-button">
              <img
                  src="@/assets/images/notification.svg"
                  alt="notification icon"
                  class="notification-icon"
              />
            </button>
          </div>

          <div class="user-section">
            <span class="user-role">Super admin</span>
            <span class="divider"></span>
            <span class="logout ">
              Logout
              <img
                  src="@/assets/images/login.svg"
                  alt="logout icon"
                  class="logout-icon"
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar-container {
  margin: 0 auto;
  padding: 1rem;

  .navbar-grid {
    display: grid;
    grid-template-columns: 7fr 4fr;
    gap: 1rem;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }

    .breadcrumbs {
      .breadcrumb-items {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .breadcrumb-item {
          display: flex;
          align-items: center;
          font-size: 0.875rem;
          color: #687384;

          .breadcrumb-arrow {
            margin: 0 0.5rem;
            width: 1rem;
            height: 1rem;
          }

          span {
            &.active {
              font-weight: 700;
              color: #232229;
            }
          }
        }
      }
    }

    .navbar-right {
      .navbar-right-grid {
        display: grid;
        grid-template-columns: 2fr 1fr 4fr;
        gap: 1rem;
        align-items: center;

        @media (max-width: 768px) {
          grid-template-columns: 1fr 1fr 2fr;
        }

        .notification-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem;
          //background-color: #374151;
          border-radius: 0.25rem;
          transition: background-color 0.2s;

          &:hover {
            //background-color: #4b5563;
          }

          .notification-icon {
            width: 2.5rem;
            height: 2.5rem;
          }
        }

        .user-section {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 1rem;
          text-align: right;

          .user-role {
            font-size: 1.125rem;
            color: #1B2A42;
          }

          .divider {
            border-left: 1px solid #E9EAED;
            height: 1.5rem;
            margin: 0 0.5rem;
          }

          .logout {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.875rem;
            cursor: pointer;
            color: #4B586D;
            transition: color 0.2s;

            &:hover {
              color: #d1d5db;
            }

            .logout-icon {
              width: 1.5rem;
              height: 1.5rem;
            }
          }
        }
      }
    }
  }
}
</style>