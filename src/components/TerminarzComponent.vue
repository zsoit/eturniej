<template>
  <section class="timeline-section">
    <div class="timeline-container">
      <!-- Nagłówek -->
      <header class="timeline-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="header-icon">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <path d="M8 14h.01"></path>
          <path d="M12 14h.01"></path>
          <path d="M16 14h.01"></path>
          <path d="M8 18h.01"></path>
          <path d="M12 18h.01"></path>
          <path d="M16 18h.01"></path>
        </svg>
        <h2 class="title">Terminarz</h2>
      </header>

      <!-- Stany ładowania i błędu -->
      <div v-if="isLoading" class="status-msg">Ładowanie terminarza...</div>
      <div v-else-if="error" class="status-msg error">{{ error }}</div>

      <!-- Oś czasu -->
      <div v-else class="timeline">
        <div class="timeline-line"></div>
        
        <div 
          v-for="(event, index) in sortedEvents" 
          :key="event.id" 
          class="timeline-item"
          :class="index % 2 === 0 ? 'left' : 'right'"
        >
          <!-- Treść karty -->
          <div class="timeline-content-wrapper">
            <div class="timeline-card">
              <h3 class="event-title">{{ event.title }}</h3>
              <div class="event-date">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                <span>{{ formatDate(event.date) }}</span>
              </div>
            </div>
          </div>

          <!-- Znacznik na osi (kółko z ikoną zegara) -->
          <div class="timeline-marker" :class="`bg-${event.status_color}`">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface TimelineEvent {
  id: number
  title: string
  date: string
  status_color: 'green' | 'red' | 'blue'
  sort_order: string
}

interface ApiResponse {
  status: string
  count: number
  data: TimelineEvent[]
}

const events = ref<TimelineEvent[]>([])
const isLoading = ref<boolean>(true)
const error = ref<string | null>(null)

// Sortowanie wydarzeń po `sort_order`
const sortedEvents = computed(() => {
  return [...events.value].sort((a, b) => parseInt(a.sort_order) - parseInt(b.sort_order))
})

// Formatowanie daty z YYYY-MM-DD na DD.MM.YYYY
const formatDate = (dateString: string) => {
  const [year, month, day] = dateString.split('-')
  return `${day}.${month}.${year}`
}

const fetchTimelineData = async () => {
  try {
    isLoading.value = true
    error.value = null
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8989';

    // Zastąp ten URL swoim prawdziwym endpointem API
    const response = await fetch(`${API_BASE_URL}/terminarz`)
    
    if (!response.ok) {
      throw new Error(`Błąd serwera (kod: ${response.status})`)
    }
    
    const json: ApiResponse = await response.json()
    
    if (json.status === 'success') {
      events.value = json.data
    } else {
      throw new Error('Otrzymano nieprawidłowe dane z API.')
    }
  } catch (err: any) {
    // Fallback dla celów deweloperskich (gdy API nie odpowiada, ładujemy Twoje dane)
    console.warn('API nie odpowiedziało, ładuję dane testowe.', err)
    events.value = [
      { id: 1, title: "Rozpoczęcie zapisów Turnieju W i Poza Ekranem", date: "2026-02-03", status_color: "green", sort_order: "1" },
      { id: 2, title: "Zakończenie zapisów CS2 Turnieju W i Poza Ekranem", date: "2026-03-18", status_color: "red", sort_order: "2" },
      { id: 3, title: "Rozpoczęcie eliminacji ON-LINE Turnieju W i Poza Ekranem", date: "2026-03-22", status_color: "green", sort_order: "3" },
      { id: 4, title: "Zakończenie eliminacji ON-LINE Turnieju W i Poza Ekranem", date: "2026-04-11", status_color: "red", sort_order: "4" },
      { id: 5, title: "Zakończenie zapisów FC25 Turnieju W i Poza Ekranem", date: "2026-04-11", status_color: "red", sort_order: "5" },
      { id: 6, title: "Rozpoczęcie Turnieju LAN W i Poza Ekranem#10", date: "2026-04-15", status_color: "blue", sort_order: "6" },
      { id: 7, title: "Zakończenie Turnieju LAN W i Poza Ekranem#10", date: "2026-04-17", status_color: "blue", sort_order: "7" }
    ]
    error.value = null // Ukrywamy błąd, bo użyliśmy fallbacku
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchTimelineData()
})
</script>

<style scoped>
/* Główne kolory i tło */
.timeline-section {
  background-color: #1a1a1a;
  color: #ffffff;
  min-height: 100vh;
  padding: 60px 20px;
  font-family: system-ui, -apple-system, sans-serif;
}

.timeline-container {
  max-width: 1000px;
  margin: 0 auto;
}

/* Nagłówek */
.timeline-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 60px;
}

.title {
  font-size: 32px;
  font-weight: 500;
  margin: 0;
  letter-spacing: -0.5px;
}

.header-icon {
  color: #ffffff;
}

/* Komunikaty */
.status-msg {
  text-align: center;
  padding: 40px;
  color: #888;
  font-size: 18px;
}
.status-msg.error {
  color: #d15555;
}

/* Oś czasu - układ */
.timeline {
  position: relative;
  width: 100%;
}

/* Główna pionowa biała linia */
.timeline-line {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 50%;
  width: 2px;
  background-color: #ffffff;
  transform: translateX(-50%);
  z-index: 1;
}

/* Pojedynczy wiersz */
.timeline-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 40px;
  position: relative;
  z-index: 2;
}

/* Kontener na kartę zależy od strony */
.timeline-content-wrapper {
  width: 50%;
  display: flex;
}

.timeline-item.left .timeline-content-wrapper {
  justify-content: flex-end;
  padding-right: 40px;
}

.timeline-item.right {
  flex-direction: row-reverse;
}

.timeline-item.right .timeline-content-wrapper {
  justify-content: flex-start;
  padding-left: 40px;
}

/* Wygląd karty wydarzenia */
.timeline-card {
  background-color: #171717; /* Bardzo ciemny szary */
  border: 1px solid rgba(255, 255, 255, 0.1); /* Delikatna ramka */
  border-radius: 4px;
  padding: 24px 20px;
  width: 100%;
  max-width: 420px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0,0,0,0.3);
}

.event-title {
  font-size: 16px;
  font-weight: 500;
  margin: 0 0 12px 0;
  line-height: 1.4;
  color: #f0f0f0;
}

.event-date {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #888888;
  font-size: 12px;
}

/* Białe strzałki (trójkąty) */
.timeline-item.left .timeline-card::after {
  content: '';
  position: absolute;
  top: 50%;
  right: -12px;
  transform: translateY(-50%);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-left: 12px solid #ffffff; /* Biały trójkąt w prawo */
}

.timeline-item.right .timeline-card::before {
  content: '';
  position: absolute;
  top: 50%;
  left: -12px;
  transform: translateY(-50%);
  border-top: 8px solid transparent;
  border-bottom: 8px solid transparent;
  border-right: 12px solid #ffffff; /* Biały trójkąt w lewo */
}

/* Okrągły znacznik na osi (ikona zegara) */
.timeline-marker {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 3;
}

/* Kolory statusów */
.bg-green { background-color: #3f8c4b; }
.bg-red { background-color: #c74a4a; }
.bg-blue { background-color: #3572b0; }

/* --- Wersja Responsywna (Telefony) --- */
@media (max-width: 768px) {
  .timeline-line {
    left: 20px;
    transform: none;
  }
  
  .timeline-marker {
    left: 20px;
    transform: translate(-50%, -50%);
  }
  
  .timeline-item.left, 
  .timeline-item.right {
    flex-direction: row-reverse; /* Wymusza układ z kartą po prawej */
  }
  
  .timeline-item.left .timeline-content-wrapper,
  .timeline-item.right .timeline-content-wrapper {
    width: 100%;
    padding-left: 50px;
    padding-right: 0;
    justify-content: flex-start;
  }
  
  /* Na mobile wszystkie trójkąty wskazują w lewo z lewej krawędzi karty */
  .timeline-item.left .timeline-card::after {
    display: none;
  }
  
  .timeline-item.left .timeline-card::before,
  .timeline-item.right .timeline-card::before {
    content: '';
    position: absolute;
    top: 50%;
    left: -12px;
    transform: translateY(-50%);
    border-top: 8px solid transparent;
    border-bottom: 8px solid transparent;
    border-right: 12px solid #ffffff;
    border-left: none;
  }
}
</style>