<template>
  <div class="card" :class="[isDark ? 'bg-gray-800 shadow-dark' : 'bg-white shadow-light']">
    <h2 class="text-2xl font-bold mb-4 flex items-center" :class="[isDark ? 'text-white' : 'text-gray-900']">
      <i class="fas fa-user-circle mr-2" :class="[isDark ? 'text-gray-400' : 'text-gray-700']"></i>
      {{ about?.title || '关于我' }}
    </h2>
    <div class="space-y-4">
      <p 
        class="transition-colors duration-300"
        :class="[isDark ? 'text-gray-300' : 'text-gray-600']"
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

.shadow-light {
  @apply shadow-lg;
}

.shadow-dark {
  @apply shadow-lg shadow-gray-900/50;
}
</style>
