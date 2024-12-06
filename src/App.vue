<template>
  <div class="min-h-screen bg-light-primary dark:bg-dark-primary text-light-primary dark:text-dark-primary transition-colors duration-300">
    <DarkModeToggle :config="darkModeConfig" />
    <div class="max-w-7xl mx-auto">
      <div v-if="error" class="text-red-500 text-center py-4">
        {{ error }}
      </div>
      <div v-else-if="loading" class="text-center py-4">
        Loading...
      </div>
      <div v-else class="space-y-6">
        <!-- Profile Card (固定在顶部) -->
        <div>
          <ProfileCard :profile="profile.personal" />
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-6">
            <template v-for="card in leftColumnCards" :key="card.type">
              <AboutCard v-if="card.type === 'about'" :about="profile.about" />
              <SkillsCard v-if="card.type === 'skills'" :skills="profile.skills" />
              <ProjectsCard v-if="card.type === 'projects'" :projects="profile.projects" />
              <EducationCard v-if="card.type === 'education'" :education="profile.education" />
              <LinksCard v-if="card.type === 'links'" :links="profile.links" />
            </template>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <template v-for="card in rightColumnCards" :key="card.type">
              <AboutCard v-if="card.type === 'about'" :about="profile.about" />
              <SkillsCard v-if="card.type === 'skills'" :skills="profile.skills" />
              <ProjectsCard v-if="card.type === 'projects'" :projects="profile.projects" />
              <EducationCard v-if="card.type === 'education'" :education="profile.education" />
              <LinksCard v-if="card.type === 'links'" :links="profile.links" />
            </template>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import yaml from 'js-yaml'
import ProfileCard from './components/ProfileCard.vue'
import AboutCard from './components/AboutCard.vue'
import SkillsCard from './components/SkillsCard.vue'
import ProjectsCard from './components/ProjectsCard.vue'
import EducationCard from './components/EducationCard.vue'
import LinksCard from './components/LinksCard.vue'
import DarkModeToggle from './components/DarkModeToggle.vue'
import profileData from './config/profile.yaml'

const profile = ref(profileData)
const loading = ref(false)
const error = ref(null)
const darkModeConfig = ref({})

onMounted(async () => {
  try {
    // Extract dark mode config
    darkModeConfig.value = profileData.dark_mode || {}
  } catch (error) {
    console.error('Error loading configuration:', error)
  }
})

// 获取所有卡片配置
const cards = computed(() => {
  const cardConfigs = [
    { type: 'about', data: profile.value.about },
    { type: 'skills', data: profile.value.skills },
    { type: 'projects', data: profile.value.projects },
    { type: 'education', data: profile.value.education },
    { type: 'links', data: profile.value.links }
  ]
  .filter(card => card.data && card.data.position !== undefined && card.data.position > 0) // 只保留有position且大于0的卡片
  .sort((a, b) => a.data.position - b.data.position) // 按position排序

  return cardConfigs
})

// 左列卡片
const leftColumnCards = computed(() => {
  return cards.value.filter(card => card.data.position % 2 === 1)
})

// 右列卡片
const rightColumnCards = computed(() => {
  return cards.value.filter(card => card.data.position % 2 === 0)
})
</script>

<style>
/* Global dark mode transitions */
body {
  @apply transition-colors duration-300;
}
</style>
