<template>
  <div 
    class="app-container"
    :class="[isDark ? 'theme-dark' : 'theme-light']"
  >
    <div class="app-content">
      <div v-if="error" class="app-error">
        {{ error }}
      </div>
      <div v-else-if="loading" class="app-loading">
        Loading...
      </div>
      <div v-else class="space-y-6">
        <!-- Theme Toggle Button -->
        <div v-if="profile.theme?.darkMode?.enabled" class="flex justify-end mb-4">
          <button 
            @click="toggleDarkMode" 
            class="theme-toggle-button"
            :class="[isDark ? 'theme-dark' : 'theme-light']"
          >
            <i 
              class="theme-toggle-icon fas"
              :class="isDark ? 'fa-sun' : 'fa-moon'"
            ></i>
          </button>
        </div>

        <!-- Profile Card -->
        <div>
          <ProfileCard :profile="profile.personal" :isDark="isDark" :config="profile" />
        </div>

        <!-- Main Content -->
        <div class="app-columns">
          <!-- Left Column -->
          <div class="app-column">
            <template v-for="card in leftColumnCards" :key="card.type">
              <AboutCard v-if="card.type === 'about'" :about="profile.about" :isDark="isDark" />
              <SkillsCard v-if="card.type === 'skills'" :skills="profile.skills" :isDark="isDark" />
              <ProjectsCard v-if="card.type === 'projects'" :projects="profile.projects" :isDark="isDark" />
              <EducationCard v-if="card.type === 'education'" :education="profile.education" :isDark="isDark" />
              <LinksCard v-if="card.type === 'links'" :links="profile.links" :isDark="isDark" :config="profile" />
            </template>
          </div>

          <!-- Right Column -->
          <div class="app-column">
            <template v-for="card in rightColumnCards" :key="card.type">
              <AboutCard v-if="card.type === 'about'" :about="profile.about" :isDark="isDark" />
              <SkillsCard v-if="card.type === 'skills'" :skills="profile.skills" :isDark="isDark" />
              <ProjectsCard v-if="card.type === 'projects'" :projects="profile.projects" :isDark="isDark" />
              <EducationCard v-if="card.type === 'education'" :education="profile.education" :isDark="isDark" />
              <LinksCard v-if="card.type === 'links'" :links="profile.links" :isDark="isDark" :config="profile" />
            </template>
          </div>
        </div>
      </div>
    </div>
    <Footer :config="profile" />
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
import { useAnalytics } from './composables/useAnalytics'
import profileData from './config/config.yaml'

const profile = ref(profileData)
const loading = ref(false)
const error = ref(null)

// Initialize dark mode
const { isDark } = useDarkMode(profile)

// Initialize analytics
useAnalytics(profile.value)

// Dark mode toggle handler
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
/* Remove existing styles */
</style>
