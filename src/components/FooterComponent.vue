<script setup>
// Komponent stopki statycznej (lub sticky na dole strony)
</script>

<template>
  <footer class="apple-footer-container">
    <div class="footer-content">
      
      <!-- Górna sekcja: Organizator oraz Social Media / Kontakt -->
      <div class="footer-top">
        <div class="organizer-section">
          <span class="footer-label">Organizator</span>
          <div class="organizer-logo-box">
            <!-- Tutaj możesz podmienić na tag <img> z logo ZS1KEX -->
            <span class="logo-text">123<span class="highlight">concept</span></span>
          </div>
        </div>

        <div class="social-links">
          <!-- E-mail -->
          <a href="mailto:kontakt@eturniej.pl" class="social-icon-btn" aria-label="Email">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </a>
          <!-- Facebook -->
          <a href="https://facebook.com" target="_blank" rel="noopener" class="social-icon-btn" aria-label="Facebook">
            <svg class="icon" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
          </a>
          <!-- Instagram -->
          <a href="https://instagram.com" target="_blank" rel="noopener" class="social-icon-btn" aria-label="Instagram">
            <svg class="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" stroke-width="1.5"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" stroke-linecap="round" stroke-width="2"/></svg>
          </a>
          <!-- Twitch -->
          <a href="https://twitch.tv" target="_blank" rel="noopener" class="social-icon-btn" aria-label="Twitch">
            <svg class="icon" fill="currentColor" viewBox="0 0 24 24"><path d="M11.64 5.93h1.42v4.26h-1.42M17.02 5.93h1.42v4.26h-1.42M3.56 2.13L1.42 5.68v14.2h5.68V21.8h2.84l2.84-2.84h4.26l4.97-4.97V2.13H3.56zm17.02 12.06l-3.55 3.55h-4.26l-2.84 2.84v-2.84H6.38V4.26h14.2v9.93z"/></svg>
          </a>
        </div>
      </div>

      <!-- Separator w stylu Apple (subtelna linia świetlna) -->
      <div class="footer-divider"></div>

      <!-- Dolna sekcja: Disclaimer prawny oraz Realizacja -->
      <div class="footer-bottom">
   

        <div class="realization-section">
          <span class="footer-label">Realizacja</span>
          <a href="https://achtelik.com.pl" target="_blank" rel="noopener" class="kadet-logo">
            <span class="kadet-icon">⟨/⟩</span> <span class="highlight-kadet">achtelik</span><span class="net">.com.pl</span>
          </a>
        </div>
      </div>

    </div>
  </footer>
</template>

<style scoped>
/* Główny kontener stopki (Liquid Glass Dark & Gold) */
.apple-footer-container {
  width: 100%;
  background: var(--apple-bg-header, rgba(5, 5, 7, 0.9));
  backdrop-filter: blur(40px) saturate(200%);
  -webkit-backdrop-filter: blur(40px) saturate(200%);
  border-top: 1px solid var(--apple-border, rgba(255, 255, 255, 0.08));
  box-shadow: 0 -15px 35px rgba(0, 0, 0, 0.8);
  font-family: -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
  color: var(--apple-text-muted, #d1d1d6);
  padding: 40px 0;
  margin-top: auto; /* Pomaga w pozycjonowaniu jako sticky/flex footer */
  z-index: 100;
}

.footer-content {
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

/* Górna sekcja */
.footer-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.organizer-section {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.footer-label {
  font-size: 11px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #86868b;
}

.logo-text {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: -0.02em;
  color: #ffffff;
}

.logo-text .highlight {
  color: var(--accent-gold, #ffd700);
  text-shadow: 0 0 12px var(--accent-gold-text-glow, rgba(255, 215, 0, 0.4));
}

/* Ikony społecznościowe w kółkach Liquid Glass */
.social-links {
  display: flex;
  gap: 14px;
}

.social-icon-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f5f5f7;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.social-icon-btn .icon {
  width: 20px;
  height: 20px;
}

.social-icon-btn:hover {
  background: var(--accent-gold-glow, rgba(255, 215, 0, 0.12));
  border-color: var(--accent-gold, #ffd700);
  color: var(--accent-gold, #ffd700);
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255, 215, 0, 0.25);
}

/* Linia oddzielająca */
.footer-divider {
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0) 100%);
}

/* Dolna sekcja */
.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-wrap: wrap;
  gap: 24px;
}

.disclaimer-text {
  font-size: 11px;
  line-height: 1.5;
  color: #86868b;
  max-width: 750px;
  margin: 0;
}

.realization-section {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 6px;
}

.kadet-logo {
  text-decoration: none;
  font-size: 16px;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: opacity 0.2s;
}

.kadet-icon {
  color: var(--accent-gold, #ffd700);
  font-weight: 900;
}

.highlight-kadet {
  color: #ffffff;
}

.kadet-logo .net {
  color: #86868b;
}

.kadet-logo:hover {
  opacity: 0.85;
}

/* Responsywność dla urządzeń mobilnych */
@media (max-width: 768px) {
  .footer-content {
    padding: 0 20px;
  }
  .footer-top, .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
  }
  .realization-section {
    align-items: flex-start;
  }
}
</style>