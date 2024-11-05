<template>
  <div class="carousel-container h-[400px] relative overflow-hidden">
    <div class="carousel mx-auto my-14 mt-20 relative px-14 md:w-[85%] h-[80%] flex items-center">
      <transition-group
        name="carousel-slide"
        tag="div"
        class="flex w-full justify-center"
      >
        <div v-if="leftMovie" class="carousel-left scale-y-[0.7] h-full transition-all duration-500" :key="leftMovie.id">
          <img class="carousel-item h-full" :src="`https://image.tmdb.org/t/p/w500${leftMovie.poster_path}`" alt="" />
        </div>

        <div v-if="centerMovie" class="carousel-center scale-y-[0.9] scale-x-[1.7] z-10 translate-y-4 h-full transition-all duration-500" :key="centerMovie.id">
          <img class="carousel-item h-full" :src="`https://image.tmdb.org/t/p/w500${centerMovie.poster_path}`" alt="" />
        </div>

        <div v-if="rightMovie" class="carousel-right scale-y-[0.7] h-full transition-all duration-500" :key="rightMovie.id">
          <img class="carousel-item h-full" :src="`https://image.tmdb.org/t/p/w500${rightMovie.poster_path}`" alt="" />
        </div>
      </transition-group>

      <span class="left absolute top-1/2 left-1 cursor-pointer" @click="changeItem(-1)">
        <i class="fa-solid fa-arrow-left text-3xl text-gray-600"></i>
      </span>

      <span class="right absolute top-1/2 right-1 cursor-pointer" @click="changeItem(1)">
        <i class="fa-solid fa-arrow-right text-3xl text-gray-600"></i>
      </span>
    </div>

    <div id="indicators" class="absolute flex gap-4 bottom-10 left-1/2 -translate-x-1/2">
      <span
        v-for="(item, index) in trendingMovies"
        :key="'indicator-' + index"
        :class="['block w-3 h-3 rounded-md border-2', { 'bg-gray-600': currentIndex === index, 'border-gray-600': currentIndex !== index }]"
        @click="setCurrentIndex(index)"
      ></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import type { IMovieAPIResponseList, Movie } from '@/interfaces/Movie';

const config = useRuntimeConfig();

const trendingMovies = ref<Movie[]>([]);
const currentIndex = ref(0);

const fetchTrendingMovies = async () => {
  const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `bearer ${config.public.tmdbAccessToken}`
    }
  });

  if (!response.ok) {
    console.error('Error fetching data:', response.statusText);
    return;
  }

  const data: IMovieAPIResponseList = await response.json();
  trendingMovies.value = data?.results ?? [];
};

const changeItem = (direction: number) => {
  currentIndex.value = (currentIndex.value + direction + trendingMovies.value.length) % trendingMovies.value.length;
};

const setCurrentIndex = (index: number) => {
  currentIndex.value = index;
};

const leftMovie = computed(() => trendingMovies.value[(currentIndex.value - 1 + trendingMovies.value.length) % trendingMovies.value.length]);
const centerMovie = computed(() => trendingMovies.value[currentIndex.value]);
const rightMovie = computed(() => trendingMovies.value[(currentIndex.value + 1) % trendingMovies.value.length]);

onMounted(fetchTrendingMovies);
</script>

<style scoped>
.carousel-container {
  position: relative;
  overflow: hidden;
}

.carousel-slide-enter-active, .carousel-slide-leave-active {
  transition: transform 0.5s ease;
}

.carousel-slide-enter, .carousel-slide-leave-to {
  transform: translateX(-100%);
}
</style>
