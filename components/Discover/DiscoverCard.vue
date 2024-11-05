<template>
  <div class="discover-cards grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-4 p-0">
    <div v-for="movie in movies" :key="movie.id" class="movie-card group">
      <div class="img-card bg-background-transparent relative rounded overflow-hidden min-w-48 max-h-[370px] min-h-[370px] flex items-center justify-center">
        <img :src=" movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '/images/moovietime-logo-grey@2x.png'" :alt="movie.title" class="w-full h-full object-cover" />

        <div class="absolute py-8 inset-0 flex flex-col items-center justify-around gap-2 opacity-0 group-hover:opacity-100 bg-black-80 transition-opacity duration-300">
          <span class="flex text-2xl font-bold">
            <img src="/images/Star.png" class="mr-2" />
            {{ Number(movie.vote_average.toFixed(1)) }}
          </span>
          <p class="px-3 text-lg text-center font-bold">{{ movie.genre_names ? movie.genre_names.join(", ") : ""}}</p>
          <div class="flex flex-col items-center justify-center gap-4 ">
            <button 
              @click="goToDetail(movie.id, movie.original_title)" 
              class="px-10 py-1 bg-red text-white rounded-full font-semibold hover:bg-red-700"
            >
              VIEW
            </button>
            <button 
              v-if="!addedMovieIDs?.includes(movie.id)"
              @click="addMovie(movie)" 
              class="px-10 py-1 border border-white text-white rounded-full font-semibold hover:bg-darkgrey"
            >
              ADD
            </button>
            <button 
              v-else
              @click="addMovie(movie)" 
              class="px-10 py-1 border border-white bg-green-200 text-green rounded-full font-semibold"
            >
              ADDED
            </button>
          </div>
        </div>

        <span class="absolute rating top-0 right-0 bg-background-accent2 text-white px-2 py-1 text-sm font-semibold group-hover:opacity-0">{{ Number(movie.vote_average.toFixed(1)) }}</span>
      </div>
      <h3 class="text-text-heading font-semibold mt-2">{{ movie.title }}</h3>
      <span class="text-text-subheading">{{ new Date(movie.release_date).getFullYear() }}</span>
    </div>

    <div class="col-span-full flex justify-center mt-4">
      <button @click="loadMoreMovies" class="px-14 py-2 bg-red text-white rounded-full font-semibold hover:bg-red-700">
        Load More
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';
import type { Movie } from '@/interfaces/Movie';

const router = useRouter();
const emit = defineEmits(["onAddMovie"])

const props = defineProps({
  movies: {
    type: Array as () => Movie[],
    required: true,
  },
  fetchMoreMovies: {
    type: Function,
    required: true,
  },
  addedMovieIDs: {
    type: Array as () => number[],
  },
});

const loadMoreMovies = () => props.fetchMoreMovies();

const addMovie = (movie:Movie) => {
  emit("onAddMovie", movie.id)
  console.log(`Added movie: ${movie.title}`);
};

const removeSpecialCharacters = (input:string) => {
  return input.replace(/[^a-zA-Z0-9 ]/g, '').trim();
}

const goToDetail = (movieId:number, title:string) => {
  let newTitle= removeSpecialCharacters(title).split(" ").join("-").toLocaleLowerCase()
  router.push(`/movie/${movieId}-${newTitle}`);
};
</script>

<style scoped>
.img-card img {
  transition: transform 0.3s ease-in-out;
}
.img-card:hover img {
  transform: scale(1.05);
}

.movie-card .text-text-heading,
.movie-card .text-text-subheading {
  transition: color 0.3s ease-in-out;
}
</style>
