import { shallowMount } from "@vue/test-utils";
import Home from "@/components/Home.vue";
import "../../src/plugins/vue-composition";
import "../../src/plugins/axios";

describe("Home", () => {
  const wrapper = shallowMount(Home);
  test("is a Vue instance", () => {
    expect(wrapper.isVueInstance).toBeTruthy();
  });
  test("renders correctly", () => {
    expect(wrapper.element).toMatchSnapshot();
  });
  wrapper.destroy();
});
