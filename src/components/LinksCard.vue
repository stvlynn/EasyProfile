<template>
  <div class="card" :class="[isDark ? 'bg-gray-800 shadow-dark' : 'bg-white shadow-light']">
    <h2 class="text-2xl font-bold mb-4 flex items-center" :class="[isDark ? 'text-white' : 'text-gray-900']">
      <i class="fas fa-link mr-2" :class="[isDark ? 'text-gray-400' : 'text-gray-700']"></i>
      {{ links?.title || '链接' }}
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <a
        v-for="link in (links?.items || [])"
        :key="link.name"
        :href="link.url"
        target="_blank"
        class="link-card p-4 rounded-lg transition-colors duration-300 hover:scale-105 transform"
        :class="[isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100']"
      >
        <div class="flex items-center">
          <img
            :src="link.avatar"
            :alt="link.name"
            class="w-10 h-10 rounded-full object-cover"
            @error="handleImageError"
          />
          <span class="ml-3 font-medium" :class="[isDark ? 'text-gray-200' : 'text-gray-700']">
            {{ link.name }}
          </span>
        </div>
      </a>
      <div 
        v-if="!(links?.items?.length)" 
        class="text-center py-4 col-span-2"
        :class="[isDark ? 'text-gray-400' : 'text-gray-500']"
      >
        暂无链接
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  links: {
    type: Object,
    default: () => ({})
  },
  isDark: {
    type: Boolean,
    default: false
  }
})

const handleImageError = (e) => {
  e.target.src = '/assets/avatar.jpg'
}
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

.link-card {
  @apply flex items-center transition-all duration-300;
}
</style>
