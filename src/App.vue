<template>
  <div 
    class="min-h-screen py-6 px-4 sm:px-6 lg:px-8 transition-colors duration-300"
    :class="[isDark ? 'bg-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900']"
  >
    <div class="max-w-7xl mx-auto">
      <div v-if="error" class="text-red-500 text-center py-4">
        {{ error }}
      </div>
      <div v-else-if="loading" class="text-center py-4">
        Loading...
      </div>
      <div v-else class="space-y-6">
        <!-- Theme Toggle Button -->
        <div v-if="profile.theme?.darkMode?.enabled" class="flex justify-end mb-4">
          <button 
            @click="toggleDarkMode" 
            class="p-2 rounded-full hover:bg-opacity-20"
            :class="[isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-200']"
          >
            <i 
              class="fas text-xl"
              :class="isDark ? 'fa-sun text-yellow-400' : 'fa-moon text-gray-600'"
            ></i>
          </button>
        </div>

        <!-- Profile Card -->
        <div>
          <ProfileCard :profile="profile.personal" :isDark="isDark" />
        </div>

        <!-- Main Content -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <!-- Left Column -->
          <div class="space-y-6">
            <template v-for="card in leftColumnCards" :key="card.type">
              <AboutCard v-if="card.type === 'about'" :about="profile.about" :isDark="isDark" />
              <SkillsCard v-if="card.type === 'skills'" :skills="profile.skills" :isDark="isDark" />
              <ProjectsCard v-if="card.type === 'projects'" :projects="profile.projects" :isDark="isDark" />
              <EducationCard v-if="card.type === 'education'" :education="profile.education" :isDark="isDark" />
              <LinksCard v-if="card.type === 'links'" :links="profile.links" :isDark="isDark" />
            </template>
          </div>

          <!-- Right Column -->
          <div class="space-y-6">
            <template v-for="card in rightColumnCards" :key="card.type">
              <AboutCard v-if="card.type === 'about'" :about="profile.about" :isDark="isDark" />
              <SkillsCard v-if="card.type === 'skills'" :skills="profile.skills" :isDark="isDark" />
              <ProjectsCard v-if="card.type === 'projects'" :projects="profile.projects" :isDark="isDark" />
              <EducationCard v-if="card.type === 'education'" :education="profile.education" :isDark="isDark" />
              <LinksCard v-if="card.type === 'links'" :links="profile.links" :isDark="isDark" />
            </template>
          </div>
        </div>
      </div>
    </div>
    <Footer :config="config" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import config from './config/config.yaml'
import ProfileCard from './components/ProfileCard.vue'
import AboutCard from './components/AboutCard.vue'
import SkillsCard from './components/SkillsCard.vue'
import ProjectsCard from './components/ProjectsCard.vue'
import EducationCard from './components/EducationCard.vue'
import LinksCard from './components/LinksCard.vue'
import Footer from './components/Footer.vue'
import { useDarkMode } from './composables/useDarkMode'
import profileData from './config/config.yaml'

const profile = ref(profileData)
const loading = ref(false)
const error = ref(null)

// Dark mode setup
const { isDark, updateDarkMode } = useDarkMode(profile.value)

const toggleDarkMode = () => {
  if (profile.value.theme?.darkMode?.auto) {
    // If auto mode is enabled, disable it first
    profile.value.theme.darkMode.auto = false
  }
  isDark.value = !isDark.value
}

// Get all card configurations
const cards = computed(() => {
  const cardConfigs = [
    { type: 'about', data: profile.value.about },
    { type: 'skills', data: profile.value.skills },
    { type: 'projects', data: profile.value.projects },
    { type: 'education', data: profile.value.education },
    { type: 'links', data: profile.value.links }
  ]
  .filter(card => card.data && card.data.position !== undefined && card.data.position > 0)
  .sort((a, b) => a.data.position - b.data.position)

  return cardConfigs
})

// Left column cards
const leftColumnCards = computed(() => {
  return cards.value.filter(card => card.data.position % 2 === 1)
})

// Right column cards
const rightColumnCards = computed(() => {
  return cards.value.filter(card => card.data.position % 2 === 0)
})
</script>

<style>
.dark {
  @apply bg-gray-900 text-gray-100;
}

.light {
  @apply bg-gray-100 text-gray-900;
}
</style>
