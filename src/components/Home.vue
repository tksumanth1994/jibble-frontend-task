<template>
  <div class="min-h-screen w-full max-h-full">
    <div class="px-56 pt-20 pb-32 bg-gradient-to-b from-primary to-yellow-100">
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
      <div class="flex justify-between mt-12 px-4">
        <div>
          <nav
            class="relative z-0 inline-flex shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <a
              href="#"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              All
            </a>
            <a
              href="#"
              class="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Favorites
            </a>
          </nav>
        </div>
        <div class="flex justify-end items-center">
          <div
            @click="loadFirstPage"
            class="pr-3"
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
              class="w-4"
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
            class="pr-3"
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
              class="w-4"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </div>
          <div class="pr-3 text-sm text-blueGray-600">
            Page <span class="font-bold">{{ pageNumber }}</span> of
            <span class="font-bold">{{ totalPages }}</span>
          </div>
          <div
            @click="loadNextPage"
            class="pr-3"
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
              class="w-4"
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
              class="w-4"
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
      </div>
    </div>
    <div class="px-56 -mt-32">
      <div
        v-if="moviesStatus === 'success' && movies.length"
        class="flex flex-wrap"
      >
        <div v-for="movie in movies" :key="movie.imdbID" class="w-1/4 p-4">
          <div
            class="relative inline-block align-bottom poster rounded-lg text-left overflow-hidden shadow-lg transform transition-all sm:align-middle h-poster sm:max-w-lg sm:w-full"
          >
            <div class="absolute bottom-0 top-0 left-0 right-0 h-full">
              <div
                class="bg-gradient-to-t from-blueGray-700 to-transparent flex flex-col justify-end h-full"
              >
                <div class="p-4">
                  <p class="text-lg text-cyan-100">
                    {{ movie.Title }}
                  </p>
                  <div class="flex justify-between items-end">
                    <p
                      class="mt-4 px-2 text-sm inline-flex leading-5 rounded-full bg-cyan-100 text-cyan-600"
                    >
                      {{ movie.Year }}
                    </p>
                    <p class="text-xs text-blueGray-200 uppercase">
                      {{ movie.imdbID }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-else-if="moviesStatus === 'success' && !movies.length"
        class="flex flex-wrap"
      >
        Empty!
      </div>
      <div v-else-if="moviesStatus === 'error'" class="flex flex-wrap">
        Error!
      </div>
      <div v-else class="flex flex-wrap">
        Loading!
      </div>
    </div>
  </div>
</template>

<script>
import debounce from "lodash.debounce";
import { MoviesAPI } from "@/api/";

export default {
  name: "Home",

  data() {
    return {
      searchText: "",
      pageNumber: 1,
      totalPages: 1,
      viewType: "all",
      moviesStatus: "",
      favorites: () => [],
      movies: () => []
    };
  },

  methods: {
    loadFirstPage() {
      this.pageNumber = 1;
      this.fetchMovies();
    },
    loadPreviousPage() {
      this.pageNumber -= 1;
      this.fetchMovies();
    },
    loadNextPage() {
      this.pageNumber += 1;
      this.fetchMovies();
    },
    loadLastPage() {
      this.pageNumber = this.totalPages;
      this.fetchMovies();
    },
    async fetchMovies() {
      this.moviesStatus = "loading";
      try {
        const moviesResponse = await MoviesAPI.getMovies(this.$axios, {
          Title: this.searchText,
          page: this.pageNumber
        });
        console.log(
          "🚀 ~ file: Home.vue ~ line 95 ~ fetchMovies ~ moviesList",
          moviesResponse
        );
        const moviesData = moviesResponse.data || {};
        this.totalPages = moviesData.total_pages || 1;
        this.movies = moviesData.data || [];
        console.log(
          "🚀 ~ file: Home.vue ~ line 101 ~ fetchMovies ~ this.movies",
          this.movies
        );
        this.moviesStatus = "success";
      } catch (e) {
        console.log("🚀 ~ file: Home.vue ~ line 104 ~ fetchMovies ~ e", e);
        this.moviesStatus = "error";
      }
    }
  },

  mounted() {
    this.fetchMovies();
  },

  watch: {
    searchText: debounce(function(searchText) {
      console.log("searchText:debounce ~ searchText", searchText);
      this.pageNumber = 1;
      this.fetchMovies();
    }, 300)
  }
};
</script>

<style lang="scss" scoped>
.h-poster {
  height: 20rem !important;
}
.poster {
  background: url("../assets/image.jpg");
}
</style>
