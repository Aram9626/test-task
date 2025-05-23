<script setup>
import { ref } from 'vue';

defineProps({
  warehouses: {
    type: Array,
    required: true,
  },
  paginatedWarehouses: {
    type: Array,
    required: true,
  },
});

const hoveredCard = ref(null);

function getImgUrl(filename) {
  return new URL(`../../assets/images/${filename}`, import.meta.url).href
}
</script>

<template>
  <div class="card-grid">
    <div
        v-for="warehouse in paginatedWarehouses"
        :key="warehouse.id"
        class="card"
        @mouseover="hoveredCard = warehouse.id"
        @mouseleave="hoveredCard = null"
        :class="{ 'hover-state': hoveredCard === warehouse.id }"
    >
      <div class="card-header">
        <div class="header-item">
        </div>
        <div class="actions">
          <button class="action-button">
            <img
                :src="getImgUrl(hoveredCard === warehouse.id ? 'eye.svg' : 'Union.svg')"
                :alt="hoveredCard === warehouse.id ? 'view icon' : 'menu icon'"
                class="action-icon"
            />
          </button>
          <button class="action-button">
            <img
                :src="getImgUrl(hoveredCard === warehouse.id ? 'Union.svg' : 'eye.svg')"
                :alt="hoveredCard === warehouse.id ? 'menu icon' : 'view icon'"
                class="action-icon"
            />
          </button>
        </div>
      </div>
      <div class="card-body">
        <div class="card-item">
          <span class="label">H/H</span>
          <span class="value">{{ warehouse.hm }}</span>
        </div>
        <div class="card-item">
          <span class="label">Name</span>
          <span class="value">{{ warehouse.name }}</span>
        </div>
        <div class="card-item">
          <span class="label">Organization</span>
          <span class="value">{{ warehouse.organization }}</span>
        </div>
        <div class="card-item">
          <span class="label">Address</span>
          <span class="value">{{ warehouse.address }}</span>
        </div>
        <div class="card-item">
          <span class="label">Worker</span>
          <span class="value">{{ warehouse.worker }}</span>
        </div>
        <div class="card-item">
          <span class="label">Products</span>
          <span class="value">{{ warehouse.products }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;

  .hover-state {
    .card-header {
      background-color: unset !important;
    }
    .card-body{
      background-color: #F9F9FA;
    }
  }
  .card {
    background-color: #ffffff;
    border: 1px solid #e5e7eb;
    border-radius: 0.5rem;

    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s;



    .card-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;
      padding: 1rem;
      background-color: #F9F9FA;

      .header-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;

        .label {
          font-weight: 600;
          color: #6b7280;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .value {
          font-size: 1rem;
          color: #1f2937;
          font-weight: 500;
        }
      }

      .actions {
        display: flex;
        gap: 0.25rem;

        .action-button {
          background: none;
          border: none;
          cursor: pointer;
          padding: 0.25rem;

          .action-icon {
            width: 1rem;
            height: 1rem;
            color: #9ca3af;
            transition: color 0.2s;

            &:hover {
              color: #374151;
            }
          }
        }
      }
    }

    .card-body {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding: 1rem;

      .card-item {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .label {
          font-weight: 600;
          color: #6b7280;
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .value {
          font-size: 0.875rem;
          color: #1f2937;
          font-weight: 400;
        }
      }
    }
  }
}
</style>