<template>
  <div class="card" :class="[isDark ? 'theme-dark' : 'theme-light']">
    <h2 class="card-title" :class="[isDark ? 'theme-dark' : 'theme-light']">
      <i class="fas fa-code mr-2 card-title-icon" :class="[isDark ? 'theme-dark' : 'theme-light']"></i>
      {{ skills?.title || '技术能力' }}
    </h2>
    <div class="flex flex-wrap gap-3">
      <div 
        v-for="ability in sortedAbilities" 
        :key="ability.name" 
        class="card-item group relative"
        :class="[isDark ? 'theme-dark' : 'theme-light']"
      >
        <i 
          :class="[getIconClass(ability.name)]"
          class="mr-2 transition-transform duration-300 group-hover:scale-110"
        ></i>
        <span class="card-text" :class="[isDark ? 'theme-dark' : 'theme-light']">{{ ability.name }}</span>
        <span 
          class="card-tooltip"
          :class="[isDark ? 'theme-dark' : 'theme-light']"
        >
          {{ getLevelText(ability.level) }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import iconMap from '../config/icons.yaml'
import { computed } from 'vue'

const props = defineProps({
  skills: {
    type: Object,
    default: () => ({})
  },
  isDark: {
    type: Boolean,
    default: false
  }
})

const defaultIconClass = 'fas fa-code text-gray-600'

const getIconClass = (abilityName) => {
  return iconMap[abilityName.toLowerCase()] || defaultIconClass
}

const getLevelText = (level) => {
  const levelMap = {
    '1': 'Beginner',
    '2': 'Intermediate',
    '3': 'Advanced',
    1: 'Beginner',
    2: 'Intermediate',
    3: 'Advanced'
  }
  return levelMap[level] || 'Unknown'
}

const sortedAbilities = computed(() => {
  if (!props.skills?.abilities) return []
  return [...props.skills.abilities].sort((a, b) => b.level - a.level)
})
</script>

<style scoped>
.card {
  @apply p-6 rounded-lg transition-colors duration-300;
}

.card-title {
  @apply text-2xl font-bold mb-4 flex items-center;
}

.card-title-icon {
  @apply mr-2;
}

.card-item {
  @apply flex items-center px-4 py-2 rounded-full;
}

.card-text {
  @apply text-gray-700;
}

.card-tooltip {
  @apply text-xs absolute bottom-full left-0 mb-1 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300;
}
</style>
