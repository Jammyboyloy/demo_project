<template>
  <div class="layout">
    <SideBars />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import SideBars from '@/components/SideBars.vue';
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: auto 1fr; /* EXACT like your HTML */
  min-height: 100vh;
  background-color: #11121a;
  color: #e6e6ef;
}

main {
  padding: min(30px, 7%);
}

/* Mobile layout */
@media (max-width: 800px) {
  .layout {
    grid-template-columns: 1fr;
  }
}
</style>
