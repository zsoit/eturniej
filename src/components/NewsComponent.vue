<script setup>
import { ref, onMounted } from 'vue'

const newsList = ref([])
const loading = ref(true)
const error = ref(null)

const fetchNews = async () => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8989';
    
    const response = await fetch(`${API_BASE_URL}/aktualnosci`)
    if (!response.ok) {
      throw new Error(`Błąd HTTP: ${response.status}`)
    }
    const result = await response.json()
    if (result.status === 'success') {
      newsList.value = result.data
    } else {
      throw new Error('API zwróciło nieudany status')
    }
  } catch (err) {
    error.value = err.message
    console.error('Nie udało się pobrać aktualności:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchNews()
})
</script>

<template>
  <div class="news-container">
    <div class="news-wrapper">
      
      <!-- Nagłówek sekcji w stylu Apple -->
      <div class="section-header">
        <h1 class="section-title">Aktualności</h1>
        <p class="section-subtitle">Śledź najnowsze informacje i fotorelacje z wydarzeń</p>
      </div>

      <!-- Stan ładowania -->
      <div v-if="loading" class="status-box">
        <div class="spinner"></div>
        <p>Ładowanie aktualności...</p>
      </div>

      <!-- Stan błędu -->
      <div v-else-if="error" class="status-box error">
        <p>Nie udało się załadować aktualności. Spróbuj ponownie później.</p>
        <span class="error-details">({{ error }})</span>
      </div>

      <!-- Brak danych -->
      <div v-else-if="newsList.length === 0" class="status-box">
        <p>Brak aktualności do wyświetlenia.</p>
      </div>

      <!-- Lista kafelków aktualności (Liquid Glass Cards) -->
      <div v-else class="news-grid">
        <article 
          v-for="item in newsList" 
          :key="item.id" 
          class="news-card"
        >
          <div class="card-content">
            <span class="news-date">{{ item.date_time }}</span>
            <h2 class="news-card-title">{{ item.title }}</h2>
            <p class="news-description">{{ item.description }}</p>
            
        <router-link :to="'/aktualnosci/' + item.id" class="news-link">
  Zobacz więcej 
  <span class="arrow">→</span>
</router-link>
          </div>
        </article>
      </div>

    </div>
  </div>
</template>



<style scoped>
@import '@/assets/css/news.css';

</style>