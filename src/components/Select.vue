<script setup>
import { ref, watch } from 'vue';

const props = defineProps({
  modelValue: {
    type: String,
  },
  options: {
    type: Array,
    default: () => [],
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const selectedValue = ref(props.modelValue);

watch(selectedValue, (newValue) => {
  emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue) => {
  selectedValue.value = newValue;
});
</script>

<template>
  <select v-model="selectedValue" class="search-select">
    <option :value="''" disabled selected hidden>{{ placeholder }}</option>
    <option v-for="option in options" :key="option.value" :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<style lang="scss" scoped>
.search-select {
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  padding: 0.25rem;
  font-size: 0.875rem;
  background-color: #ffffff;

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
  }
}
</style>