<template>
  <div class="min-h-screen w-full max-h-full">
    <div
      class="px-8 md:px-16 lg:px-56 pt-10 md:pt-20 md:pb-32 md:bg-gradient-to-b from-primary to-yellow-100"
    >
      <div class="flex justify-center">
        <div
          class="flex bg-gradient-to-r from-blueGray-700 to-blueGray-600 rounded-full overflow-hidden shadow-lg transform transition-all max-w-lg w-full"
        >
          <span
            class="inline-flex items-center pl-6 bg-transparent text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-6 text-blueGray-400"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
          <input
            type="text"
            class="appearance-none w-full bg-transparent px-6 py-4 text-cyan-100 text-lg placeholder-blueGray-400 focus:outline-none"
            placeholder="Search movies..."
            v-model="searchText"
          />
        </div>
      </div>
      <div class="flex justify-between mt-4 md:mt-12 md:px-4">
        <div class="flex justify-start items-center">
          <button
            type="button"
            @click="setViewType('all')"
            class="inline-flex items-center rounded-r-none px-4 md:px-8 py-2 border-r border-blueGray-400 rounded shadow-lg text-xs md:text-sm focus:outline-none"
            :class="[
              viewType === 'all'
                ? 'bg-cyan-100 text-cyan-600 cursor-default'
                : 'text-blueGray-400 bg-blueGray-700 hover:text-cyan-600 hover:bg-cyan-100'
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-4 md:w-6 pr-1 md:pr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"
              />
            </svg>
            All
          </button>
          <button
            type="button"
            @click="setViewType('favorites')"
            class="button-favorite inline-flex items-center rounded-l-none px-4 py-2 rounded shadow-lg text-xs md:text-sm focus:outline-none"
            :class="[
              viewType === 'favorites'
                ? 'bg-cyan-100 text-cyan-600 cursor-default'
                : 'text-blueGray-400 bg-blueGray-700 hover:text-cyan-600 hover:bg-cyan-100'
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-4 md:w-6 pr-1 md:pr-2"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
            Favorites
          </button>
        </div>
        <div v-if="viewType === 'all'" class="flex justify-end items-center">
          <div
            @click="loadFirstPage"
            class="pr-2 md:pr-3"
            :class="[
              pageNumber <= 1
                ? 'cursor-not-allowed pointer-events-none text-blueGray-400'
                : 'cursor-pointer text-blueGray-700 hover:text-blueGray-400'
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-3 md:w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
              />
            </svg>
          </div>
          <div
            @click="loadPreviousPage"
            class="pr-2 md:pr-3"
            :class="[
              pageNumber <= 1
                ? 'cursor-not-allowed pointer-events-none text-blueGray-400'
                : 'cursor-pointer text-blueGray-700 hover:text-blueGray-400'
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-3 md:w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div class="pr-2 md:pr-3 text-xs md:text-sm text-blueGray-600">
            Page <span class="font-bold">{{ pageNumber }}</span>
            <span class="font-bold hidden md:inline"> of {{ totalPages }}</span>
          </div>
          <div
            @click="loadNextPage"
            class="pr-2 md:pr-3"
            :class="[
              pageNumber >= totalPages
                ? 'cursor-not-allowed pointer-events-none text-blueGray-400'
                : 'cursor-pointer text-blueGray-700 hover:text-blueGray-400'
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-3 md:w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </div>
          <div
            @click="loadLastPage"
            :class="[
              pageNumber >= totalPages
                ? 'cursor-not-allowed pointer-events-none text-blueGray-400'
                : 'cursor-pointer text-blueGray-700 hover:text-blueGray-400'
            ]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              class="w-3 md:w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M13 5l7 7-7 7M5 5l7 7-7 7"
              />
            </svg>
          </div>
        </div>
        <div v-else class="flex justify-end items-center">
          <div class="text-sm text-blueGray-600">
            Showing
            <span class="font-bold">{{ finalMoviesList.length }}</span> movies
          </div>
        </div>
      </div>
    </div>
    <div class="px-8 md:px-16 lg:px-56 md:-mt-32 relative">
      <div
        v-if="moviesStatus === 'success' && !movies.length"
        class="flex justify-center items-start pt-32 md:pt-56"
      >
        <div class="flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-16 text-blueGray-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
            />
          </svg>
          <p class="text-xl font-bold text-blueGray-700 pt-6">
            No movies present!
          </p>
        </div>
      </div>
      <div
        v-else-if="moviesStatus === 'error'"
        class="flex justify-center items-start pt-32 md:pt-56"
      >
        <div class="flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-16 text-blueGray-700"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p class="text-xl font-bold text-blueGray-700 pt-6">
            Error is showing movies!
          </p>
        </div>
      </div>
      <div v-else-if="movies.length" class="flex flex-wrap">
        <movie-item
          v-for="(movie, movieIndex) in finalMoviesList"
          :key="movie.imdbID"
          :movie="movie"
          :movieIndex="movieIndex"
          @toggleFavorite="toggleFavorite"
        ></movie-item>
      </div>
      <div
        v-if="moviesStatus === 'loading' || !moviesStatus"
        class="absolute top-0 left-0 right-0 bottom-0"
      >
        <div class="flex justify-center items-start pt-32 md:pt-56">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            class="w-16 animate-spin-slow text-primary"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { onMounted, ref, watch, defineComponent } from "@vue/composition-api";
import debounce from "lodash.debounce";
import MovieItem from "@/components/MovieItem.vue";
import { MoviesAPI } from "@/api/";

interface MovieItem {
  imdbID?: string;
  Title?: string;
  Year?: number;
  isFavorite?: boolean;
}

interface FavoriteOptions {
  movie: MovieItem;
  movieIndex: number;
}

export default defineComponent({
  components: {
    MovieItem
  },
  setup(props, context: Record<string, any>) {
    const searchText = ref("");
    const pageNumber = ref(1);
    const totalPages = ref(1);
    const viewType = ref("all");
    const moviesStatus = ref("");
    const favorites: { value: MovieItem[] } = ref([]);
    const movies = ref([]);
    const finalMoviesList: { value: MovieItem[] } = ref([]);

    async function fetchFavorites() {
      const favoriteMovies = await (localStorage.getItem("favorites") || "[]");
      favorites.value = JSON.parse(favoriteMovies);
    }

    async function fetchMovies() {
      moviesStatus.value = "loading";
      try {
        const moviesResponse = await MoviesAPI.getMovies(context.root.$axios, {
          Title: searchText.value,
          page: pageNumber.value
        });
        const moviesData = moviesResponse.data || {};
        totalPages.value = moviesData.total_pages || 1;
        movies.value = moviesData.data || [];
        finalMoviesList.value = movies.value.map((movie: MovieItem) => {
          const isFavorite = favorites.value.findIndex(
            (m: MovieItem) => m.imdbID === movie.imdbID
          );
          return {
            ...movie,
            isFavorite: isFavorite >= 0 ? true : false
          };
        });
        moviesStatus.value = "success";
      } catch (e) {
        console.log("🚀 ~ file: Home.vue ~ line 104 ~ fetchMovies ~ e", e);
        moviesStatus.value = "error";
      }
    }

    async function toggleFavorite(options: FavoriteOptions) {
      if (options.movie.isFavorite) {
        const favoriteMovieIndex = favorites.value.findIndex(
          (m: MovieItem) => m.imdbID === options.movie.imdbID
        );
        if (favoriteMovieIndex >= 0) {
          favorites.value.splice(favoriteMovieIndex, 1);
          if (viewType.value === "all") {
            finalMoviesList.value[options.movieIndex].isFavorite = false;
          } else {
            finalMoviesList.value = favorites.value;
          }
        }
      } else {
        favorites.value.push({ ...options.movie, isFavorite: true });
        if (viewType.value === "all") {
          finalMoviesList.value[options.movieIndex].isFavorite = true;
        }
      }
      await localStorage.setItem("favorites", JSON.stringify(favorites.value));
    }

    function setViewType(type: string) {
      pageNumber.value = 1;
      viewType.value = type;
      if (viewType.value === "all") {
        fetchMovies();
      } else {
        finalMoviesList.value = favorites.value;
      }
    }

    function loadFirstPage() {
      pageNumber.value = 1;
      fetchMovies();
    }

    function loadPreviousPage() {
      pageNumber.value -= 1;
      fetchMovies();
    }

    function loadNextPage() {
      pageNumber.value += 1;
      fetchMovies();
    }

    function loadLastPage() {
      pageNumber.value = totalPages.value;
      console.log(
        "🚀 ~ file: Home.vue ~ line 481 ~ loadLastPage ~ pageNumber.value",
        pageNumber.value
      );
      fetchMovies();
    }

    async function initFetch() {
      await fetchFavorites();
      fetchMovies();
    }

    onMounted(() => {
      initFetch();
    });

    watch(
      searchText,
      debounce(function() {
        if (viewType.value === "all") {
          pageNumber.value = 1;
          fetchMovies();
        }
      }, 300)
    );

    return {
      searchText,
      pageNumber,
      totalPages,
      viewType,
      moviesStatus,
      favorites,
      movies,
      finalMoviesList,
      toggleFavorite,
      setViewType,
      loadFirstPage,
      loadPreviousPage,
      loadNextPage,
      loadLastPage,
      fetchFavorites,
      fetchMovies,
      initFetch
    };
  }
});
</script>
