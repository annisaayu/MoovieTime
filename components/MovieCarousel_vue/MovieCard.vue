<!-- MovieCard.vue -->
<template>
  <div 
    class="flex-shrink-0 w-64 mx-2 overflow-hidden rounded-lg shadow-lg transition-all duration-300 ease-in-out cursor-pointer"
    :class="{ 'scale-105': active }"
    @click="handleClick"
  >
    <img 
      :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`"
      :alt="movie.title"
      class="w-full h-96 object-cover"
    >
    <div class="p-4 bg-white">
      <h3 class="text-xl font-bold mb-2">{{ movie.title }}</h3>
      <div class="flex justify-between items-center mb-2">
        <span class="text-sm text-gray-600">{{ new Date(movie.release_date).getFullYear() }}</span>
        <span class="text-sm font-semibold text-yellow-500">⭐ {{ movie.vote_average }}</span>
      </div>
      <span class="inline-block px-2 py-1 text-xs font-semibold text-gray-700 bg-gray-200 rounded-full mb-2">
        <!-- {{ movie.genre_id }} -->
      </span>
      <p class="text-sm text-gray-600 line-clamp-3">{{ movie.overview }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Movie } from '~/interfaces/Movie';


interface Props {
  movie: Movie;
  active: boolean;
}

const props = defineProps<Props>();

// Define emits
const emit = defineEmits<{
  'click': [movie: Movie],
  'select': [id: number],
  'hover': [id: number]
}>();

const handleClick = () => {
  emit('click', props.movie);
  emit('select', props.movie.id);
};
</script>