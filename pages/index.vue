<template>
  <div class="">
    Mjx-data-1
    {{ getData }}
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const getData = ref(null)

// const { data, code } = await useHttpPost('/') // 调用 API
// getData.value = data // 更新数据
</script>

<style scoped></style>
