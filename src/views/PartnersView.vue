<template>
  <section class="partners-container">
    <div class="partners-wrapper">
      <h2 class="main-title">Nasi Partnerzy</h2>

      <!-- Lista partnerów posortowana po id (logo po lewej, opis po prawej) -->
      <div class="partners-list">
        <component
          :is="partner.website !== '#' ? 'a' : 'div'"
          v-for="partner in sortedPartners"
          :key="partner.id"
          :id="`partner-${partner.id}`"
          :href="partner.website !== '#' ? partner.website : undefined"
          :target="partner.website !== '#' ? '_blank' : undefined"
          rel="noopener noreferrer"
          class="partner-card-horizontal apple-glass-card hover-glow-effect"
        >
          <!-- Lewa strona: Proporcjonalnie większe zdjęcie (logo) -->
          <div class="partner-content-left">
            <img
              :src="partner.logo_url"
              :alt="`Logo ${partner.name}`"
              class="partner-logo-img"
            />
          </div>

          <!-- Prawa strona: Opis -->
          <div class="partner-content-right">
            <span class="partner-badge">{{ partner.category }}</span>
            <h3 class="partner-title">{{ partner.name }}</h3>
            <p class="partner-description">{{ partner.description || 'Opis wkrótce...' }}</p>
          </div>
        </component>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

export interface Partner {
  id: number
  name: string
  category: string
  logo_url: string
  type: string
  website: string
  description?: string
}

// Baza dedykowanych opisów dopasowana po 'type'
const partnerDescriptions: Record<string, string> = {
  'ministerstwo-cyfryzacji': 'Ministerstwo Cyfryzacji (MC) to polski urząd administracji rządowej odpowiedzialny za informatyzację, rozwój usług cyfrowych (takich jak aplikacja mObywatel) oraz cyberbezpieczeństwo Rzeczypospolitej Polskiej. Siedziba resortu mieści się przy ul. Królewskiej 27 w Warszawie. Sekretarzem stanu w Ministerstwie jest Rafał Rosiński, który objął Patronat nad naszą imprezą.',
  'edu-day': 'Targi Edukacyjne dla Maturzystów Edu Day organizowane są w 14 miastach Północnej Polski. Są to największe targi tego typu w tym rejonie kraju. Pierwsze targi odbyły się w 2015 roku w Koszalinie. Dziś jesteśmy obecni także w Szczecinie, Stargardzie, Słupsku, Szczecinku, Kołobrzegu, Lęborku, Kwidzynie, Tczewie, Starogardzie Gdańskim, Pile, Chojnicach i Gorzowie Wielkopolskim.',
  
  'pk': 'Politechnika Koszalińska to największa państwowa uczelnia techniczna na Pomorzu Środkowym, założona 8 czerwca 1968 roku (początkowo jako Wyższa Szkoła Inżynierska). Status politechniki oraz obecną nazwę zyskała 1 września 1996 roku. Stanowisko rektora uczelni piastuje dr hab. Danuta Zawadzka, prof. PK. Politechnika Koszalińska jest także partnerem technologicznym 2. Koszalińskiego Dnia E - Sportu.',
  
  'zs1': '„Ekonom” w Koszalinie to potoczna nazwa Zespołu Szkół nr 1 im. Mikołaja Kopernika, jednej z najstarszych i najbardziej renomowanych szkół zawodowych oraz średnich w mieście. Placówka została założona 4 września 1945 roku jako Gimnazjum Kupieckie, a w czerwcu 2026 roku hucznie obchodziła swój jubileusz 80-lecia. Szkoła mieści się w charakterystycznym, zabytkowym budynku z czerwonej cegły.',
 
  'weii-pk': "description: 'Wydział Elektroniki i Informatyki Politechniki Koszalińskiej (WEiI) to jeden z wiodących i najbardziej dynamicznie rozwijających się wydziałów uczelni, kształcący specjalistów dla nowoczesnego sektora wysokich technologii (ICT).'",

  'gordon': "Gordon GWR (Hubert Blejch) to ceniony twórca treści technologicznych, pasjonat modingu oraz bezkompromisowy ekspert w dziedzinie sprzętu komputerowego. Pochodzący z Koszalina streamer i edukator dał się poznać szerszej publiczności przede wszystkim jako dwukrotny rekordzista Księgi Rekordów Guinnessa w najdłuższym maratonie gier komputerowych oraz mobilnych. Jego gigantyczne wyzwania gamingowe, sięgające ponad 136 godzin ciągłej rozgrywki, dowiodły nie tylko niezwykłej wytrwałości, ale także ogromnego zaangażowania w sztukę elektronicznej rozrywki. Hubert to również triumfator prestiżowego konkursu x-kom PC Masters Challenge, gdzie zaprezentował mistrzowskie tempo i precyzję w ekspresowym montażu komputerów. W swojej twórczości płynnie łączy wiedzę inżynieryjną z unikalnym zmysłem artystycznym, tworząc zjawiskowe, motywiczne zestawy PC inspirowane popkulturą, światem gier oraz kulturą popularną. Każda z jego konstrukcji cechuje się dbałością o najdrobniejszy detal, zaawansowanym ułożeniem przewodów oraz autorskim podejściem do modyfikacji obudów i podzespołów. W procesie twórczym chętnie wykorzystuje technologię druku 3D, projektując dedykowane akcesoria, trofea oraz użytkowe elementy wyposażenia stanowiska. Oprócz entuzjazmu dla świata nowych technologii, Hubert jest niezwykle aktywnym społecznikiem i promotorem lokalnych inicjatyw w swoim rodzinnym mieście. Z pasją angażuje się w rozwój i popularyzację disc golfa oraz rolkarstwa, kładąc szczególny nacisk na bezpieczeństwo i aktywny tryb życia. Prywatnie jest miłośnikiem zwierząt i pasjonatem fotografii produktowej, w której uwiecznia efektowne efekty swojej pracy technicznej. Dzięki otwartemu podejściu, profesjonalizmowi oraz niesłabnącej energii, Gordon GWR inspiruje tysiące widzów do rozwijania własnych pasji technologicznych i sportowych."
}

// Surowe dane z tablicy JavaScript
const rawPartners: Partner[] = [
  {
    id: 1,
    name: "Ministerstwo Cyfryzacji",
    category: "Główny Partner Sektora Publicznego",
    logo_url: "partners/ministerstwo.png",
    type: "ministerstwo-cyfryzacji",
    website: "https://www.gov.pl/web/cyfryzacja"
  },
  {
    id: 14,
    name: "Edu Day",
    category: "Sponsorzy",
    logo_url: "partners/edu-day.png",
    type: "edu-day",
    website: "https://eduday.pl/"
  },
  {
    id: 15,
    name: "Entevo",
    category: "Sponsorzy",
    logo_url: "partners/entevo.png",
    type: "entevo",
    website: "https://entevo.pl/"
  },
  // {
  //   id: 16,
  //   name: "radio eska",
  //   category: "Patroni medialni",
  //   logo_url: "partners/eska.",
  //   type: "eska",
  //   website: "https://www.eska.pl/"
  // },
  // {
  //   id: 17,
  //   name: "TVP3",
  //   category: "Patroni medialni",
  //   logo_url: "src/assets/logo_url_6ace4231a2e4d.png",
  //   type: "tvp3",
  //   website: "https://regiony.tvp.pl/"
  // },
  {
    id: 18,
    name: "Koszalin - Centrum Pomorza",
    category: "Patronat",
    logo_url: "partners/koszalin.png",
    type: "koszalin",
    website: "https://koszalin.pl/"
  },
  {
    id: 2,
    name: "Politechnika Koszalińska",
    category: "Główni Partnerzy Sektora Edukacji",
    logo_url: "partners/pk.png",
    type: "pk",
    website: "https://tu.koszalin.pl"
  },
  {
    id: 3,
    name: "Wydział Elektroniki i Informatyki Politechniki Koszalińskiej",
    category: "Główni Partnerzy Sektora Edukacji",
    logo_url: "partners/pk-weii.png",
    type: "weii-pk",
    website: "https://tu.koszalin.pl/weii"
  },
  {
    id: 21,
    name: "Zespół Szkół nr 1 im. Mikołaja Kopernika w Koszalinie",
    category: "Główni Partnerzy Sektora Edukacji",
    logo_url: "partners/zs-kopernik.png",
    type: "zs1",
    website: "http://www.ekonom.koszalin.pl/"
  },
  {
    id: 22,
    name: "Miasto Koszalin",
    category: "Patronat",
    logo_url: "partners/koszalin_kon.png",
    type: "koszalin-miasto",
    website: "https://koszalin.pl"
  },
  {
    id:25,
    name: "Gordon",
    category: "Ekspert Technologiczny",
    logo_url: "/gordon.jpg",
    website: ".",
    type: "gordon"
  }
].map(partner => ({
  ...partner,
  description: partnerDescriptions[partner.type] || ''
}))

const partners = ref<Partner[]>(rawPartners)

// Sortowanie wyłącznie rosnąco po id (bez podziału na kategorie)
const sortedPartners = computed(() => {
  return [...partners.value].sort((a, b) => a.id - b.id)
})
</script>

<style scoped>
@import '@/assets/css/partners.css';

.partners-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.partner-card-horizontal {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  text-decoration: none;
  color: inherit;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  transition: all 0.3s ease;
}

.partner-card-horizontal:hover {
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

/* Lewa strona: powiększony kontener na logo */
.partner-content-left {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 240px;
  max-width: 300px;
  padding-right: 20px;
  border-right: 1px solid rgba(255, 255, 255, 0.06);
}

/* Powiększone logo z zachowaniem proporcji */
.partner-logo-img {
  width: 100%;
  max-height: 140px;
  object-fit: contain;
}

/* Prawa strona: opis */
.partner-content-right {
  flex: 1;
  padding-left: 32px;
}

.partner-badge {
  display: inline-block;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #fbbf24;
  margin-bottom: 10px;
  font-weight: 600;
}

.partner-title {
  font-size: 1.4rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #ffffff;
}

.partner-description {
  font-size: 1rem;
  color: #9ca3af;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 768px) {
  .partner-card-horizontal {
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
  }

  .partner-content-left {
    width: 100%;
    max-width: 100%;
    min-width: unset;
    padding-right: 0;
    padding-bottom: 16px;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    margin-bottom: 16px;
    justify-content: flex-start;
  }

  .partner-content-right {
    padding-left: 0;
  }

  .partner-logo-img {
    max-height: 100px;
  }
}
</style>