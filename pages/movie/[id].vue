<template>
  <div>
    <img :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"/>
    <h1 class="text-3xl font-bold">{{ movie?.title }}</h1>
    <h4>Overview</h4>
    <p class="mt-2">{{ movie?.overview }}</p>

    <h4 class="mt-4">Reviews</h4>
    <div v-for="review in reviews" :key="review.id" class="mt-4 mr-4">
      <p>{{ review.author_details.username }}</p>
      <p>{{ review.content }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import type { Movie } from '~/interfaces/Movie';

const route = useRoute()
const movie = ref<Movie>({})
const reviews = ref([])
const config = useRuntimeConfig()

onMounted(async () => {
  const { id } = route.params
  movie.value = await $fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${config.public.tmdbAccessToken}`
    }
  })
  const { results } = await $fetch(`https://api.themoviedb.org/3/movie/${id}/reviews`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${config.public.tmdbAccessToken}`
    }
  })


  reviews.value = results ?? []
})
</script>
