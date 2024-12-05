<template>
  <div class="card">
    <h2 class="text-2xl font-bold text-gray-900 mb-4">{{ about?.title || '个人简介' }}</h2>
    <p class="text-gray-600 leading-relaxed">{{ about?.description || '暂无描述' }}</p>
  </div>
</template>

<script setup>
defineProps({
  about: {
    type: Object,
    default: () => ({})
  }
})
</script>
