<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const newsId = route.params.id

const newsArticle = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchArticle = async () => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8989';
    
    const response = await fetch(`${API_BASE_URL}/aktualnosci/${newsId}`)
    if (!response.ok) {
      throw new Error(`Błąd HTTP: ${response.status}`)
    }
    const result = await response.json()
    if (result.status === 'success') {
      // Obsługujemy przypadek gdy API zwraca obiekt bezpośrednio lub w tablicy
      newsArticle.value = Array.isArray(result.data) ? result.data[0] : result.data
    } else {
      throw new Error('Nie udało się pobrać artykułu')
    }
  } catch (err) {
    error.value = err.message
    console.error('Błąd pobierania artykułu:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchArticle()
})
</script>

<template>
  <div class="news-single-container">
    <div class="news-single-wrapper">
      
      <!-- Przycisk powrotu do listy -->
      <router-link to="/aktualnosci" class="back-btn">
        ← Powrót do aktualności
      </router-link>

      <!-- Stan ładowania -->
      <div v-if="loading" class="status-box">
        <div class="spinner"></div>
        <p>Ładowanie artykułu...</p>
      </div>

      <!-- Stan błędu -->
      <div v-else-if="error" class="status-box error">
        <p>Nie znaleziono wybranego artykułu.</p>
        <span class="error-details">({{ error }})</span>
      </div>

      <!-- Pełna treść artykułu w stylu Liquid Glass -->
      <article v-else-if="newsArticle" class="article-card">
        <header class="article-header">
          <span class="article-date">{{ newsArticle.date_time }}</span>
          <h1 class="article-title">{{ newsArticle.title }}</h1>
        </header>

        <div class="article-divider"></div>

        <div class="article-body">
          <p class="article-description">{{ newsArticle.description }}</p>
          
          <!-- Jeśli Twoje API zwraca pełny tekst/HTML (np. content) -->
          <div v-if="newsArticle.content" class="article-content" v-html="newsArticle.content"></div>
        </div>
      </article>

    </div>
  </div>
</template>

<style scoped>
@import '@/assets/css/newspage.css';
</style>