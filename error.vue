<script setup lang="ts">
const props = defineProps({
  error: Object as () => NuxtError,
})
</script>

<template>
  <div class="text-center">
    <h1>{{ error.statusCode }}</h1>
    <p>{{ error.message }}</p>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>
