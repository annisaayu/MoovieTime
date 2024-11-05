<template>
  <div class="">
    <div class="min-h-full py-24 text-white">
      <MovieCarousel/>
      <Discover/>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IMovieAPIResponseList, Movie } from '@/interfaces/Movie';
// import { ref, onMounted } from 'vue'


const config = useRuntimeConfig()

const movies = ref<Movie[]>([])

onMounted(async () => {
  const response = await fetch('https://api.themoviedb.org/3/discover/movie?', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${config.public.tmdbAccessToken}`
    }
  })

  if(!response.ok) {
    alert('failed fetch data')
    return;
  }

  const data: IMovieAPIResponseList = await response.json()
  movies.value = data?.results ?? []
})
</script>
