<template>
  <div class="card">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ skills?.title || '技术能力' }}</h2>
    <div class="flex flex-wrap gap-3">
      <div 
        v-for="ability in (skills?.abilities || [])" 
        :key="ability.name" 
        class="flex items-center bg-gray-100 rounded-full px-4 py-2 group relative"
      >
        <i 
          :class="getIconClass(ability.name)" 
          class="mr-2 transition-transform duration-300 group-hover:scale-110"
        ></i>
        <span class="text-gray-700 mr-2">{{ ability.name }}</span>
        <span 
          class="text-xs text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute bottom-full left-0 bg-gray-200 px-2 py-1 rounded"
        >
          {{ ability.level }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  skills: {
    type: Object,
    default: () => ({})
  }
})

const getIconClass = (abilityName) => {
  const iconMap = {
    vuejs: 'fab fa-vuejs text-green-600',
    react: 'fab fa-react text-blue-500',
    angular: 'fab fa-angular text-red-600',
    nodejs: 'fab fa-node-js text-green-700',
    python: 'fab fa-python text-blue-600',
    java: 'fab fa-java text-red-500',
    cpp: 'fas fa-code text-blue-800',
    golang: 'fas fa-code text-blue-500',
    docker: 'fab fa-docker text-blue-600',
    kubernetes: 'fas fa-dharmachakra text-blue-600',
    linux: 'fab fa-linux text-gray-800',
    llm: 'fas fa-robot text-purple-600',
    swift: 'fab fa-swift text-orange-500'
  }

  return iconMap[abilityName.toLowerCase()] || 'fas fa-code text-gray-600'
}
</script>

<style scoped>
.group:hover .absolute {
  visibility: visible;
}
</style>
