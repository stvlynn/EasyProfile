<template>
  <div class="card" :class="[isDark ? 'theme-dark' : 'theme-light']">
    <h2 class="card-title" :class="[isDark ? 'theme-dark' : 'theme-light']">
      <i class="fas fa-user-circle mr-2 card-title-icon" :class="[isDark ? 'theme-dark' : 'theme-light']"></i>
      {{ about?.title || '关于我' }}
    </h2>
    <div class="space-y-4">
      <p 
        class="card-text transition-colors duration-300"
        :class="[isDark ? 'theme-dark' : 'theme-light']"
      >
        {{ about?.description || '暂无内容' }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  about: {
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
