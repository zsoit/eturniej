<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const rawMenuData = ref([])
const loading = ref(true)
const error = ref(null)

// Stany otwartych podmenu (dla JS hover) oraz menu mobilnego
const activeDropdowns = ref({})
const isMobileMenuOpen = ref(false)

const fetchMenu = async () => {
  try {
    const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8989'
    const response = await fetch(`${API_BASE_URL}/menu`)
    if (!response.ok) throw new Error(`Błąd HTTP: ${response.status}`)
    const result = await response.json()
    if (result.status === 'success') {
      rawMenuData.value = result.data
    } else {
      throw new Error('API zwróciło nieudany status')
    }
  } catch (err) {
    error.value = err.message
    console.error('Nie udało się pobrać menu:', err)
  } finally {
    loading.value = false
  }
}

const hierarchicalMenu = computed(() => {
  const map = {}
  const roots = []

  rawMenuData.value.forEach(item => {
    map[item.id] = { ...item, children: [] }
  })

  rawMenuData.value.forEach(item => {
    const node = map[item.id]
    if (item.parent_id && map[item.parent_id]) {
      map[item.parent_id].children.push(node)
    } else {
      roots.push(node)
    }
  })

  const sortNodes = (nodes) => {
    nodes.sort((a, b) => parseInt(a.sort_order) - parseInt(b.sort_order))
    nodes.forEach(node => {
      if (node.children.length > 0) sortNodes(node.children)
    })
  }

  sortNodes(roots)
  return roots
})

// === LOGIKA JS HOVER DLA CAŁEGO ELEMENTU ===
const handleMouseEnter = (id) => {
  activeDropdowns.value[id] = true
}

const handleMouseLeave = (id) => {
  activeDropdowns.value[id] = false
}

// Zamknięcie podmenu po kliknięciu w dowolny link
const closeDropdown = (id) => {
  activeDropdowns.value[id] = false
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
  document.body.style.overflow = isMobileMenuOpen.value ? 'hidden' : 'auto'
}

const isItemActive = (item) => {
  if (route.path === item.path) return true
  if (item.path !== '/' && route.path.startsWith(item.path)) return true
  return false
}

onMounted(() => {
  fetchMenu()
})
</script>

<template>
  <header class="apple-header">
    <div class="apple-nav-container">
      
      <!-- Logo z grafiką /logo1.png -->
        <router-link to="/" class="apple-logo">
          <img src="/logo1.png" alt="eTurniej Koszalin" class="logo-image" />
          kodes.info.pl
          <!-- <span class="logo-text">eTurniej Koszalin</span> -->
      </router-link>

      <div v-if="loading" class="nav-status">Ładowanie...</div>
      <div v-else-if="error" class="nav-status error">Błąd API</div>

      <!-- Desktop Navigation Menu -->
      <nav v-else class="desktop-nav">
        <ul class="desktop-menu-list">
          <!-- Nasłuchujemy mouseenter i mouseleave na CAŁYM <li> -->
          <li 
            v-for="item in hierarchicalMenu" 
            :key="item.id" 
            class="desktop-menu-item"
            @mouseenter="handleMouseEnter(item.id)"
            @mouseleave="handleMouseLeave(item.id)"
          >
            
            <div 
              class="desktop-link-wrapper" 
              :class="{ 
                'has-active-child': isItemActive(item),
                'is-hovered': activeDropdowns[item.id]
              }"
            >
              <router-link 
                :to="item.path" 
                class="apple-link"
                @click="closeDropdown(item.id)"
              >
                {{ item.title }}
              </router-link>

              <span 
                v-if="item.children && item.children.length > 0" 
                class="desktop-arrow-btn"
                :class="{ 'rotated': activeDropdowns[item.id] }"
              >
                ▲
              </span>
            </div>

            <!-- Podmenu wyświetlane gdy JS uaktywni stan dla danego id -->
            <ul 
              v-if="item.children && item.children.length > 0" 
              class="desktop-submenu"
              :class="{ 'show': activeDropdowns[item.id] }"
            >
              <li v-for="child in item.children" :key="child.id">
                <router-link 
                  :to="child.path" 
                  class="apple-link sub-link"
                  @click="closeDropdown(item.id)"
                >
                  {{ child.title }}
                </router-link>
              </li>
            </ul>

          </li>
        </ul>
      </nav>

      <!-- Hamburger Button (Mobile) -->
      <button 
        class="hamburger-btn" 
        @click="toggleMobileMenu" 
        :aria-expanded="isMobileMenuOpen"
        aria-label="Menu"
      >
        <span class="icon-bar" :class="{ 'top-x': isMobileMenuOpen }"></span>
        <span class="icon-bar" :class="{ 'bottom-x': isMobileMenuOpen }"></span>
      </button>

    </div>

    <!-- Mobile Fullscreen Overlay -->
    <div class="mobile-overlay" :class="{ 'open': isMobileMenuOpen }">
      <div class="mobile-menu-inner">
        <ul class="mobile-menu-root">
          <li v-for="item in hierarchicalMenu" :key="item.id" class="mobile-menu-item">
            
            <div class="mobile-item-row" :class="{ 'has-active-child': isItemActive(item) }">
              <router-link 
                :to="item.path" 
                class="mobile-link" 
                @click="toggleMobileMenu(); closeDropdown(item.id);"
              >
                {{ item.title }}
              </router-link>
              <button 
                v-if="item.children && item.children.length > 0" 
                @click="activeDropdowns[item.id] = !activeDropdowns[item.id]"
                class="mobile-toggle-btn"
              >
                {{ activeDropdowns[item.id] ? '−' : '+' }}
              </button>
            </div>

            <ul 
              v-if="item.children && item.children.length > 0" 
              class="mobile-submenu"
              :class="{ 'open': activeDropdowns[item.id] }"
            >
              <li v-for="child in item.children" :key="child.id">
                <router-link 
                  :to="child.path" 
                  class="mobile-link sub-mobile-link" 
                  @click="toggleMobileMenu(); closeDropdown(item.id);"
                >
                  {{ child.title }}
                </router-link>
              </li>
            </ul>

          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
@import '@/assets/css/apple-menu.css';
</style>