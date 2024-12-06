import { ref, watch, onMounted } from 'vue'

export function useDarkMode(config) {
  const isDark = ref(false)

  const isInTimeRange = () => {
    if (!config.darkMode.timeRange) return false
    
    const now = new Date()
    const currentTime = now.getHours() * 60 + now.getMinutes()
    
    const [startHour, startMinute] = config.darkMode.timeRange.start.split(':').map(Number)
    const [endHour, endMinute] = config.darkMode.timeRange.end.split(':').map(Number)
    
    const startTime = startHour * 60 + startMinute
    const endTime = endHour * 60 + endMinute
    
    if (startTime > endTime) {
      // Time range crosses midnight
      return currentTime >= startTime || currentTime <= endTime
    } else {
      return currentTime >= startTime && currentTime <= endTime
    }
  }

  const updateDarkMode = () => {
    if (!config.darkMode.enabled) {
      isDark.value = false
      return
    }

    if (!config.darkMode.auto) {
      isDark.value = true
      return
    }

    if (config.darkMode.type === 'system') {
      isDark.value = window.matchMedia('(prefers-color-scheme: dark)').matches
    } else if (config.darkMode.type === 'time') {
      isDark.value = isInTimeRange()
    }
  }

  // Watch for system dark mode changes
  onMounted(() => {
    if (config.darkMode.type === 'system') {
      window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', updateDarkMode)
    }

    // Initial check
    updateDarkMode()

    // Set up interval for time-based dark mode
    if (config.darkMode.type === 'time') {
      setInterval(updateDarkMode, 60000) // Check every minute
    }
  })

  // Watch for config changes
  watch(() => config.darkMode, updateDarkMode, { deep: true })

  return {
    isDark,
    updateDarkMode
  }
}
