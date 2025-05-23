<script setup>
import { ref, computed } from "vue";
import SortIcon from "@/components/SortIcon.vue";
const props = defineProps({
  warehouses: {
    type: Array,
    required: true,
  },
  paginatedWarehouses: {
    type: Array,
    required: true,
  },
})
const sortKey = ref('name');
const sortOrder = ref('asc');

const sort = (key) => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};
const sortedWarehouses = computed(() => {
  return [...props.paginatedWarehouses].sort((a, b) => {
    let aValue = a[sortKey.value];
    let bValue = b[sortKey.value];
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    if (sortOrder.value === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
});
</script>
<template>
  <div class="table-wrapper">
    <table class="table">
      <thead>
      <tr class="table-header">
        <th class="table-header-cell" @click="sort('hm')">
            <span class="header-content">
              H/H
              <SortIcon :sortKey="sortKey" :sortOrder="sortOrder" column="hm"/>
            </span>
        </th>
        <th class="table-header-cell" @click="sort('name')">
          <span class="header-content">
            Name
            <SortIcon :sortKey="sortKey" :sortOrder="sortOrder" column="name"/>
          </span>
        </th>
        <th class="table-header-cell" @click="sort('organization')">
          <span class="header-content">
            Organization
            <SortIcon :sortKey="sortKey" :sortOrder="sortOrder" column="organization"/>
          </span>
        </th>
        <th class="table-header-cell" @click="sort('address')">
          <span class="header-content">
            Address
            <SortIcon :sortKey="sortKey" :sortOrder="sortOrder" column="address"/>
          </span>
        </th>
        <th class="table-header-cell" @click="sort('worker')">
          <span class="header-content">
            Worker
            <SortIcon :sortKey="sortKey" :sortOrder="sortOrder" column="worker"/>
          </span>
        </th>
        <th class="table-header-cell" @click="sort('products')">
          <span class="header-content">
            Products
            <SortIcon :sortKey="sortKey" :sortOrder="sortOrder" column="products"/>
          </span>
        </th>
        <th class="table-header-cell">
          <span>Action</span>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="warehouse in sortedWarehouses" :key="warehouse.id" class="table-row">
        <td class="table-cell">{{ warehouse.hm }}</td>
        <td class="table-cell">{{ warehouse.name }}</td>
        <td class="table-cell">{{ warehouse.organization }}</td>
        <td class="table-cell">{{ warehouse.address }}</td>
        <td class="table-cell">{{ warehouse.worker }}</td>
        <td class="table-cell">{{ warehouse.products }}</td>
        <td class="table-cell">
          <button class="action-button">
            <img src="@/assets/images/eye.svg" alt="icon" class="action-icon" />
          </button>
          <button class="action-button">
            <img src="@/assets/images/Union.svg" alt="icon" class="action-icon" />
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
<!--<template>-->
<!--  <div class="overflow-x-auto">-->
<!--    <table class="min-w-full border border-gray-200">-->
<!--      <thead>-->
<!--      <tr class="bg-gray-100">-->
<!--        <th-->
<!--            class="py-2 px-4 border-gray-100 cursor-pointer"-->
<!--            @click="sort('hm')"-->
<!--        >-->
<!--              <span class="flex items-center">-->
<!--                H/M-->
<!--                <span class="ml-1 flex flex-col ml-10">-->
<!--                  <span :class="sortKey === 'hm' && sortOrder === 'asc' ? 'text-black' : 'text-gray-400'">▲</span>-->
<!--                  <span style="margin-top: -10px" :class="sortKey === 'hm' && sortOrder === 'desc' ? 'text-black' : 'text-gray-400'">▼</span>-->
<!--                </span>-->
<!--              </span>-->
<!--        </th>-->
<!--        <th class="py-2 px-4 border-gray-100 cursor-pointer ">-->
<!--          <span>Name</span>-->
<!--        </th>-->
<!--        <th class="py-2 px-4 border-gray-100 cursor-pointer ">-->
<!--          <span>Organization</span>-->
<!--        </th>-->
<!--        <th class="py-2 px-4 border-gray-100 cursor-pointer ">-->
<!--          <span>Address</span>-->
<!--        </th>-->
<!--        <th class="py-2 px-4 border-gray-100 cursor-pointer ">-->
<!--          <span>Worker</span>-->
<!--        </th>-->
<!--        <th class="py-2 px-4 border-gray-100 cursor-pointer ">-->
<!--          <span>Products</span>-->
<!--        </th>-->
<!--        <th class="py-2 px-4 border-gray-100 ">-->
<!--          <span>Action</span>-->
<!--        </th>-->
<!--      </tr>-->
<!--      </thead>-->
<!--      <tbody>-->
<!--      <tr v-for="warehouse in sortedWarehouses" :key="warehouse.id">-->
<!--        <td class="py-2 px-4 border-b border-gray-200 ">{{ warehouse.hm }}</td>-->
<!--        <td class="py-2 px-4 border-b border-gray-200 ">{{ warehouse.name }}</td>-->
<!--        <td class="py-2 px-4 border-b border-gray-200 ">{{ warehouse.organization }}</td>-->
<!--        <td class="py-2 px-4 border-b border-gray-200 ">{{ warehouse.address }}</td>-->
<!--        <td class="py-2 px-4 border-b border-gray-200 ">{{ warehouse.worker }}</td>-->
<!--        <td class="py-2 px-4 border-b border-gray-200 ">{{ warehouse.products }}</td>-->
<!--        <td class="py-2 px-4 border-b border-gray-200 ">-->
<!--          <button class=" mr-2">-->
<!--            <span><img-->
<!--                src="@/assets/images/eye.svg"-->
<!--                alt="icon"-->
<!--                class="w-6 h-6"-->
<!--            /></span>-->
<!--          </button>-->
<!--          <button class="">-->
<!--            <span><img-->
<!--                src="@/assets/images/Union.svg"-->
<!--                alt="icon"-->
<!--                class="w-6 h-6"-->
<!--            /></span>-->
<!--          </button>-->
<!--        </td>-->
<!--      </tr>-->
<!--      </tbody>-->
<!--    </table>-->
<!--  </div>-->

<!--</template>-->

<style lang="scss" scoped>
.table-wrapper {
  overflow-x: auto;

  .table {
    width: 100%;
    border-collapse: collapse;
    border: 1px solid #e5e7eb;

    .table-header {
      background-color: #f3f4f6;

      .table-header-cell {
        padding: 0.5rem 1rem;
        //border: 1px solid #e5e7eb;
        cursor: pointer;
        color: #1f2937;
        font-weight: 500;

        .header-content {
          display: flex;
          align-items: center;
        }
      }
    }

    .table-row {
      background-color: #ffffff;

      &:hover {
        background-color: #FBFBFC;
      }
      .table-cell {
        padding: 0.5rem 1rem;
        border-bottom: 1px solid #e5e7eb;
        color: #1f2937;


        .action-button {
          background: none;
          border: none;
          cursor: pointer;
          margin-right: 0.5rem;

          .action-icon {
            width: 1.5rem;
            height: 1.5rem;
          }
        }
      }
    }
  }
}
</style>