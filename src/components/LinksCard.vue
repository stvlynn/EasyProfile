<template>
  <div class="card">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ links?.title || '链接' }}</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <a
        v-for="link in (links?.items || [])"
        :key="link.name"
        :href="link.url"
        target="_blank"
        class="link-card"
      >
        <img
          :src="link.avatar"
          :alt="link.name"
          class="w-10 h-10 rounded-full object-cover"
          @error="handleImageError"
        />
        <span class="ml-3 text-gray-700 font-medium">{{ link.name }}</span>
      </a>
      <div v-if="!(links?.items?.length)" class="text-gray-500 text-center py-4 col-span-2">
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
  }
})

const handleImageError = (e) => {
  e.target.src = '/assets/avatar.jpg'
}
</script>
