<template>
  <Navigation></Navigation>
  <Main></Main>
  <Footer></Footer>
</template>

<script setup lang="ts">
import Footer from "@/components/Footer.vue";
import Main from "@/components/Main.vue";
import Navigation from "@/components/Navigation.vue";

import { useAuthStore } from "@/store/auth";

import { computed, ComputedRef } from "@vue/reactivity";
import { onMounted, watch } from "@vue/runtime-core";

import DarkTheme from "primevue/resources/themes/bootstrap4-dark-blue/theme.css?inline";
import LightTheme from "primevue/resources/themes/bootstrap4-light-blue/theme.css?inline";

//global
const userStore = useAuthStore();

// computed
const theme: ComputedRef<string> = computed(() => userStore.user?.profile?.theme);

// watch
watch(theme, (newValue: string) => {
  setTheme(newValue);
});

// data
const themeDOMElem: HTMLStyleElement = document.createElement("style");

// // mounted
onMounted(async () => {
  // set User Theme
  themeDOMElem.setAttribute("type", "text/css");
  document.getElementsByTagName("head")[0].append(themeDOMElem);

  setTheme(theme.value);
});

// methods
const setTheme = function (theme: string) {
  themeDOMElem.innerHTML = "";
  if (theme === "dark") themeDOMElem.append(DarkTheme);
  else themeDOMElem.append(LightTheme);
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
