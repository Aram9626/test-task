<script setup>
defineProps({
  sortKey: {
    type: String,
  },
  sortOrder: {
    type: String,
  },
  column: {
    type: String,
  }
});
</script>

<template>
  <span class="sort-arrows">
    <span :class="{ 'active-arrow': sortKey === column && sortOrder === 'asc' }">▲</span>
    <span :class="{ 'active-arrow': sortKey === column && sortOrder === 'desc' }">▼</span>
  </span>
</template>

<style scoped lang="scss">
.sort-arrows {
  display: flex;
  flex-direction: column;
  margin-left: 2.5rem;

  span {
    color: #9ca3af;
    font-size: 0.8rem;
    line-height: 0.8;

    &.active-arrow {
      color: #000000;
    }
  }
}
</style>