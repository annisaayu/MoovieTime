<!-- layouts/default.vue -->
<template>
  <div class="bg-darkgrey">
    <Navbar />
    <div class="min-h-screen">
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from '~/components/Navbar.vue';
import Footer from '~/components/Footer.vue';
</script>
