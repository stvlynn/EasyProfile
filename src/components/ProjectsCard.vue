<template>
  <div class="card" :class="[isDark ? 'theme-dark' : 'theme-light']">
    <h2 class="card-title" :class="[isDark ? 'theme-dark' : 'theme-light']">
      <i class="fas fa-project-diagram mr-2 card-title-icon" :class="[isDark ? 'theme-dark' : 'theme-light']"></i>
      {{ projects?.title || '项目' }}
    </h2>
    <div class="space-y-6">
      <div 
        v-for="project in (projects?.items || [])" 
        :key="project.title" 
        class="pb-4 last:pb-0 border-b last:border-0 transition-colors duration-300"
        :class="[isDark ? 'border-gray-700' : 'border-gray-200']"
      >
        <h3 class="text-xl font-semibold card-text" :class="[isDark ? 'theme-dark' : 'theme-light']">
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
        <p class="mt-2 card-text" :class="[isDark ? 'theme-dark' : 'theme-light']">
          {{ project.description }}
        </p>
        <div class="mt-3 flex flex-wrap">
          <span 
            v-for="tag in (project.tags || [])" 
            :key="tag" 
            class="tag transition-colors duration-300 flex items-center"
            :class="[isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700']"
          >
            <i 
              v-if="getIconClass(tag) !== defaultIconClass"
              :class="getIconClass(tag)"
              class="mr-1"
            ></i>
            {{ tag }}
          </span>
        </div>
      </div>
      <div 
        v-if="!(projects?.items?.length)" 
        class="text-center py-4 card-text"
        :class="[isDark ? 'theme-dark' : 'theme-light']"
      >
        暂无项目
      </div>
    </div>
  </div>
</template>

<script setup>
import iconMap from '../config/icons.yaml'

const defaultIconClass = 'fas fa-code text-gray-600'

defineProps({
  projects: {
    type: Object,
    default: () => ({})
  },
  isDark: {
    type: Boolean,
    default: false
  }
})

const getIconClass = (tag) => {
  return iconMap[tag.toLowerCase()] || defaultIconClass
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

.tag {
  @apply px-3 py-1 text-sm rounded-full mr-2 mb-2;
}
</style>
