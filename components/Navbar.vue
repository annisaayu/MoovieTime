<template>
  <div ref="navbar" class="fixed w-full top-0 z-50">
    <nav :class="['transition-all duration-300', isScrolled ? 'bg-darkgrey' : 'bg-background-transparent']">
      <div class="container mx-auto text-white p-4 flex justify-between items-center">
        <img src="/images/moovietime-logo.svg"/>
        <div class="search-bar relative w-1/3 flex items-center bg-gray-800 rounded">
          <img src="/images/movie-icon.svg" alt="Movie Icon" class="absolute left-3 h-5 w-5 text-gray-500">
          <input 
            type="text" 
            placeholder="Find movie" 
            v-model="searchQuery"
            @input="fetchSuggestions"
            class="bg-background-accent3 text-text-heading placeholder-gray-500 rounded px-4 py-2 pl-10 w-full focus:outline-none"
          >
          <img src="/images/search-icon.svg" alt="Search Icon" class="absolute right-3 h-5 w-5 text-gray-500">

          <div 
            v-if="suggestions.length" 
            class="absolute top-full mt-0 w-full bg-black-90 rounded-b-lg shadow-lg"
          >
            <ul>
              <li 
                v-for="movie in suggestions" 
                :key="movie.id" 
                @click="goToMovieDetail(movie.id, movie.original_title)" 
                class="p-2 hover:bg-darkgrey cursor-pointer"  
              >
                {{ movie.title }}
              </li>
            </ul>
          </div>
        </div>

        <div class="flex gap-6 space-x-4 text-sm font-semibold uppercase">
          <div 
            ref="categoriesDropdown"  
            class="flex gap-1 text-text-heading hover:text-gray-300 cursor-pointer"
            @click="toggleCategories"
          >
            <img src="/images/grid-icon.svg" alt="categories Icon" class="">
            Categories
            <div 
              v-if="showCategories" 
              class="absolute top-10 mt-2 w-48 bg-white rounded-lg shadow-lg z-10"
            >
              <ul>
                <li v-for="category in categories" :key="category.id" class="p-2 text-darkgrey hover:bg-darkgrey hover:text-white cursor-pointer">
                  {{ category.name }}
                </li>
              </ul>
            </div>
          </div>
          <NuxtLink to="" class="text-text-heading hover:text-gray-300">Movies</NuxtLink>
          <NuxtLink to="" class="text-text-heading hover:text-gray-300">TV Shows</NuxtLink>
          <NuxtLink to="" class="text-text-heading hover:text-gray-300">Login</NuxtLink>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { useRouter } from 'vue-router';
import type { Genre } from '~/interfaces/Genre';
import type { Movie } from '~/interfaces/Movie';

const config = useRuntimeConfig()

const router = useRouter();
const isScrolled = ref(false);
const searchQuery = ref('');
const suggestions = ref<Movie[]>([]);
const navbar = ref(null);
const showCategories = ref<boolean>(false);
const categories = ref<Genre[]>([]);
const categoriesDropdown = ref(null);

const handleScroll = () => {
  isScrolled.value = window.scrollY > 0;
};

const fetchSuggestions = async () => {
  if (searchQuery.value.length < 3) {
    suggestions.value = [];
    return;
  }

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${searchQuery.value}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${config.public.tmdbAccessToken}`
      }
    });
    const data = await response.json();
    suggestions.value = data.results.slice(0, 5);
  } catch (error) {
    console.error("Error fetching movie suggestions:", error);
  }
};

const fetchCategories = async () => {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?language=en-US`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `bearer ${config.public.tmdbAccessToken}`
      }
    });
    const data = await response.json();
    categories.value = data.genres;
  } catch (error) {
    console.error("Error fetching movie categories:", error);
  }
};
const removeSpecialCharacters = (input:string) => {
  return input.replace(/[^a-zA-Z0-9 ]/g, '').trim();
}

const goToMovieDetail = (movieId:any, title:string) => {
  suggestions.value = [];
  searchQuery.value = '';
  let newTitle= removeSpecialCharacters(title).split(" ").join("-").toLocaleLowerCase()
  router.push(`/movie/${movieId}-${newTitle}`);
};

const toggleCategories = () => {
  showCategories.value = !showCategories.value;
};

const handleClickOutside = (event:any) => {
  if (navbar.value && !navbar.value.contains(event.target)) {
    suggestions.value = [];
  }

  const dropdown = categoriesDropdown.value;
  if (dropdown && !dropdown.contains(event.target as Node)) {
    showCategories.value = false;
  }
};

onMounted(() => {
  fetchCategories();
  window.addEventListener('scroll', handleScroll);
  document.addEventListener('mousedown', handleClickOutside);
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  document.removeEventListener('mousedown', handleClickOutside);
});
</script>
