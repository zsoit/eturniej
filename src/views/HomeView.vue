<script setup>
import { ref, computed, onMounted } from 'vue'

const mainTournaments = ref([
  {
    id: 'lol',
    title: 'League of Legends',
    type: 'Turniej Główny (5v5)',
    time: '09:00 - 15:00',
    description: 'Rywalizuj w League of Legends, EA Sports FC oraz Retro Gry, kibicuj najlepszym i wygrywaj nagrody! Turniej Finałowy 11.12.2026r. w ZSnr 1 EKONOM  Koszalin ul. Andersa 30 w godz. 9.00-15.00.',
    badge: 'Pula Nagród',
    accentColor: '#ffd700'
  },
  {
    id: 'fc',
    title: 'EA Sports FC 26',
    type: 'Konsolowe Starcia (1v1)',
    time: ' ',
    description: 'Udział dla uczestników KoDeS w dniu 11.12.2026r. Zapisy na miejscu w Sali Sportowej ZSnr 1 Ekonom.',
    badge: 'Open / Turniej 1v1',
    accentColor: '#00e5ff'
  },
  {
    id: 'retro',
    title: 'Retro Gry',
    type: 'Retro Games',
    time: ' ',
    description: 'Udział w turnieju retro dla uczestników KoDeS w dniu 11.12.2026r. Zapisy na miejscu w Sali Sportowej ZSnr 1 Ekonom',
    badge: 'Open / Turniej 1v1',
    accentColor: '#00e5ff'
  }
])

const extraZones = ref([
  {
    id: 'ftp',
    icon: '🎮',
    title: 'Strefa Kibica - Free to Play',
    desc: 'Zagraj ze znajomymi w najnowsze tytuły oraz klasyki retro.'
  },
  {
    id: 'stream',
    icon: '📡',
    title: 'Strefa Edukacji – prelekcje i prezentacje',
    desc: 'Dowiedz się więcej o rozwoju branży e-sportowej i nowych technologiach.'
  },
  {
    id: 'cosplay',
    icon: '🏆',
    title: 'Transmisja Live',
    desc: 'Oglądaj zmagania zawodników na żywo z profesjonalnym komentarzem.'
  }
])

// Główni Partnerzy (Karty ze szczegółowym opisem)
const mainPartners = ref([
  {
    id: 'public-sector-partner',
    category: 'Główny Partner Sektora Publicznego',
    title: 'Ministerstwo Cyfryzacji',
    logo: '/partners/ministerstwo.png',
    alt: 'Logo Ministerstwo Cyfryzacji',
    description: 'Ministerstwo Cyfryzacji (MC) to polski urząd administracji rządowej odpowiedzialny za informatyzację, rozwój usług cyfrowych (takich jak aplikacja mObywatel) oraz cyberbezpieczeństwo Rzeczypospolitej Polskiej. Siedziba resortu mieści się przy ul. Królewskiej 27 w Warszawie. Sekretarzem stanu w Ministerstwie jest Rafał Rosiński, który objął Patronat nad naszą imprezą.'
  },
  {
    id: 'education-partner1',
    category: 'Główny Partner Sektora Edukacji',
    title: 'Politechnika Koszalińska',
    logo: '/partners/pk.png',
    alt: 'Logo Politechnika Koszalińska WEiI',
    description: 'Politechnika Koszalińska to największa państwowa uczelnia techniczna na Pomorzu Środkowym, założona 8 czerwca 1968 roku (początkowo jako Wyższa Szkoła Inżynierska). Status politechniki oraz obecną nazwę zyskała 1 września 1996 roku. Stanowisko rektora uczelni piastuje dr hab. Danuta Zawadzka, prof. PK. Politechnika Koszalińska jest także partnerem technologicznym 2. Koszalińskiego Dnia E - Sportu  Więcej o Uczelni na  www.tu.koszalin.pl'
  },
  {
    id: 'education-partner2',
    category: 'Główny Partner Sektora Edukacji',
    title: 'Wydział Elektroniki i Informatyki PK',
    logo: '/partners/pk-weii.png',
    alt: 'Logo Politechnika Koszalińska WEiI',
    description: 'Wydział Elektroniki i Informatyki Politechniki Koszalińskiej (WEiI) to jeden z wiodących i najbardziej dynamicznie rozwijających się wydziałów uczelni, kształcący specjalistów dla nowoczesnego sektora wysokich technologii (ICT).'
  },
  {
    id: 'gordon',
    category: 'Ekspert Technologiczny',
    title: 'Hubert Gorgon GWR Blejch',
    logo: '/gordon.jpg',
    alt: 'Gordon',
    description: 'Gordon GWR (Hubert Blejch) to ceniony twórca treści technologicznych, pasjonat modingu oraz bezkompromisowy ekspert w dziedzinie sprzętu komputerowego. Pochodzący z Koszalina streamer i edukator dał się poznać szerszej publiczności przede wszystkim jako dwukrotny rekordzista Księgi Rekordów Guinnessa w najdłuższym maratonie gier komputerowych oraz mobilnych. Jego gigantyczne wyzwania gamingowe, sięgające ponad 136 godzin ciągłej rozgrywki, dowiodły nie tylko niezwykłej wytrwałości, ale także ogromnego zaangażowania w sztukę elektronicznej rozrywki. Hubert to również triumfator prestiżowego konkursu x-kom PC Masters Challenge, gdzie zaprezentował mistrzowskie tempo i precyzję w ekspresowym montażu komputerów.'
  }
])

// Pełne dane z API / tablicy JSON
const rawPartnersList = ref([
  { id: 14, name: "Edu Day", category: "Sponsorzy", logo_url: "partners/edu-day.png", type: "edu-day", website: "https://eduday.pl/" },

  { id: 15, name: "Entevo", category: "Sponsorzy", logo_url: "partners/entevo.png", type: "entevo", website: "https://entevo.pl/" },

  // { id: 16, name: "radio eska", category: "Patroni medialni", logo_url: "partners/eska.png", type: "eska", website: "https://www.eska.pl/" },

  // { id: 17, name: "TVP3", category: "Patroni medialni", logo_url: "partners/tvp3.png", type: "tvp3", website: "https://regiony.tvp.pl/" },

  { id: 18, name: "Koszalin - Centrum Pomorza", category: "Patronat", logo_url: "partners/koszalin.png", type: "koszalin", website: "https://koszalin.pl/" },

  { id: 19, name: "Politechnika Koszalińska", category: "Główni Partnerzy Sektora Edukacji", logo_url: "pk.png", type: "pk", website: "https://tu.koszalin.pl" },

  // { id: 20, name: "Wydział Elektroniki i Informatyki Politechniki Koszalińskiej", category: "Główni Partnerzy Sektora Edukacji", logo_url: "assets/logo_url_6ace42d124a28.png", type: "weii-pk", website: "https://tu.koszalin.pl/weii" },

  { id: 21, name: "Zespół Szkół nr 1 im. Mikołaja Kopernika w Koszalinie", category: "Główni Partnerzy Sektora Edukacji", logo_url: "partners/zs-kopernik.png", type: "zs1", website: "http://www.ekonom.koszalin.pl/" },

  { id: 22, name: "Miasto Koszalin", category: "Patronat", logo_url: "partners/koszalin_kon.png", type: "koszalin-miasto", website: "https://koszalin.pl" },


  // { id: 23, name: "Ministerstwo Cyfryzacji", category: "Główny Partner Sektora Publicznego", logo_url: "assets/logo_url_6ace4367d4379.png", type: "ministerstwo-cyfryzacji", website: "https://www.gov.pl/web/cyfryzacja" }
])

// Filtrowanie: Wykluczamy Ministerstwo oraz WEiI/PK, które są wyżej
const sliderPartners = computed(() => {
  const excludedTypes = ['ministerstwo-cyfryzacji', 'weii-pk', 'pk']
  return rawPartnersList.value.filter(p => !excludedTypes.includes(p.type))
})

// Ref do ręcznego przewijania slidera
const sliderTrack = ref(null)

const scrollSlider = (direction) => {
  if (sliderTrack.value) {
    const scrollAmount = 300
    sliderTrack.value.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    })
  }
}

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
  <div class="home-container">
    
    <!-- Hero Section -->
    <section class="hero-section">
      <div class="image-background-container">
        <div class="bg-stock-image glitch-effect"></div>
        <div class="video-overlay"></div>
        <div class="cyber-grid-overlay"></div>
      </div>

      <div class="hero-content animate-fade-in">
        <div class="large-logo-wrapper">
          <div class="logo-glow"></div>
          <img src="/logo1.png" alt="Koszaliński Dzień E-Sportu Logo" class="large-hero-logo" />
        </div>

        <div class="hero-badge-pill animate-pulse-badge">
          <span class="pill-dot"></span> Oficjalne Wydarzenie E-Sportowe Koszalina
        </div>

        <h1 class="hero-main-title">
         2 Koszaliński Dzień <br />
          <span class="gold-gradient-text">E-Sportu</span>
        </h1>

        <p class="hero-description">
          Rywalizuj w League of Legends, EA Sports FC oraz Retro Gry, kibicuj najlepszym i wygrywaj nagrody!
        </p>
        
        <div class="hero-cta-group">
          <router-link to="/aktualnosci" class="apple-button primary-gold">
            <span>Aktualności & Zapisy</span>
            <span class="btn-arrow">→</span>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Sekcja: Organizator (123concept) -->
    <section class="section-wrapper scroll-animate">
      <div class="section-heading">
        <span class="sub-heading-tag">Organizator Wydarzenia</span>
        <h2 class="main-heading">123Games by Agencja 123Concept</h2>
      </div>

      <div class="apple-glass-card organizer-card hover-glow-effect">
        <div class="organizer-brand">
          <span class="organizer-badge">AGENCJA EVENTOWO-TECHNOLOGICZNA</span>
          <img src="/123logo-wh.png" alt="123concept logo" class="organizer-logo" />
        </div>
        
        <div class="organizer-text">
          <p>
            Jako <strong>123concept</strong> od lat kreujemy niezapomniane doświadczenia, łącząc innowacyjne technologie z branżą rozrywkową. Jesteśmy dumnym pomysłodawcą i głównym organizatorem koszalińskiej Ligi E-Sportu, która tworzy 2 - edycję Koszalińskiego Dnia E-Sportu.
          </p>
          <p>
            Nasz zespół tworzą profesjonaliści i pasjonaci gamingu. Zapewniamy najwyższą jakość realizacji turniejowych, widowiskową oprawę wizualną oraz profesjonalne zaplecze techniczne – udowadniając, że lokalne inicjatywy potrafią dorównać standardom największych światowych aren e-sportowych. Tworzymy to wydarzenie z myślą o graczach, społeczności i rozwoju lokalnego rynku technologicznego.
          </p>
        </div>
      </div>
    </section>

    <!-- Sekcja: Główni Partnerzy -->
    <section class="section-wrapper scroll-animate">
      <div class="section-heading">
        <span class="sub-heading-tag">Wspierają nas</span>
        <h2 class="main-heading">Główni Partnerzy</h2>
      </div>

      <div class="partners-list">
        <div 
          v-for="partner in mainPartners" 
          :key="partner.id" 
          class="apple-glass-card partner-card hover-glow-effect"
        >
          <div class="partner-brand">
            <span class="partner-badge">{{ partner.category }}</span>
            <img :src="partner.logo" :alt="partner.alt" class="partner-logo" />
            <h3 class="partner-title">{{ partner.title }}</h3>
          </div>
          <div class="partner-text">
            <p>{{ partner.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- NOWA SEKCJA: Slider / Karuzela Pozostałych Partnerów -->
    <section class="section-wrapper scroll-animate">
      <div class="section-heading">
        <span class="sub-heading-tag">Wsparcie i Patronat</span>
        <h2 class="main-heading">Partnerzy, Sponsorzy i Media</h2>
      </div>

      <div class="slider-wrapper">
        <button class="slider-arrow prev" @click="scrollSlider('left')" aria-label="Poprzedni">‹</button>
        
        <div class="slider-track" ref="sliderTrack">
          <a 
            v-for="item in sliderPartners" 
            :key="item.id" 
            href="/partnerzy" 
            rel="noopener noreferrer"
            class="slider-card apple-glass-card hover-glow-effect"
          >
            <span class="slider-badge">{{ item.category }}</span>
            <div class="slider-logo-wrapper">
              <img :src="`/${item.logo_url}`" :alt="item.name" class="slider-logo" />
            </div>
            <h4 class="slider-title">{{ item.name }}</h4>
          </a>
        </div>

        <button class="slider-arrow next" @click="scrollSlider('right')" aria-label="Następny">›</button>
      </div>
    </section>

    <!-- Sekcja Turniejowa -->
    <section id="turnieje" class="section-wrapper scroll-animate">
      <div class="section-heading">
        <span class="sub-heading-tag">Dyscypliny</span>
        <h2 class="main-heading">Główne Turnieje</h2>
        <p class="section-lead">Wybierz swoją grę i stań do walki o puchar Koszalińskiego Dnia E-Sportu</p>
      </div>

      <div class="tournaments-cards-grid">
        <div 
          v-for="(item, index) in mainTournaments" 
          :key="item.id" 
          class="apple-glass-card hover-glow-effect scroll-animate-cascade"
          :style="{ transitionDelay: `${index * 0.15}s` }"
        >
          <div class="card-header-row">
            <span class="badge-tag">{{ item.badge }}</span>
            <span class="time-tag">⏱️ {{ item.time }}</span>
          </div>

          <div class="card-body-content">
            <span class="game-category">{{ item.type }}</span>
            <h3 class="game-title">{{ item.title }}</h3>
            <p class="game-desc">{{ item.description }}</p>
          </div>

          <div class="card-action-footer">
            <router-link to="/aktualnosci" class="card-action-btn">
              Szczegóły & Regulamin
              <span class="arrow-icon">→</span>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Dodatkowe Strefy & Atrakcje (Bento Grid) -->
    <section class="section-wrapper scroll-animate">
      <div class="section-heading">
        <span class="sub-heading-tag">Atrakcje</span>
        <h2 class="main-heading">Strefy i Wydarzenia Towarzyszące</h2>
      </div>

      <div class="bento-grid-container">
        <div 
          v-for="(zone, index) in extraZones" 
          :key="zone.id" 
          class="bento-box-item hover-scale-effect scroll-animate-cascade"
          :style="{ transitionDelay: `${index * 0.2}s` }"
        >
          <div class="bento-icon-wrapper">{{ zone.icon }}</div>
          <div class="bento-info">
            <h4 class="bento-title">{{ zone.title }}</h4>
            <p class="bento-desc">{{ zone.desc }}</p>
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
   HERO SECTION
   ========================================================== */
.hero-section {
  position: relative;
  width: 100%;
  min-height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-image: linear-gradient(
      to bottom, 
      rgba(10, 10, 13, 0.6) 0%, 
      rgba(10, 10, 13, 0.9) 100%
    ), 
    url('/tlo.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 20px;
}

/* ==========================================================
   WSPÓLNE STYLE DLA SEKCJI ORGANIZATORA I PARTNERÓW
   ========================================================== */

.organizer-card,
.partner-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 3rem;
  padding: 3rem;
  margin-top: 2rem;
}

.organizer-brand,
.partner-brand {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 300px;
}

.organizer-badge,
.partner-badge {
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #ffb700;
  margin-bottom: 1rem;
}

.organizer-logo,
.partner-logo {
  max-width: 250px;
  height: auto;
  display: block;
  margin-bottom: 0.75rem;
  object-fit: contain;
}

.organizer-title,
.partner-title {
  font-size: 1.35rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.4;
}

.organizer-text,
.partner-text {
  flex: 1;
  color: #d1d1d1;
  font-size: 1.05rem;
  line-height: 1.7;
}

.organizer-text p,
.partner-text p {
  margin: 0 0 1.25rem 0;
}

.organizer-text p:last-child,
.partner-text p:last-child {
  margin-bottom: 0;
}

/* ==========================================================
   STYLE SLIDERA / KARUZELI PARTNERÓW
   ========================================================== */

.slider-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  margin-top: 2rem;
  padding: 0 1rem;
}

.slider-track {
  display: flex;
  gap: 1.5rem;
  overflow-x: auto;
  scroll-behavior: smooth;
  padding: 1rem 0.5rem;
  scrollbar-width: none; /* Ukryj scrollbar dla Firefox */
}

.slider-track::-webkit-scrollbar {
  display: none; /* Ukryj scrollbar dla Chrome/Safari */
}

.slider-card {
  flex: 0 0 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 1.75rem 1.25rem;
  text-decoration: none;
  transition: transform 0.3s ease, border-color 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.slider-card:hover {
  transform: translateY(-6px);
  border-color: rgba(255, 183, 0, 0.4);
}

.slider-badge {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #ffb700;
  margin-bottom: 1rem;
}

.slider-logo-wrapper {
  width: 100%;
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.slider-logo {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  filter: brightness(0.9) contrast(1.1);
  transition: filter 0.3s ease;
}

.slider-card:hover .slider-logo {
  filter: brightness(1.1) contrast(1.2);
}

.slider-title {
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
  margin: 0;
  line-height: 1.3;
}

/* Przyciski Nawigacyjne Slidera */
.slider-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(20, 20, 25, 0.8);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #ffffff;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 5;
  backdrop-filter: blur(8px);
  transition: background 0.2s ease, border-color 0.2s ease;
}

.slider-arrow:hover {
  background: rgba(255, 183, 0, 0.8);
  color: #000;
  border-color: #ffb700;
}

.slider-arrow.prev {
  left: -10px;
}

.slider-arrow.next {
  right: -10px;
}

/* ==========================================================
   RESPONSYWNOŚĆ (RWD)
   ========================================================== */
@media (max-width: 992px) {
  .organizer-card,
  .partner-card {
    flex-direction: column;
    align-items: flex-start;
    gap: 2rem;
    padding: 2rem;
  }

  .organizer-brand,
  .partner-brand {
    min-width: 100%;
  }

  .organizer-logo,
  .partner-logo {
    max-width: 200px;
  }

  .slider-card {
    flex: 0 0 200px;
    padding: 1.25rem 1rem;
  }
}
</style>