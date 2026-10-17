
<template>
  <section class="partners-container">
    <div class="partners-wrapper">
      <h2 class="main-title">Nasi Partnerzy</h2>

      <!-- Stan ładowania -->
      <div v-if="isLoading" class="status-box">
        <div class="spinner"></div>
        <span>Ładowanie partnerów...</span>
      </div>

      <!-- Komunikat o błędzie -->
      <div v-else-if="error" class="status-box error">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <span>Nie udało się pobrać danych: {{ error }}</span>
      </div>

      <!-- Lista partnerów -->
      <div v-else class="categories-container">
        <div 
          v-for="(items, category) in groupedPartners" 
          :key="category" 
          class="category-block"
        >
          <div class="category-header">
            <h3 class="category-title">{{ category }}</h3>
            <div class="article-divider"></div>
          </div>

          <!-- Siatka Grid w stylu Liquid Glass -->
          <div class="logo-grid">
            <a
              v-for="partner in items"
              :key="partner.id"
              :href="partner.website !== '#' ? partner.website : undefined"
              :target="partner.website !== '#' ? '_blank' : undefined"
              rel="noopener noreferrer"
              class="partner-card"
            >
              <div class="logo-wrapper">
               
                <img
                :src="`${API_BASE_URL}/${partner.logo_url}`"
                :alt="`Logo ${partner.name}`"
                class="logo-image"
                />

              </div>
              <span class="partner-name">{{ partner.name }}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>



<script setup lang="ts">
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8989';

import { ref, computed, onMounted } from 'vue'

export interface Partner {
  id: number
  name: string
  category: string
  logo_url: string
  type: string
  website: string
}

interface ApiResponse {
  status: string
  count: number
  data: Partner[]
}

const partners = ref<Partner[]>([])
const isLoading = ref<boolean>(true)
const error = ref<string | null>(null)

// Grupowanie partnerów po kategorii
// Grupowanie partnerów po kategorii
const groupedPartners = computed(() => {
  return partners.value.reduce((acc, partner) => {
    // Jeśli kategoria jeszcze nie istnieje, utwórz dla niej pustą tablicę
    acc[partner.category] ??= []
    // Teraz TypeScript wie na 100%, że tablica tam jest
    acc[partner.category].push(partner)
    return acc
  }, {} as Record<string, Partner[]>)
})

const fetchPartners = async () => {
  try {
    isLoading.value = true
    error.value = null
    
    const response = await fetch(`${API_BASE_URL}/partnerzy`)
    
    if (!response.ok) {
      throw new Error(`Błąd serwera (kod: ${response.status})`)
    }
    
    const json: ApiResponse = await response.json()
    
    if (json.status === 'success') {
      // Sortowanie Z-A po nazwie kategorii (odwrócone a.category i b.category)
      partners.value = json.data.sort((a, b) => {
        return b.category.localeCompare(a.category, 'pl', { sensitivity: 'base' })
      })
    } else {
      throw new Error('Otrzymano nieprawidłowe dane z API.')
    }
  } catch (err: any) {
    error.value = err.message || 'Brak połączenia z API.'
    console.error('Błąd:', err)
  } finally {
    isLoading.value = false
  }
}

onMounted(() => {
  fetchPartners()
})
</script>

<style scoped>
@import '@/assets/css/partners.css';
</style>