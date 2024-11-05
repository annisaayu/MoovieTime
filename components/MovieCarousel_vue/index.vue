<!-- MovieCarousel.vue -->
<template>
  <div class="relative w-full h-full overflow-hidden">
    <div class="flex items-center justify-between w-full h-full px-4 py-8 overflow-x-auto scroll-smooth">
      <MovieCard
        v-for="movie in trendingMovies"
        :key="movie.id"
        :movie="movie"
        :active="activeMovieIndex === movie.id"
        @click="handleMovieClick"
        @select="handleMovieSelect"
        @hover="handleMovieHover"
      />
    </div>
    <div class="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
      <span
        v-for="(movie, index) in trendingMovies"
        :key="index"
        class="w-2 h-2 rounded-full bg-gray-400 cursor-pointer"
        :class="{ 'bg-red-500': activeMovieIndex === movie.id }"
        @click="activeMovieIndex = movie.id"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import MovieCard from './MovieCard.vue';
import type { IMovieAPIResponseList, Movie } from '~/interfaces/Movie';

const activeMovieIndex = ref(0);
const selectedMovie = ref<Movie | null>(null);


const config = useRuntimeConfig()

const trendingMovies = ref<Movie[]>([])


onMounted(async () => {
  const response = await fetch('https://api.themoviedb.org/3/discover/movie?', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${config.public.tmdbAccessToken}`
    }
  })

  if (!response.ok) {
    console.error('Error fetching data:', response.statusText);
    return;
  }

  const data: IMovieAPIResponseList = await response.json()

  trendingMovies.value = data?.results ?? []
})
const handleMovieClick = (movie: Movie) => {
  selectedMovie.value = movie;
  emit('movieSelected', movie);
};

const handleMovieSelect = (id: number) => {
  activeMovieIndex.value = id;
};

const handleMovieHover = (id: number) => {
  console.log('Movie hovered:', id);
};

const emit = defineEmits<{
  'movieSelected': [movie: Movie],
  'indexChanged': [index: number]
}>();
</script>