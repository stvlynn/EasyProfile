<template>
  <div class="card" :class="[isDark ? 'bg-gray-800 shadow-dark' : 'bg-white shadow-light']">
    <div class="flex flex-col sm:flex-row items-center justify-center">
      <div class="flex-shrink-0 mb-4 sm:mb-0">
        <img
          :src="profile?.avatar || '/assets/avatar.jpg'"
          :alt="profile?.name || 'Profile Avatar'"
          class="w-32 h-32 rounded-full object-cover border-4"
          :class="[isDark ? 'border-gray-700' : 'border-white']"
          @error="handleImageError"
        />
      </div>
      <div class="sm:ml-6 text-center">
        <h1 class="text-3xl font-bold" :class="[isDark ? 'text-white' : 'text-gray-900']">
          {{ profile?.name || 'Your Name' }}
        </h1>
        <p class="mt-2 text-lg" :class="[isDark ? 'text-gray-300' : 'text-gray-600']">
          {{ profile?.description || 'Your Description' }}
        </p>
        <div class="mt-4 space-y-2">
          <div v-if="profile?.email" class="flex items-center justify-center">
            <i class="fas fa-envelope" :class="[isDark ? 'text-gray-400' : 'text-gray-500']"></i>
            <a :href="'mailto:' + profile.email" class="ml-2 hover:text-primary transition-colors duration-300"
              :class="[isDark ? 'text-gray-300' : 'text-gray-600']">
              {{ profile.email }}
            </a>
          </div>
          <div v-if="profile?.phone" class="flex items-center justify-center">
            <i class="fas fa-phone" :class="[isDark ? 'text-gray-400' : 'text-gray-500']"></i>
            <a :href="'tel:' + profile.phone" class="ml-2 hover:text-primary transition-colors duration-300"
              :class="[isDark ? 'text-gray-300' : 'text-gray-600']">
              {{ profile.phone }}
            </a>
          </div>
        </div>
        <div class="mt-4 flex justify-center space-x-4 flex-wrap">
          <a
            v-if="profile?.social?.github"
            :href="'https://github.com/' + profile.social.github"
            target="_blank"
            class="social-link transition-colors duration-300"
            :class="[isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900']"
          >
            <i class="fab fa-github text-xl"></i>
          </a>
          <a
            v-if="profile?.social?.twitter"
            :href="'https://twitter.com/' + profile.social.twitter"
            target="_blank"
            class="social-link transition-colors duration-300"
            :class="[isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900']"
          >
            <i class="fab fa-twitter text-xl"></i>
          </a>
          <a
            v-if="profile?.social?.linkedin"
            :href="'https://linkedin.com/in/' + profile.social.linkedin"
            target="_blank"
            class="social-link transition-colors duration-300"
            :class="[isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900']"
          >
            <i class="fab fa-linkedin text-xl"></i>
          </a>
          <a
            v-if="profile?.social?.facebook"
            :href="'https://facebook.com/' + profile.social.facebook"
            target="_blank"
            class="social-link transition-colors duration-300"
            :class="[isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900']"
          >
            <i class="fab fa-facebook text-xl"></i>
          </a>
          <a
            v-if="profile?.social?.telegram"
            :href="'https://t.me/' + profile.social.telegram"
            target="_blank"
            class="social-link transition-colors duration-300"
            :class="[isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900']"
          >
            <i class="fab fa-telegram text-xl"></i>
          </a>
          <a
            v-if="profile?.social?.instagram"
            :href="'https://instagram.com/' + profile.social.instagram"
            target="_blank"
            class="social-link transition-colors duration-300"
            :class="[isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900']"
          >
            <i class="fab fa-instagram text-xl"></i>
          </a>
          <a
            v-if="profile?.social?.youtube"
            :href="'https://youtube.com/@' + profile.social.youtube"
            target="_blank"
            class="social-link transition-colors duration-300"
            :class="[isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900']"
          >
            <i class="fab fa-youtube text-xl"></i>
          </a>
          <a
            v-if="profile?.social?.medium"
            :href="'https://medium.com/@' + profile.social.medium"
            target="_blank"
            class="social-link transition-colors duration-300"
            :class="[isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900']"
          >
            <i class="fab fa-medium text-xl"></i>
          </a>
          <a
            v-if="profile?.social?.reddit"
            :href="'https://reddit.com/user/' + profile.social.reddit"
            target="_blank"
            class="social-link transition-colors duration-300"
            :class="[isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900']"
          >
            <i class="fab fa-reddit text-xl"></i>
          </a>
          <a
            v-if="profile?.social?.discord"
            :href="'https://discord.com/users/' + profile.social.discord"
            target="_blank"
            class="social-link transition-colors duration-300"
            :class="[isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900']"
          >
            <i class="fab fa-discord text-xl"></i>
          </a>
          <a
            v-if="profile?.social?.weibo"
            :href="'https://weibo.com/' + profile.social.weibo"
            target="_blank"
            class="social-link transition-colors duration-300"
            :class="[isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900']"
          >
            <i class="fab fa-weibo text-xl"></i>
          </a>
          <a
            v-if="profile?.social?.zhihu"
            :href="'https://zhihu.com/people/' + profile.social.zhihu"
            target="_blank"
            class="social-link transition-colors duration-300"
            :class="[isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900']"
          >
            <i class="fas fa-book-reader text-xl"></i>
          </a>
          <a
            v-if="profile?.social?.bilibili"
            :href="'https://space.bilibili.com/' + profile.social.bilibili"
            target="_blank"
            class="social-link transition-colors duration-300"
            :class="[isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900']"
          >
            <i class="fab fa-bilibili text-xl"></i>
          </a>
          <a
            v-if="profile?.social?.huggingface"
            :href="'https://huggingface.co/' + profile.social.huggingface"
            target="_blank"
            class="social-link transition-colors duration-300"
            :class="[isDark ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-900']"
          >
            <i class="fi fi-ss-face-smiling-hands text-xl"></i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  profile: {
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

const handleImageError = (e) => {
  e.target.src = props.config.personal.avatar
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

.social-link {
  @apply p-2 rounded-full hover:bg-opacity-20 transition-all duration-300;
}
</style>
