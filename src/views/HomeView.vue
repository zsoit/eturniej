<script setup>
import { ref, onMounted } from 'vue'

const mainTournaments = ref([
  {
    id: 'lol',
    title: 'League of Legends',
    type: 'Turniej Główny (5v5)',
    time: '09:00 - 15:00',
    description: 'Starcie najlepszych drużyn w walce o tytuł Mistrza Koszalińskiego Dnia E-Sportu.',
    badge: 'Pula Nagród',
    accentColor: '#ffd700'
  },
  {
    id: 'fc',
    title: 'EA Sports FC 26',
    type: 'Konsolowe Starcia (1v1)',
    time: '10:00 - 16:00',
    description: 'Wirtualne emocje na murawie – turniej indywidualny na najnowszej generacji konsol.',
    badge: 'Open / Turniej 1v1',
    accentColor: '#00e5ff'
  },
  {
    id: 'cs',
    title: 'Counter-Strike 2',
    type: 'Szybkie Starcia (5v5)',
    time: '11:00 - 17:00',
    description: 'Dynamiczne starcia taktyczne. Precyzja, refleks i komunikacja na najwyższym poziomie.',
    badge: 'Turniej FPS',
    accentColor: '#ff453a'
  }
])

const extraZones = ref([
  {
    id: 'ftp',
    icon: '🎮',
    title: 'Strefa Free to Play',
    desc: 'Stanowiska z najnowszym sprzętem e-sportowym dostępne dla wszystkich odwiedzających.'
  },
  {
    id: 'stream',
    icon: '📡',
    title: 'Transmisja Live & Komentarz',
    desc: 'Na żywo z profesjonalnym komentarzem e-sportowym na naszym kanale Twitch.'
  },
  {
    id: 'cosplay',
    icon: '🏆',
    title: 'Pula Nagród & Puchary',
    desc: 'Unikalne trofea, nagrody rzeczowe od partnerów oraz certyfikaty dla zwycięzców.'
  }
])

// Inicjalizacja animacji pojawiania się przy scrollowaniu
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        // Odkomentuj poniższą linię, jeśli chcesz, aby animacja wykonała się tylko raz:
        // observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.15, // Element musi być widoczny w 15%, by odpalić animację
    rootMargin: "0px 0px -50px 0px"
  })

  document.querySelectorAll('.scroll-animate').forEach((el) => {
    observer.observe(el)
  })
})
</script>

<template>
  <div class="home-container">
    
    <!-- Hero Section z dużym logo i efektem GLITCH w tle -->
    <section class="hero-section">
      <div class="image-background-container">
        <!-- Zmieniono na ciemny, animowany glitch ze wskazanego zdjęcia -->
        <div class="bg-stock-image glitch-effect"></div>
        <div class="video-overlay"></div>
        <div class="cyber-grid-overlay"></div>
      </div>

      <div class="hero-content animate-fade-in">
        
        <!-- POWIĘKSZONE LOGO Z ANIMACJĄ -->
        <div class="large-logo-wrapper">
          <div class="logo-glow"></div>
          <img src="/logo1.png" alt="Koszaliński Dzień E-Sportu Logo" class="large-hero-logo" />
        </div>

        <div class="hero-badge-pill animate-pulse-badge">
          <span class="pill-dot"></span> Oficjalne Wydarzenie E-Sportowe Koszalina
        </div>

        <h1 class="hero-main-title">
          Koszaliński Dzień <br />
          <span class="gold-gradient-text">E-Sportu</span>
        </h1>

        <p class="hero-description">
          Największe święto graczy i pasjonatów technologii w regionie. Rywalizuj w League of Legends, EA Sports FC oraz CS2, kibicuj najlepszym i wygrywaj nagrody!
        </p>
        
        <div class="hero-cta-group">
          <router-link to="/aktualnosci" class="apple-button primary-gold">
            <span>Aktualności & Wpisowe</span>
            <span class="btn-arrow">→</span>
          </router-link>
          <a href="#turnieje" class="apple-button secondary-glass">
            Zobacz Turnieje
          </a>
        </div>

      </div>
    </section>

    <!-- Nowa Sekcja: Organizator (123concept) -->
    <section class="section-wrapper scroll-animate">
      <div class="section-heading">
        <span class="sub-heading-tag">Organizator Wydarzenia</span>
        <h2 class="main-heading">123concept</h2>
      </div>

      <div class="apple-glass-card organizer-card hover-glow-effect">
        <div class="organizer-brand">
          <h3 class="organizer-name">123concept</h3>
          <span class="organizer-badge">Agencja Eventowo-Technologiczna</span>
        </div>
        <div class="organizer-text">
          <p>
            Jako <strong>123concept</strong> od lat kreujemy niezapomniane doświadczenia, łącząc innowacyjne technologie z branżą rozrywkową. Jesteśmy dumnym pomysłodawcą i głównym organizatorem Koszalińskiego Dnia E-Sportu.
          </p>
          <p>
            Nasz zespół tworzą profesjonaliści i pasjonaci gamingu. Zapewniamy najwyższą jakość realizacji turniejowych, widowiskową oprawę wizualną oraz profesjonalne zaplecze techniczne – udowadniając, że lokalne inicjatywy potrafią dorównać standardom największych światowych aren e-sportowych. Tworzymy to wydarzenie z myślą o graczach, społeczności i rozwoju lokalnego rynku technologicznego.
          </p>
        </div>
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

    <!-- Dodatkowe Strefy & Atrakcje (Apple Bento Grid) -->
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
/* Główny kontener sekcji Hero z obrazem w tle */
.hero-section {
  position: relative;
  width: 100%;
  min-height: 85vh; /* Wysokość sekcji */
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px 10px;
  
  /* Obraz w tle + ciemny gradient nakładkowy dla czytelności tekstu */
  background-image: linear-gradient(
      to bottom, 
      rgba(10, 10, 13, 0.6) 0%, 
      rgba(10, 10, 13, 0.9) 100%
    ), 
    url('/tlo.png'); /* Podmień na ścieżkę do swojego pliku */
    
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

/* Styl dla zawartości wewnątrz sekcji */
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
</style>