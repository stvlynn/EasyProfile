import { onMounted } from 'vue'

export function useAnalytics(config) {
  const trackPageView = () => {
    if (config.site.analytics?.google?.enabled && 
        config.site.analytics?.google?.id && 
        window.gtag) {
      window.gtag('config', config.site.analytics.google.id, {
        page_path: window.location.pathname
      })
    }
  }

  // Track initial page view
  onMounted(() => {
    trackPageView()
  })
}
