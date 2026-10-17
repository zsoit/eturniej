<script setup>
import MenuComponent from '@/components/MenuComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div class="app-layout">
    <MenuComponent />
    
    <main class="main-content">
      <router-view />
    </main>

    <FooterComponent />
  </div>
</template>

<style>
.app-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: #030305;
  color: #f5f5f7;
}

.main-content {
  flex: 1;
  padding-top: 90px;
}
</style>