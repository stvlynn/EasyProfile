<template>
  <footer class="w-full flex flex-col items-center justify-center py-8 mt-8">
    <div class="flex flex-wrap justify-center items-center gap-4">
      <!-- GitHub Stars -->
      <a :href="`https://github.com/${config.site.repo}`" target="_blank" rel="noopener noreferrer">
        <img :alt="`GitHub Repo stars`" :src="`https://img.shields.io/github/stars/${config.site.repo}?style=flat&logo=github`">
      </a>

      <!-- Buy Me A Coffee -->
      <a v-if="config.site.badges?.buymeacoffee?.slug" 
         :href="`https://www.buymeacoffee.com/${config.site.badges.buymeacoffee.slug}`" 
         target="_blank" 
         rel="noopener noreferrer">
        <img src="https://img.shields.io/badge/Buy%20Me%20A%20Coffee-☕-yellow?style=flat" 
             alt="Buy Me A Coffee">
      </a>

      <!-- Twitter Follow -->
      <a v-if="config.site.badges?.twitter?.username" 
         :href="`https://twitter.com/${config.site.badges.twitter.username}`" 
         target="_blank" 
         rel="noopener noreferrer">
        <img :alt="`X (formerly Twitter) Follow`" 
             :src="`https://img.shields.io/twitter/follow/${config.site.badges.twitter.username}`">
      </a>
    </div>
  </footer>
</template>

<script setup>
const props = defineProps({
  config: {
    type: Object,
    required: true
  }
})
</script>
