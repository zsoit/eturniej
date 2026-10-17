<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
  <div class="page-container">
    <h1>Błąd 404: {{ route.path }}</h1>
    <p>Nie znaleziono strony.</p>
  </div>
</template>

<style scoped>
.page-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
  color: #fff;
}
</style>