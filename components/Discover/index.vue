<template>
  <div class="relative mt-14">
    <div class="discover relative container mx-auto pt-10 z-10">
      <div class="flex justify-between px-4">
        <div>
          <div class="strip mb-3"></div>
          <h1 class="text-2xl font-bold">Discover Movies</h1>
        </div>
        <div class="flex gap-2 items-center">
          <p>My Movies</p>
          <div class="rounded-full text-text-heading bg-black-20 py-1 px-3">
            <strong>{{ addedMovieIDs.length }}</strong> {{addedMovieIDs.length > 1 ? "movies" : "movie"}}
          </div>
        </div>
      </div>
      <div class="discover-page flex mt-10">
        <div class="w-1/5 p-4">
          <DiscoverFilter 
            @updateSort="updateSort" 
            @updateFilter="updateFilter" 
          />
        </div>

        <div class="w-4/5 p-4">
          <DiscoverCard 
            :movies="filteredMovies" 
            :fetchMoreMovies="loadMoreMovies" 
            @onAddMovie="onAddMovie"
            :addedMovieIDs="addedMovieIDs"
          />
        </div>
      </div>
    </div>
    <div class="ml-4 accent absolute top-0 w-full h-[300px] bg-background-transparent"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import DiscoverFilter from './DiscoverFilter.vue';
import DiscoverCard from './DiscoverCard.vue';
import type { Movie } from '~/interfaces/Movie';
import type { Genre } from '~/interfaces/Genre';

const movies = ref<Movie[]>([]);
const currentPage = ref(1);
const selectedSort = ref('popularity');
const selectedGenres = ref<number[]>([]);
const genres  = ref<Genre[]>([]);
const config = useRuntimeConfig()
const addedMovieIDs = ref<number[]>([])

const getGenres = async() => {
  const genresResponse = await fetch('https://api.themoviedb.org/3/genre/movie/list', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${config.public.tmdbAccessToken}`
    }
  })
  const genresData = await genresResponse.json();
  genres.value = genresData.genres
  return genresData.genres;
}

const fetchMovies = async () => {
  try {
    const genreQuery = selectedGenres.value.join(',');
    const response = await fetch(`https://api.themoviedb.org/3/discover/movie?page=${currentPage.value}&sort_by=${selectedSort.value}&with_genres=${genreQuery}&language=en-US`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${config.public.tmdbAccessToken}`
    }
  });
    let listGenre = genres.value
    if (listGenre.length === 0) {
      listGenre  = await getGenres()
    }

    const genreMap: Record<number, string> = {};
    listGenre.forEach((genre: Genre) => {
      genreMap[genre.id] = genre.name;
    });
    
    const data = await response.json();
    let listMovie = data.results;
    listMovie = listMovie.map((mv: Movie) => ({
      ...mv,
      genre_names: mv.genre_ids.map(id => genreMap[id] || 'Unknown')
    }))
    movies.value = [...movies.value, ...listMovie];
  } catch (error) {
    console.error('Failed to fetch movies:', error);
  }
};

const onAddMovie = async (id:number) => {
  let movieIds = addedMovieIDs.value
  if(movieIds.includes(id)) {
    movieIds = movieIds.filter((mID:number) => mID !== id)
  } else {
    movieIds = [...movieIds, id]
  }
  addedMovieIDs.value = [...movieIds]
}

const loadMoreMovies = () => {
  currentPage.value += 1;
  fetchMovies();
};

const updateSort = (sort:any) => {
  selectedSort.value = sort;
  currentPage.value = 1;
  movies.value = [];
  fetchMovies();
};

const updateFilter = (genres:number[]) => {
  selectedGenres.value = genres;
  currentPage.value = 1;
  movies.value = [];
  fetchMovies();
};

const filteredMovies = computed(() => movies.value);

onMounted(fetchMovies);
</script>

<style scoped>
.strip {
width: 112px;
height: 6px;
top: 686px;
left: 121px;
gap: 0px;
opacity: 0px;
background: #E74C3C;
}
</style>
