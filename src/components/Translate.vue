<script setup>
import { ref, computed } from 'vue'

const showDropdown = ref(false)

const languages = [
  { code: 'ENG', flag: 'eng.svg' },
  { code: 'ARM', flag: 'arm.svg' },
  { code: 'RUS', flag: 'rus.svg' }
]

const selectedLanguage = ref(languages[0])

function toggleDropdown() {
  showDropdown.value = !showDropdown.value
}

function selectLanguage(lang) {
  selectedLanguage.value = lang
  showDropdown.value = false
}
function getImgUrl(filename) {
  return new URL(`../assets/images/flag/${filename}`, import.meta.url).href
}

const filteredLanguages = computed(() => {
  return languages.filter(lang => lang.code !== selectedLanguage.value.code)
})
</script>

<template>
  <div class="language-selector">
    <button @click="toggleDropdown" class="language-button">
      <img :src="getImgUrl(selectedLanguage.flag)" :alt="selectedLanguage.code" class="language-flag" />
      <span class="language-code text-gray-600">{{ selectedLanguage.code }}</span>
      <svg class="language-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <div v-if="showDropdown" class="language-dropdown">
      <ul>
        <li
            v-for="lang in filteredLanguages"
            :key="lang.code"
            @click="selectLanguage(lang)"
            class="language-option"
        >
          <img :src="getImgUrl(lang.flag)" :alt="lang.code" class="language-flag" />
          <span class="language-code text-gray-300">{{ lang.code }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.language-selector {
  position: relative;
  display: inline-block;
  text-align: left;

  .language-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background-color 0.2s;


    .language-flag {
      width: 1.25rem;
      height: 1.25rem;
    }

    .language-code {
      font-size: 0.875rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .language-arrow {
      width: 1rem;
      height: 1rem;
    }
  }

  .language-dropdown {
    position: absolute;
    margin-top: 0.5rem;
    width: 5rem;
    background-color: #FFFFFF;
    border-radius: 0.25rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    z-index: 10;

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      .language-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
        transition: background-color 0.2s;


        .language-flag {
          width: 1.5rem;
          height: 1.5rem;
        }

        .language-code {
          font-size: 0.875rem;
          font-weight: 500;
          text-transform: uppercase;
        }
      }
    }
  }
}
</style>