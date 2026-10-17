<template>
  <div class="rules-page-container">
    <div class="rules-wrapper">
      
      <!-- Przycisk powrotu -->
      <router-link to="/" class="back-btn">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Wróć
      </router-link>

      <!-- Stan ładowania -->
      <div v-if="isLoading" class="status-box">
        <div class="spinner"></div>
        <span>Ładowanie regulaminu...</span>
      </div>

      <!-- Komunikat o błędzie -->
      <div v-else-if="error" class="status-box error">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>{{ error }}</span>
      </div>

      <!-- Treść regulaminu -->
      <article v-else-if="regulamin" class="article-card">
        <header>
          <div class="article-date">Aktualizacja: {{ formatDate(regulamin.date) }}</div>
          <h1 class="article-title">{{ regulamin.title }}</h1>
        </header>
        
        <div class="article-divider"></div>
        
        <!-- dyrektywa v-html pozwala na renderowanie znaczników HTML z API -->
        <div class="article-body" v-html="regulamin.content"></div>
      </article>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'

interface Regulamin {
  id: number
  title: string
  slug: string
  content: string
  date: string
}

interface ApiResponse {
  status: string
  count: number
  data: Regulamin[]
}

const route = useRoute()

const regulamin = ref<Regulamin | null>(null)
const isLoading = ref<boolean>(true)
const error = ref<string | null>(null)

// Formatowanie daty do polskiego formatu
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(date)
}

const fetchRegulamin = async (slug: string) => {
  try {
    isLoading.value = true
    error.value = null
    
    // Pobieramy listę wszystkich regulaminów (lub jeśli API to wspiera, konkretny regulamin: /regulaminy?slug=...)
    const response = await fetch('http://localhost:8989/regulaminy')
    
    if (!response.ok) {
      throw new Error(`Błąd serwera (kod: ${response.status})`)
    }
    
    const json: ApiResponse = await response.json()
    
    if (json.status === 'success') {
      // Szukamy regulaminu, którego slug pasuje do tego z adresu URL
      const found = json.data.find(r => r.slug === slug)
      
      if (found) {
        regulamin.value = found
      } else {
        throw new Error('Nie znaleziono regulaminu pod podanym adresem.')
      }
    } else {
      throw new Error('Otrzymano nieprawidłowe dane z API.')
    }
  } catch (err: any) {
    error.value = err.message || 'Wystąpił błąd podczas pobierania regulaminu.'
    console.error('Błąd pobierania regulaminu:', err)
  } finally {
    isLoading.value = false
  }
}

// Pobierz dane przy montowaniu komponentu
onMounted(() => {
  // route.params.slug musi odpowiadać nazwie parametru w routerze (np. /regulamin/:slug)
  const slug = route.params.slug as string
  if (slug) {
    fetchRegulamin(slug)
  } else {
    error.value = 'Brak parametru ścieżki.'
    isLoading.value = false
  }
})

// Reaguj na zmiany parametru ścieżki (gdyby użytkownik przechodził między /regulamin/fc25 a /regulamin/cs2 bez przeładowania strony)
watch(
  () => route.params.slug,
  (newSlug) => {
    if (newSlug) {
      fetchRegulamin(newSlug as string)
    }
  }
)
</script>

<style scoped>
/* Wykorzystałem style z wcześniejszego polecenia (styl Liquid Glass) */

.rules-page-container {
  width: 100%;
  padding: 40px 20px 80px 20px;
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
  background-color: #000; /* Zakładam ciemne tło strony */
  min-height: 100vh;
  color: #fff;
}

.rules-wrapper {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Przycisk powrotu */
.back-btn {
  align-self: flex-start;
  color: #86868b;
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  transition: color 0.2s ease, transform 0.2s ease;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.back-btn:hover {
  color: var(--accent-gold, #ffd700);
  transform: translateX(-4px);
}

/* Karta Artykułu (Liquid Glass) */
.article-card {
  background: rgba(10, 10, 13, 0.85);
  backdrop-filter: blur(40px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 40px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.article-date {
  font-size: 14px;
  font-weight: 600;
  color: var(--accent-gold, #ffd700);
  letter-spacing: 0.02em;
}

.article-title {
  font-size: 36px;
  font-weight: 700;
  color: #ffffff;
  letter-spacing: -0.02em;
  margin: 8px 0 0 0;
  line-height: 1.25;
}

.article-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.02) 100%);
}

.article-body {
  font-size: 18px;
  line-height: 1.6;
  color: #d1d1d6;
}

/* 
  Globalne style dla zawartości v-html 
  Muszą być ostylowane z użyciem :deep(), ponieważ Vue izoluje style ze <style scoped>
*/
.article-body :deep(h2), 
.article-body :deep(h3) {
  color: #ffffff;
  margin-top: 32px;
  margin-bottom: 16px;
}

.article-body :deep(h2) { font-size: 24px; }
.article-body :deep(h3) { font-size: 20px; }

.article-body :deep(p) {
  margin-bottom: 16px;
}

.article-body :deep(ul), 
.article-body :deep(ol) {
  margin-bottom: 24px;
  padding-left: 24px;
}

.article-body :deep(li) {
  margin-bottom: 8px;
}

.article-body :deep(strong) {
  color: #ffffff;
  font-weight: 600;
}


/* Statusy */
.status-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  background: rgba(10, 10, 13, 0.6);
  border-radius: 20px;
  color: #86868b;
  gap: 16px;
}

.status-box.error {
  color: #ff453a;
}

.spinner {
  width: 36px;
  height: 36px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: var(--accent-gold, #ffd700);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .article-card {
    padding: 24px;
  }
  .article-title {
    font-size: 28px;
  }
}
</style>