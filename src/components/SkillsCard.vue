<template>
  <div class="card" :class="[isDark ? 'bg-gray-800 shadow-dark' : 'bg-white shadow-light']">
    <h2 class="text-2xl font-bold mb-4 flex items-center" :class="[isDark ? 'text-white' : 'text-gray-900']">
      <i class="fas fa-code mr-2" :class="[isDark ? 'text-gray-400' : 'text-gray-700']"></i>
      {{ skills?.title || '技术能力' }}
    </h2>
    <div class="flex flex-wrap gap-3">
      <div 
        v-for="ability in sortedAbilities" 
        :key="ability.name" 
        class="flex items-center px-4 py-2 rounded-full group relative transition-colors duration-300"
        :class="[isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200']"
      >
        <i 
          :class="[getIconClass(ability.name), isDark ? 'text-gray-300' : 'text-gray-700']"
          class="mr-2 transition-transform duration-300 group-hover:scale-110"
        ></i>
        <span :class="[isDark ? 'text-gray-300' : 'text-gray-700']">{{ ability.name }}</span>
        <span 
          class="text-xs absolute bottom-full left-0 mb-1 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-300"
          :class="[isDark ? 'bg-gray-600 text-gray-300' : 'bg-gray-200 text-gray-700']"
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

.shadow-light {
  @apply shadow-lg;
}

.shadow-dark {
  @apply shadow-lg shadow-gray-900/50;
}
</style>
