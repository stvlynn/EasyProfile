<template>
  <div class="card">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ skills?.title || '技术能力' }}</h2>
    <div class="flex flex-wrap gap-3">
      <div v-for="ability in (skills?.abilities || [])" :key="ability" class="flex items-center bg-gray-100 rounded-full px-4 py-2">
        <i :class="getIconClass(ability)" class="mr-2"></i>
        <span class="text-gray-700">{{ ability }}</span>
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

const getIconClass = (ability) => {
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
    kubernetes: 'fas fa-dharmachakra text-blue-600'
  }

  return iconMap[ability.toLowerCase()] || 'fas fa-code text-gray-600'
}
</script>
