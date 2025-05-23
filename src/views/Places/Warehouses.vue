<script setup>
import { ref, computed, onMounted } from 'vue';
import WarehouseTable from './WarehouseTable.vue';
import WarehouseCard from './WarehouseCard.vue';

import Pagination from "@/components/Pagination.vue";
import Select from "@/components/Select.vue";

import { useWarehouseStore } from '@/stores/warehouseStore';

const store = useWarehouseStore();


const selectOptions = ref([
  { value: 'name', label: 'Name' },
  { value: 'organization', label: 'Organization' },
  { value: 'address', label: 'Address' }
]);
const perPageOptions = ref([]);
perPageOptions.value = [10, 20, 30, 40, 50].map(el => {
  return {
    value: el,
    label: el,
  }
})


function getImgUrl(filename) {
  return new URL(`../../assets/images/${filename}`, import.meta.url).href
}

onMounted(() => {
  store.fetchData();
})


</script>

<template>
  <div class="container">
    <div class="control-group-s mb-30" v-if="!store.isTableView">
      <div class=" search-group">
        <Select v-model="store.searchField" :options="selectOptions" placeholder="Search by"/>
        <Select v-model="store.searchField"  placeholder="LIKE"/>
        <Select v-model="store.searchField"  placeholder="Search"/>
      </div>

      <button class="search-button">+</button>
    </div>
    <div class="controls">

      <div class="control-group">
        Show
        <Select class="item-select w-54" v-model="store.itemsPerPage" :options="perPageOptions" placeholder="Search by"/>
        <button class="export-button">
          <img src="@/assets/images/export.svg" alt="PDF icon" class="export-icon" />
          Export PDF
        </button>
      </div>
      <div class="control-group">
        <div class="h-9">
          <button @click="store.toggleView(true)">
            <img
                :src="getImgUrl( `table-view${store.isTableView ? '_' : ''}.svg`)"
                alt="Table View"

            />
          </button>
          <button @click="store.toggleView(false)">
            <img
                :src="getImgUrl( `card-view${!store.isTableView ? '_' : ''}.svg`)"
                alt="Card View"

            />
          </button>
        </div>
      <button class="view-toggle">
        Create Warehouse
      </button>
      </div>
    </div>

    <WarehouseTable v-if="store.isTableView" :warehouses="store.warehouses" :paginatedWarehouses="store.paginatedWarehouses" />
    <WarehouseCard v-else :warehouses="store.warehouses" :paginatedWarehouses="store.paginatedWarehouses" />
    <Pagination
        :itemsPerPage="store.itemsPerPage"
        :currentPage="store.currentPage"
        :warehouses="store.warehouses"
        @update:currentPage="store.setCurrentPage($event)"
    />

  </div>
</template>

<style lang="scss" scoped>
.container {
  //min-height: 100vh;

  .control-group-s {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    .search-button {
      background-color: #f97316;
      color: #ffffff;
      border: none;
      border-radius: 0.25rem;
      padding: 0.25rem 0.75rem;
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #ea580c;
      }
    }
    .search-group {
      //display: flex;
      //align-items: center;
      //gap: 0.25rem;
      background-color: #f9fafb;
      border: 1px solid #e5e7eb;
      border-radius: 0.25rem;
      padding: 0.25rem 0.5rem;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);


      .search-input {
        border: 1px solid #d1d5db;
        border-radius: 0.25rem;
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;
        width: 150px;

        &:focus {
          outline: none;
          border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
        }
      }

      .like-checkbox {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
        color: #374151;

        input {
          margin: 0;
        }
      }

      .search-clear {
        background: none;
        border: none;
        font-size: 1rem;
        color: #9ca3af;
        cursor: pointer;
        padding: 0.25rem;

        &:disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }

        &:hover:not(:disabled) {
          color: #374151;
        }
      }

      .result-count {
        font-size: 0.875rem;
        color: #2563eb;
        margin-left: 0.5rem;
      }
    }
  }

  .controls {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;

    .control-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      .item-select {
        border: 1px solid #d1d5db;
        border-radius: 6px;
        padding: 0.25rem 0.5rem;
        font-size: 0.875rem;

        &:focus {
          outline: none;
          //border-color: #2563eb;
          box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
        }
      }

      .export-button {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        padding: 0.25rem 0.75rem;
        border: 1px solid #d1d5db;
        border-radius: 6px;
        font-size: 0.875rem;
        color: #1f2937;
        cursor: pointer;
        transition: background-color 0.2s;

        .export-icon {
          width: 1rem;
          height: 1rem;
        }
      }
    }

    .view-toggle {
      background-color: #f97316;
      color: #ffffff;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      border: none;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover {
        background-color: #ea580c;
      }
    }
  }
}
</style>