<script setup>
import { computed, ref } from 'vue';

const props = defineProps({
  warehouses: {
    type: Array,
    required: true,
  },
  currentPage: {
    type: Number,
    required: true,
  },
  itemsPerPage: {
    type: Number,
    required: true,
  },
});
const emit = defineEmits(['update:currentPage']);

const totalPages = computed(() => {
  const length = props.warehouses?.length || 0;
  const perPage = props.itemsPerPage || 1;
  return Math.ceil(length / perPage);
});

const goToPageInput = ref('');

const goToPage = () => {
  const page = parseInt(goToPageInput.value);
  if (page >= 1 && page <= totalPages.value) {
    emit('update:currentPage', page);
  }
  goToPageInput.value = '';
};

const updatePage = (page) => {
  emit('update:currentPage', page);
};

// Use the getPages function
const displayedPages = computed(() => {
  return getPages(props.currentPage, totalPages.value);
});

function getPages(current, total) {
  const pages = [];

  if (total <= 1) return [1];

  pages.push(1);

  if (total <= 5) {
    for (let i = 2; i <= total; i++) pages.push(i);
  } else if (current <= 3) {
    for (let i = 2; i <= 4; i++) pages.push(i);
    pages.push('...');
  } else if (current >= total - 2) {
    pages.push('...');
    for (let i = total - 3; i <= total; i++) pages.push(i);
  } else {
    pages.push('...');
    pages.push(current - 1, current, current + 1);
    pages.push('...');
  }

  if (!pages.includes(total)) pages.push(total);

  return [...new Set(pages)];
}
</script>

<template>
  <div class="pagination">
    <span class="pagination-info">
      Showing {{ currentPage }} to {{ Math.min(itemsPerPage, warehouses.length) }} of {{ warehouses.length }} entries
    </span>
    <div class="pagination-controls">
      <button
          @click="updatePage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="pagination-button pagination-button-prev"
      >
        &lt;
      </button>
      <button
          v-for="item in displayedPages"
          :key="item"
          :disabled="item === '...'"
          @click="typeof item === 'number' && updatePage(item)"
          :class="[
          'pagination-button',
          item === currentPage ? 'pagination-button-active' : '',
          item === '...' ? 'pagination-button-ellipsis' : ''
        ]"
      >
        {{ item }}
      </button>
      <button
          @click="updatePage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="pagination-button pagination-button-next"
      >
        &gt;
      </button>
      <span class="pagination-go">
        Go
        <input
            v-model="goToPageInput"
            @keyup.enter="goToPage"
            type="number"
            min="1"
            :max="totalPages"
            class="pagination-input"
            placeholder="Type page"
        />
      </span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  padding: 0.5rem;

  .pagination-info {
    font-size: 0.875rem;
  }

  .pagination-controls {
    display: flex;
    align-items: center;
    gap: 0.25rem;

    .pagination-button {
      padding: 0.25rem 0.75rem; // Replaced px-3 py-1
      border: 1px solid #d1d5db; // Replaced border and border-gray-300
      border-radius: 0.25rem; // Replaced rounded
      background-color: #ffffff; // Replaced bg-white
      color: #1f2937; // Replaced text-gray-900
      font-size: 0.875rem;
      cursor: pointer;
      transition: background-color 0.2s;

      &:hover:not(:disabled) {
        background-color: #d1d5db;
      }

      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      &.pagination-button-active {
        background-color: #f97316; // Replaced bg-orange-500
        color: #ffffff; // Replaced text-white
        border-color: #f97316;
      }

      &.pagination-button-ellipsis {
        cursor: default; // Replaced cursor-default
        color: #d1d5db; // Replaced text-gray-300
        border-color: transparent;
        background-color: transparent;
      }

      &.pagination-button-prev,
      &.pagination-button-next {
        padding: 0.25rem 0.5rem;
      }
    }

    .pagination-go {
      margin-left: 1rem; // Replaced ml-30 (assuming 30px, adjusted to 1rem for consistency)
    }

    .pagination-input {
      width: 5.5rem;
      padding: 0.25rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      font-size: 0.875rem;

      &:focus {
        outline: none;
      }
    }

    .pagination-select {
      padding: 0.25rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      font-size: 0.875rem;
      background-color: #ffffff;
    }
  }
}
</style>