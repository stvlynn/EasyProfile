<template>
  <div class="card" :class="[isDark ? 'theme-dark' : 'theme-light']">
    <h2 class="card-title" :class="[isDark ? 'theme-dark' : 'theme-light']">
      <i class="fas fa-link mr-2 card-title-icon" :class="[isDark ? 'theme-dark' : 'theme-light']"></i>
      {{ links?.title || '链接' }}
    </h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <a
        v-for="link in (links?.items || [])"
        :key="link.name"
        :href="link.url"
        target="_blank"
        class="link-card p-4 rounded-lg transition-all duration-300 hover:scale-105 transform"
        :class="[isDark ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100']"
      >
        <div class="flex items-center">
          <img
            :src="link.avatar"
            :alt="link.name"
            class="w-10 h-10 rounded-full object-cover"
            @error="handleImageError"
          />
          <span class="ml-3 font-medium card-text" :class="[isDark ? 'theme-dark' : 'theme-light']">
            {{ link.name }}
          </span>
        </div>
      </a>
      <div 
        v-if="!(links?.items?.length)" 
        class="text-center py-4 col-span-2 card-text"
        :class="[isDark ? 'theme-dark' : 'theme-light']"
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
  },
  config: {
    type: Object,
    default: () => ({})
  }
})

function handleImageError(e) {
  e.target.src = props.config.personal.avatar
}
</script>

<style scoped>
.card {
  @apply p-6 rounded-lg transition-colors duration-300;
}

.link-card {
  @apply flex items-center transition-all duration-300;
}
</style>
