<template>
  <div>

    <!-- <div class="bg-gray-900 text-white p-8 space-y-8">
    
    <header class="flex items-center space-x-8">
      
      <img :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`" alt="Wonder Woman 1984" class="w-64 h-96 rounded-lg shadow-lg">
      
      <div>
        <h1 class="text-4xl font-bold">Wonder Woman 1984</h1>
        <p class="text-lg text-gray-400">Fantasy, Action, Adventure</p>
        <div class="flex items-center mt-4 space-x-4">
          <span class="text-yellow-500 text-3xl font-semibold">7.0</span>
          <span class="text-gray-500">| User Score 3621 votes</span>
          <span class="text-gray-500">| Released</span>
          <span class="text-gray-500">| English</span>
          <span class="text-gray-500">| Budget: $200,000,000.00</span>
          <span class="text-gray-500">| DC Entertainment</span>
        </div>
      </div>
    </header>

    
    <section>
      <h2 class="text-2xl font-semibold">Overview</h2>
      <p class="text-gray-300 mt-2">
        Wonder Woman comes into conflict with the Soviet Union during the Cold War in the 1980s and finds a formidable foe by the name of the Cheetah.
      </p>
    </section>

    
    <section>
      <h2 class="text-2xl font-semibold">Reviews</h2>
      <div class="grid gap-4 mt-4 md:grid-cols-2">
        
        <div class="p-6 bg-gray-800 rounded-lg shadow-md">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div>
              <p class="font-semibold">SWITCH.</p>
              <p class="text-gray-500 text-sm">December 18, 2020</p>
            </div>
            <span class="ml-auto text-yellow-500 font-semibold text-xl">7.0</span>
          </div>
          <p class="mt-4 text-gray-300">
            It isn’t as easy as saying ‘Wonder Woman 1984’ is a good or bad movie...
          </p>
        </div>

        
        <div class="p-6 bg-gray-800 rounded-lg shadow-md">
          <div class="flex items-center space-x-4">
            <div class="w-10 h-10 bg-gray-600 rounded-full"></div>
            <div>
              <p class="font-semibold">msbreviews</p>
              <p class="text-gray-500 text-sm">December 18, 2020</p>
            </div>
            <span class="ml-auto text-yellow-500 font-semibold text-xl">8.0</span>
          </div>
          <p class="mt-4 text-gray-300">
            The superhero genre has been growing exponentially during the last decade...
          </p>
        </div>
      </div>
    </section>
  </div> -->

    <section 
      class="relative w-full h-[600px] bg-cover bg-center" 
      :style="{ backgroundImage: `url(https://image.tmdb.org/t/p/w500${movie.backdrop_path})` }"
    >
      <div class="absolute inset-0 bg-black opacity-50">
      </div> 
      <div class="absolute h-1/6 w-full bottom-0 bg-black-50">
        <div class="container mx-auto">
          <div class="mt-[-10rem] flex items-start justify-center gap-10">
            <img :src="`https://image.tmdb.org/t/p/w500${movie.poster_path}`" alt="Wonder Woman 1984" class="w-64 h-96 shadow-lg">
            <div class="pt-5"> 
              <p class="text-lg text-white">{{ new Date(movie.release_date).getFullYear() }}</p>
              <p class="text-4xl text-primary font-bold">{{ movie.title }}</p>
              <p class="text-sm text-white mt-2 mb-[75px]">{{ (movie.genres || []).map((n) =>  n.name).join(', ') }}</p>
              <div class="flex items-center mt-4 space-x-4">
                <div class="flex gap-2 text-primary text-3xl font-semibold">
                  <img src="/images/Star.png" class="mr-2" />
                  {{ Number((movie.vote_average || 0).toFixed(1)) }}
                </div>
                <span class="text-gray-500">| User Score 3621 votes</span>
                <span class="text-gray-500">| Released</span>
                <span class="text-gray-500">| English</span>
                <span class="text-gray-500">| Budget: $200,000,000.00</span>
                <span class="text-gray-500">| DC Entertainment</span>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </section>

    <div class="bg-white pt-[100px]">
      <!-- <img :src="`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`"/> -->
      <h1 class="text-3xl font-bold">{{ movie?.title }}</h1>
      <h4>Overview</h4>
      <p class="mt-2">{{ movie?.overview }}</p>
  
      <h4 class="mt-4">Reviews</h4>
      <div v-for="review in reviews" :key="review.id" class="mt-4 mr-4">
        <p>{{ review.author_details.username }}</p>
        <p>{{ review.content }}</p>
      </div>

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
