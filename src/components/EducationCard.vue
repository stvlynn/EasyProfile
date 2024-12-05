<template>
  <div class="card">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ education?.title || '教育经历' }}</h2>
    <div class="space-y-4">
      <div v-for="item in (education?.items || [])" :key="item.school" class="flex justify-between items-center">
        <div class="text-gray-800 font-medium">{{ item.school }}</div>
        <div class="text-gray-600">{{ item.time }}</div>
      </div>
      <div v-if="!(education?.items?.length)" class="text-gray-500 text-center py-4">
        暂无教育经历
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  education: {
    type: Object,
    default: () => ({})
  }
})
</script>
