<script setup>
import { RouterView } from 'vue-router';
import AppNavbar from '@/components/layout/AppNavbar.vue';
import AppSidebar from '@/components/layout/AppSidebar.vue';
</script>

<template>
  <AppNavbar />

  <div class="d-md-flex app-layout">
    <aside class="bg-body-tertiary border-end sidebar">
      <AppSidebar />
    </aside>

    <main
      id="conteudo"
      class="flex-grow-1 app-content"
    >
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
@media (min-width: 768px) {
  .sidebar {
    width: 200px;
    flex-shrink: 0;
  }
}
</style>
