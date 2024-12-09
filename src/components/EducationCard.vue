<template>
  <div class="card" :class="[isDark ? 'theme-dark' : 'theme-light']">
    <h2 class="card-title" :class="[isDark ? 'theme-dark' : 'theme-light']">
      <i class="fas fa-graduation-cap mr-2 card-title-icon" :class="[isDark ? 'theme-dark' : 'theme-light']"></i>
      {{ education?.title || '教育经历' }}
    </h2>
    <div class="space-y-4">
      <div v-for="item in (education?.items || [])" :key="item.school" class="flex justify-between items-center">
        <span class="card-text font-medium" :class="[isDark ? 'theme-dark' : 'theme-light']">{{ item.school }}</span>
        <span class="card-text text-sm" :class="[isDark ? 'theme-dark' : 'theme-light']">{{ item.time }}</span>
      </div>
      <div v-if="!(education?.items?.length)" class="text-center py-4 card-text" :class="[isDark ? 'theme-dark' : 'theme-light']">
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
</style>
