<template>
  <div class="card">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ projects?.title || '项目' }}</h2>
    <div class="space-y-6">
      <div v-for="project in (projects?.items || [])" :key="project.title" class="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
        <h3 class="text-xl font-semibold text-gray-800">
          <a 
            v-if="project.link" 
            :href="project.link" 
            target="_blank" 
            class="hover:text-primary transition-colors duration-300"
          >
            {{ project.title }}
          </a>
          <span v-else>{{ project.title }}</span>
        </h3>
        <p class="mt-2 text-gray-600">{{ project.description }}</p>
        <div class="mt-3 flex flex-wrap">
          <span v-for="tag in (project.tags || [])" :key="tag" class="tag">
            {{ tag }}
          </span>
        </div>
      </div>
      <div v-if="!(projects?.items?.length)" class="text-gray-500 text-center py-4">
        暂无项目
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  projects: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped>
.tag {
  @apply bg-gray-200 text-gray-700 px-2 py-1 rounded-md text-sm mr-2 mb-2;
}
</style>
