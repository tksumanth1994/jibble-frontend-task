import { shallowMount } from "@vue/test-utils";
import MovieItem from "@/components/MovieItem.vue";
import "../../src/plugins/vue-composition";
import "../../src/plugins/axios";

describe("MovieItem", () => {
  const wrapper = shallowMount(MovieItem, {
    propsData: {
      movie: {
        Title: "Louise's Waterworld",
        Year: 1997,
        imdbID: "tt0298417",
        isFavorite: true
      },
      movieIndex: 0
    }
  });
  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  test("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  wrapper.destroy();
});
