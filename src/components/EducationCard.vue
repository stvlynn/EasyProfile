<template>
  <div class="card" :class="[isDark ? 'bg-gray-800 shadow-dark' : 'bg-white shadow-light']">
    <h2 class="text-2xl font-bold mb-4 flex items-center" :class="[isDark ? 'text-white' : 'text-gray-900']">
      <i class="fas fa-graduation-cap mr-2" :class="[isDark ? 'text-gray-400' : 'text-gray-700']"></i>
      {{ education?.title || '教育经历' }}
    </h2>
    <div class="space-y-4">
      <div v-for="item in (education?.items || [])" :key="item.school" class="flex justify-between items-center">
        <span class="font-medium" :class="[isDark ? 'text-gray-300' : 'text-gray-700']">{{ item.school }}</span>
        <span class="text-sm" :class="[isDark ? 'text-gray-400' : 'text-gray-500']">{{ item.time }}</span>
      </div>
      <div v-if="!(education?.items?.length)" class="text-center py-4" :class="[isDark ? 'text-gray-400' : 'text-gray-500']">
        暂无教育经历
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  education: {
    type: Object,
    default: () => ({})
  },
  isDark: {
    type: Boolean,
    default: false
  }
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
