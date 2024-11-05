<!-- components/Navbar.vue -->
<template>
  <nav class="bg-background-dark text-text-subheading p-4">
    <div class="container mx-auto flex justify-between items-center">
      <div class="text-xs">&copy; {{ currentYear }} Moovietime. All rights reserved.</div>
      <img src="/images/moovietime-logo-grey.svg"/>
      <div class="text-xs">Made width Nuxt</div>
    </div>
  </nav>
</template>


<script lang="ts">
// import { defineComponent } from 'vue';

export default defineComponent({
  name: "Footer",
  data() {
    return {
      currentYear: new Date().getFullYear()
    }
  }
})

</script>
