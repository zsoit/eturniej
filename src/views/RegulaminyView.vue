<script setup>
import { ref, onMounted } from 'vue'

// Dane kafelków z regulaminami i linkami dla uczestników
const regulationsCards = ref([
  {
    id: 'lol-regulations',
    title: 'Regulamin KoDoS',
    category: 'Oficjalny Dokument',
    description: 'Zapoznaj się z pełnym regulaminem, zasadami fair play, formatem rozgrywek oraz harmonogramem turniejów League of Legends.',
    linkText: 'Zobacz Regulamin',
    linkUrl: '/regulamin.pdf', // Wewnętrzny router-link
    isExternal: false,
    icon: '📜',
    accentColor: '#ffd700' // Złoty
  },
  {
    id: 'lol-registration',
    title: 'Zapisy dla Drużyn – LoL',
    category: 'Formularz Zgłoszeniowy',
    description: 'Zbierz swoją ekipę 5v5 i zgłoś drużynę do walki o cenne nagrody i tytuł Mistrza Koszalińskiego Dnia E-Sportu.',
    linkText: 'Wypełnij Formularz',
    linkUrl: 'https://skroc.pl/kodes-formularz', // Zewnętrzny link
    isExternal: true,
    icon: '📝',
    accentColor: '#00e5ff' // Neon Cyan
  },
  {
    id: 'discord-channel',
    title: 'Oficjalny Discord Wydarzenia',
    category: 'Komunikacja & Support',
    description: 'Dołącz do naszej społeczności! Tutaj znajdziesz ogłoszenia, support techniczny oraz kanały do kontaktu z sędziami.',
    linkText: 'Dołącz do Discorda',
    linkUrl: 'https://skroc.pl/2kodes-discord',
    isExternal: true,
    icon: '💬',
    accentColor: '#5865F2' // Discord Blurple
  },
  {
    id: 'qualification-platform',
    title: 'Platforma Eliminacyjna',
    category: 'Rozgrywki Online',
    description: 'Oficjalna platforma, na której będą przeprowadzane mecze eliminacyjne oraz sprawdzane drabinki turniejowe.',
    linkText: 'Przejdź do Eliminacji',
    linkUrl: 'https://skroc.pl/kodes-eliminacje',
    isExternal: true,
    icon: '⚡',
    accentColor: '#ff453a' // Neon Red
  }
])

// Inicjalizacja animacji pojawiania się przy scrollowaniu
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      }
    })
  }, {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
  })

  document.querySelectorAll('.scroll-animate').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<template>
  <div class="regulations-container">
    


    <!-- Sekcja z Kafelkami -->
    <section id="kafelki-regulaminow" class="section-wrapper scroll-animate">
      <div class="section-heading">
        <span class="sub-heading-tag">Informacje & Linki</span>
        <h2 class="main-heading">Regulamin i Strefa Gracza</h2>
        <p class="section-lead">Wybierz odpowiednią sekcję, aby przejść do zapisów, regulaminu lub kanałów komunikacji</p>
      </div>

      <div class="regulations-grid">
        <div 
          v-for="(item, index) in regulationsCards" 
          :key="item.id" 
          class="apple-glass-card regulation-card hover-glow-effect scroll-animate-cascade"
          :style="{ transitionDelay: `${index * 0.15}s` }"
        >
          <div class="reg-card-header">
            <span class="reg-category" :style="{ color: item.accentColor }">
              {{ item.category }}
            </span>
            <div class="reg-icon-box" :style="{ borderColor: `${item.accentColor}40` }">
              <span class="reg-icon">{{ item.icon }}</span>
            </div>
          </div>

          <div class="reg-card-body">
            <h3 class="reg-title">{{ item.title }}</h3>
            <p class="reg-desc">{{ item.description }}</p>
          </div>

          <div class="reg-card-footer">
            <!-- Jeśli link jest wewnętrzny (router-link) -->
            <router-link 
              v-if="!item.isExternal" 
              :to="item.linkUrl" 
              class="apple-button primary-gold reg-btn"
            >
              <span>{{ item.linkText }}</span>
              <span class="btn-arrow">→</span>
            </router-link>

            <!-- Jeśli link jest zewnętrzny (a href) -->
            <a 
              v-else 
              :href="item.linkUrl" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="apple-button primary-gold reg-btn"
            >
              <span>{{ item.linkText }}</span>
              <span class="btn-arrow">↗</span>
            </a>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<style scoped>
@import '@/assets/css/homePage.css';
</style>

<style>
/* ==========================================================
   STYLE SEKCJI REGULAMINY VIEW
   ========================================================== */

.regulations-container {
  width: 100%;
}

.regulations-hero {
  min-height: 60vh;
}

/* Grid Kafelków */
.regulations-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

/* Pojedynczy kafelek */
.regulation-card {
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(20, 20, 28, 0.6);
  backdrop-filter: blur(16px);
  border-radius: 24px;
  transition: transform 0.3s ease, border-color 0.3s ease;
}

.regulation-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 183, 0, 0.4);
}

.reg-card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reg-category {
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.reg-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.reg-icon {
  font-size: 1.5rem;
}

.reg-card-body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-grow: 1;
}

.reg-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.3;
}

.reg-desc {
  font-size: 0.95rem;
  color: #cccccc;
  line-height: 1.6;
  margin: 0;
}

.reg-card-footer {
  padding-top: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.reg-btn {
  width: 100%;
  justify-content: center;
  text-decoration: none;
  padding: 0.75rem 1.25rem;
  font-size: 0.95rem;
}

/* ==========================================================
   RESPONSYWNOŚĆ (RWD)
   ========================================================== */
@media (max-width: 768px) {
  .regulations-grid {
    grid-template-columns: 1fr;
  }
  
  .regulation-card {
    padding: 2rem;
  }
}
</style>