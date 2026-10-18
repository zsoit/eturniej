<script setup>
import { ref, onMounted } from 'vue'

// Dane prelekcji edukacyjnych
const lectures = ref([
  {
    id: 'esport-pro',
    number: '01',
    title: 'Esport PRO – od pierwszego meczu do profesjonalnej sceny',
    category: 'Sektor Profesjonalny & Kariera',
    icon: '🏆',
    accentColor: '#ffd700', // Złoty
    lead: 'Odkryj kulisy profesjonalnego esportu i dowiedz się, jak przekuć pasję do gier w zawodową karierę na światowym poziomie.',
    topics: [
      'Jak wygląda profesjonalny esport od kulis',
      'Droga od gracza amatora do zakontraktowanego zawodnika',
      'Trening indywidualny oraz praca zespołowa',
      'Kluczowa komunikacja i współpraca w drużynie',
      'Analiza rozgrywek (VOD review) i wyciąganie wniosków',
      'Zasady fair play i etyka rywalizacji',
      'Zawody i ścieżki kariery związane z branżą esportową i gamingową'
    ]
  },
  {
    id: 'bezpieczny-gracz',
    number: '02',
    title: 'Bezpieczny Gracz – jak chronić swoją prywatność i dane w sieci',
    category: 'Cyberbezpieczeństwo & Ochrona',
    icon: '🛡️',
    accentColor: '#00e5ff', // Neon Cyan
    lead: 'Poznaj najważniejsze zasady ochrony swoich kont, wirtualnego ekwipunku oraz danych osobowych w świecie cyfrowym.',
    topics: [
      'Phishing i najczęstsze oszustwa internetowe w grach',
      'Metody ochrony przed kradzieżą kont gamingowych (Steam, Riot, Discord)',
      'Tworzenie bezpiecznych haseł i zarządzanie nimi',
      'Uwierzytelnianie dwuskładnikowe (2FA) – dlaczego jest niezbędne',
      'Ochrona danych osobowych i prywatności online',
      'Bezpieczeństwo w mediach społecznościowych i na komunikatorach',
      'Przeciwdziałanie cyberprzemocy (hejt, toksyczność)',
      'Bezpieczne korzystanie z cyfrowych platform gamingowych'
    ]
  },
  {
    id: 'granie-z-glowa',
    number: '03',
    title: 'Granie z głową – zdrowie, równowaga i odpowiedzialna rywalizacja',
    category: 'Zdrowie & Life-Balance',
    icon: '🧠',
    accentColor: '#ff453a', // Neon Czerwony/Róż
    lead: 'Zadbaj o swoje ciało i umysł. Dowiedz się, jak zachować wysoką formę, uniknąć kontuzji i budować zdrowy balans życiowy.',
    topics: [
      'Ergonomia stanowiska gracza (fotel, biurko, ułożenie dłoni)',
      'Profilaktyka wad postawy i ćwiczenia rozciągające',
      'Higiena czasu przed ekranem i ochrona wzroku',
      'Rola snu, aktywności fizycznej i regeneracji w wynikach w grze',
      'Koncentracja oraz znaczenie regularnych przerw',
      'Równowaga (work-life balance) pomiędzy gamingiem a życiem offline',
      'Zagrożenia związane z mikropłatnościami i lootboxami',
      'Odpowiedzialne i świadome korzystanie z gier wideo'
    ]
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
  <div class="lectures-container">
    
    

    <!-- Lista Prelekcji -->
    <section id="lista-prelekcji" class="section-wrapper scroll-animate">
      <div class="section-heading">
        <span class="sub-heading-tag">Program Edukacyjny</span>
        <h2 class="main-heading">Tematy Prelekcji</h2>
        <p class="section-lead">Panele dyskusyjne i wykłady przygotowane z myślą o graczach, rodzicach oraz pasjonatach nowych technologii</p>
      </div>

      <div class="lectures-grid">
        <article 
          v-for="(lecture, index) in lectures" 
          :key="lecture.id" 
          class="apple-glass-card lecture-card hover-glow-effect scroll-animate-cascade"
          :style="{ transitionDelay: `${index * 0.15}s` }"
        >
          <div class="lecture-header">
            <div class="lecture-meta">
              <span class="lecture-number" :style="{ color: lecture.accentColor }">
                {{ lecture.number }}
              </span>
              <span class="lecture-category">{{ lecture.category }}</span>
            </div>
            <div class="lecture-icon-wrapper" :style="{ borderColor: `${lecture.accentColor}40` }">
              <span class="lecture-icon">{{ lecture.icon }}</span>
            </div>
          </div>

          <div class="lecture-body">
            <h3 class="lecture-title">{{ lecture.title }}</h3>
            <p class="lecture-lead">{{ lecture.lead }}</p>

            <div class="lecture-topics-wrapper">
              <h4 class="topics-heading">Zagadnienia poruszane podczas prelekcji:</h4>
              <ul class="topics-list">
                <li v-for="(topic, tIdx) in lecture.topics" :key="tIdx">
                  <span class="topic-bullet" :style="{ color: lecture.accentColor }">⚡</span>
                  <span class="topic-text">{{ topic }}</span>
                </li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Banner Dołącz do nas / Podsumowanie -->
  
  </div>
</template>

<style scoped>
@import '@/assets/css/homePage.css';
</style>

<style>
/* ==========================================================
   STYLE SEKCJI PRELEKCJE VIEW
   ========================================================== */

.lectures-container {
  width: 100%;
}

.lectures-hero {
  min-height: 60vh;
}

/* Grid Prelekcji */
.lectures-grid {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-top: 2rem;
}

/* Karta Single Prelekcji */
.lecture-card {
  padding: 3rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(20, 20, 28, 0.6);
  backdrop-filter: blur(16px);
  border-radius: 24px;
}

.lecture-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  padding-bottom: 1.5rem;
}

.lecture-meta {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.lecture-number {
  font-size: 2rem;
  font-weight: 900;
  line-height: 1;
  font-family: monospace, monospace;
}

.lecture-category {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #a0a0ab;
}

.lecture-icon-wrapper {
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lecture-icon {
  font-size: 1.75rem;
}

.lecture-body {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.lecture-title {
  font-size: 1.85rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.3;
}

.lecture-lead {
  font-size: 1.1rem;
  color: #d1d1d1;
  line-height: 1.6;
  margin: 0;
}

/* Lista zagadnień */
.lecture-topics-wrapper {
  margin-top: 1rem;
  padding: 1.5rem 1.75rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 16px;
  border-left: 3px solid rgba(255, 183, 0, 0.6);
}

.topics-heading {
  font-size: 1.05rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 1rem 0;
}

.topics-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 0.85rem 1.5rem;
}

.topics-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  font-size: 1rem;
  color: #cccccc;
  line-height: 1.5;
}

.topic-bullet {
  font-size: 0.9rem;
  margin-top: 0.1rem;
}

/* Call to Action Banner */
.cta-banner {
  padding: 3.5rem 2.5rem;
  text-align: center;
  margin-top: 2rem;
  background: linear-gradient(135deg, rgba(20, 20, 30, 0.8) 0%, rgba(30, 25, 15, 0.6) 100%);
  border: 1px solid rgba(255, 183, 0, 0.2);
  border-radius: 24px;
}

.cta-content {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
}

.cta-title {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
}

.cta-desc {
  font-size: 1.1rem;
  color: #d1d1d1;
  line-height: 1.6;
  margin: 0 0 0.5rem 0;
}

/* ==========================================================
   RESPONSYWNOŚĆ (RWD)
   ========================================================== */
@media (max-width: 992px) {
  .lecture-card {
    padding: 2rem;
  }

  .lecture-title {
    font-size: 1.5rem;
  }

  .topics-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .lecture-header {
    flex-direction: column-reverse;
    align-items: flex-start;
    gap: 1rem;
  }

  .lecture-icon-wrapper {
    width: 48px;
    height: 48px;
  }

  .cta-banner {
    padding: 2rem 1.5rem;
  }

  .cta-title {
    font-size: 1.5rem;
  }
}
</style>