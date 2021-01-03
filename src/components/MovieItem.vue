<template>
  <div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 py-4 md:p-4">
    <div
      class="relative inline-block align-bottom poster rounded-lg text-left overflow-hidden shadow-lg hover:shadow-xl transform transition-all align-middle h-poster max-w-lg w-full"
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
      <div class="absolute top-0 right-0 pt-3 pr-3">
        <div class="flex justify-end items-center">
          <button
            type="button"
            class="inline-flex items-center mr-2 px-2 py-2 rounded shadow-lg text-sm focus:outline-none bg-gradient-to-r from-blueGray-700 to-blueGray-600 text-primary hover:text-primary-light"
            @click="toggleFavorite"
          >
            <svg
              v-if="movie.isFavorite"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              class="w-4"
            >
              <path
                fill-rule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
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
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
          <a
            :href="`https://www.imdb.com/title/${movie.imdbID}/`"
            target="blank"
            class="inline-flex items-center px-2 py-2 rounded shadow-lg text-sm focus:outline-none bg-gradient-to-r from-blueGray-700 to-blueGray-600 text-blueGray-400 hover:text-primary"
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "@vue/composition-api";

interface MovieItem {
  imdbID: string;
  Title: string;
  Year: number;
  isFavorite?: boolean;
}

interface FavoriteOptions {
  movie: MovieItem;
  movieIndex: number;
}

export default defineComponent({
  props: {
    movie: { type: Object, required: true },
    movieIndex: { type: Number, required: true }
  },
  setup(props: FavoriteOptions, context) {
    function emitFavorite(emit: any, props: FavoriteOptions) {
      emit("toggleFavorite", {
        movie: props.movie,
        movieIndex: props.movieIndex
      });
    }

    const toggleFavorite = () => {
      emitFavorite(context.emit, props);
    };
    return { toggleFavorite };
  }
});
</script>

<style lang="scss" scoped>
.h-poster {
  height: 20rem !important;
}
.poster {
  background: url("../assets/image.jpg");
  &:hover {
    margin-top: -0.25rem !important;
  }
}
</style>
