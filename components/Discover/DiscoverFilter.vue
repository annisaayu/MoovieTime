<template>
  <div class="discover-filter py-4 text-white bg-gradient-to-b from-custom-color to-custom-color-2 rounded-md">
    <div class="px-6 border-bottom-opc">
      <h2 class="text-lg font-semibold mb-4">Sort Result By</h2>
    </div>

    <div class="px-6 py-4 border-bottom-opc">
      <select v-model="selectedSort" @change="onSortChange" class="w-full p-2 rounded bg-gray-800 text-white mt-2 mb-4">
        <option value="popularity.desc">Popularity</option>
        <option value="vote_average.desc">Ratings</option>
        <option value="primary_release_date.desc">Release Date</option>
      </select>
    </div>

    <div class="px-6 border-bottom-opc">
      <h2 class="text-lg font-semibold my-4">Genres</h2>
    </div>

    <div class="p-6">
      <div v-for="genre in genres" :key="genre.id" class="mb-2">
        <label class="inline-flex justify-between w-full">
          <span>{{ genre.name }}</span>
          <input type="checkbox" :value="genre.id" v-model="selectedGenres" @change="onFilterChange" />
        </label>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Genre, IGenreAPIResponseList } from '~/interfaces/Genre';

const config = useRuntimeConfig()

const selectedSort = ref('popularity.desc');
const selectedGenres = ref<number[]>([]);
const genres = ref<Genre[]>([]);

const emit = defineEmits(['updateSort', 'updateFilter']);

onMounted(async () => {
  const response = await fetch('https://api.themoviedb.org/3/genre/movie/list', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${config.public.tmdbAccessToken}`
    }
  })

  if(!response.ok) {
    alert('failed fetch genre')
    return;
  }

  const data: IGenreAPIResponseList = await response.json()
  genres.value = data?.genres ?? []
})
const onSortChange = () => emit('updateSort', selectedSort.value);
const onFilterChange = () => emit('updateFilter', selectedGenres.value);
</script>

<style scoped>
.border-bottom-opc {
  border-bottom: 1px solid #FFFFFF12;
}
</style>
