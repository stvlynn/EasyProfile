<template>
  <div class="fixed top-4 right-4 z-50">
    <button 
      @click="toggleDarkMode" 
      class="bg-gray-200 dark:bg-gray-700 p-2 rounded-full transition-colors duration-300"
    >
      <i 
        :class="isDarkMode ? 'fa-moon' : 'fa-sun'" 
        class="fas text-gray-800 dark:text-yellow-300"
      ></i>
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const props = defineProps({
  config: {
    type: Object,
    default: () => ({
      enabled: true,
      auto_detect: true,
      detection_method: 'system',
      time_range: { start: '20:00', end: '06:00' },
      default_theme: 'light'
    })
  }
})

const isDarkMode = ref(false)

const applyDarkMode = (dark) => {
  if (dark) {
    document.documentElement.classList.add('dark')
    isDarkMode.value = true
  } else {
    document.documentElement.classList.remove('dark')
    isDarkMode.value = false
  }
}

const toggleDarkMode = () => {
  applyDarkMode(!isDarkMode.value)
}

const checkSystemTheme = () => {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

const checkTimeBasedTheme = () => {
  const now = new Date()
  const currentTime = now.getHours() * 60 + now.getMinutes()
  
  const [startHour, startMinute] = props.config.time_range.start.split(':').map(Number)
  const [endHour, endMinute] = props.config.time_range.end.split(':').map(Number)
  
  const startTime = startHour * 60 + startMinute
  const endTime = endHour * 60 + endMinute
  
  // Handle time range crossing midnight
  if (startTime > endTime) {
    return currentTime >= startTime || currentTime <= endTime
  }
  
  return currentTime >= startTime && currentTime <= endTime
}

const detectDarkMode = () => {
  if (!props.config.enabled) {
    applyDarkMode(props.config.default_theme === 'dark')
    return
  }

  if (!props.config.auto_detect) {
    applyDarkMode(props.config.default_theme === 'dark')
    return
  }

  let shouldBeDark = false
  
  if (props.config.detection_method === 'system') {
    shouldBeDark = checkSystemTheme()
  } else if (props.config.detection_method === 'time') {
    shouldBeDark = checkTimeBasedTheme()
  }

  applyDarkMode(shouldBeDark)
}

onMounted(() => {
  detectDarkMode()

  // Listen for system theme changes
  if (props.config.detection_method === 'system') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    mediaQuery.addListener(detectDarkMode)
  }
})
</script>
