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
          :style="item.image_url ? { backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.85)), url(${item.image_url})` } : {}"
        >
          <div class="card-content">
            <span class="news-date">{{ item.date_time }}</span>
            <h2 class="news-card-title">{{ item.title }}</h2>
            <p class="news-description">{{ item.description }}</p>
                       
          </div>
        </article>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface NewsItem {
  id: number
  title: string
  date_time: string
  description: string
  content: string
  image_url: string
}

const newsList = ref<NewsItem[]>([])
const loading = ref<boolean>(true)
const error = ref<string | null>(null)

// Statyczna tablica danych dostarczona bezpośrednio do komponentu
const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Pierwsze informacje dla pasjonatów E-Sportu w Koszalinie! Turniej League of Legends 5x5",
    date_time: "2026-10-18",
    description: "Zapraszamy uczniów szkół podstawowych i ponadpodstawowych z Koszalina do udziału w turnieju League of Legends 5x5! Zapisy ruszają 15.11.2026 r. Na 4 najlepsze drużyny z eliminacji czeka wielki finał na żywo w ZSnr1 'Ekonom' z transmisją na YT!",
    content: "Mamy pierwsze informacje dla pasjonatów E-Sportu w Koszalinie. 11.12.2026 r. Finał Turnieju (4 najlepsze drużyny z Eliminacji) w League of Legends 5x5!\n\nTurniej jest przeznaczony dla Uczniów szkół z Koszalina (podstawowych lub ponadpodstawowych). Drużyny mogą składać się z Uczniów różnych szkół. Więcej o naszym Turnieju w Regulaminie w zakładce Info dla Zawodników.\n\nFinał odbędzie się w sali gimnastycznej ZSnr1 Ekonom w godzinach 9.00-15.00. Turniej będzie pokazywany na żywo na telebimie (widzowie, kibice mile widziani) oraz streamingowany na platformie YT.\n\nZapraszamy do kompletowania zespołów. Czekamy na 32 drużyny (decyduje kolejność zgłoszeń).\n\nWażne daty:\n- Start zapisów: 15.11.2026 r. do 29.11.2026 r.\n- Turniej eliminacyjny: 05.12.2026 r.\n- Wielki Finał: 11.12.2026 r.\n\nSzczegóły już wkrótce!",
    image_url: "tlo.png"
  }
];

const fetchNews = async () => {
  try {
    loading.value = true
    // Symulacja ładowania danych z tablicy lokalnej (możesz tu w każdej chwili podpiąć fetch do API)
    newsList.value = newsData
  } catch (err: any) {
    error.value = err.message || 'Wystąpił błąd'
    console.error('Nie udało się załadować aktualności:', err)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchNews()
})
</script>

<style scoped>
@import '@/assets/css/news.css';
</style>