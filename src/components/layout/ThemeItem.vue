<template>
  <li class="nav-item dropdown fs-5">
    <a
      class="nav-link"
      href="#"
      role="button"
      data-bs-toggle="dropdown"
      aria-expanded="false"
    >
      <span class="border-end border-2 pe-3">
        <i class="bi bi-moon-fill" v-if="isDark"></i>
        <i class="bi bi-sun-fill" v-else></i>
        <i class="ms-2 dropdown-toggle"></i>
      </span>
    </a>
    <ul class="dropdown-menu">
      <li v-for="(theme, i) in themes" :key="`theme-${i}`">
        <a
          class="dropdown-item"
          href="#"
          @click.prevent="isDark = theme === 'dark'"
        >
          <span v-if="theme === 'dark'">
            <i class="bi bi-moon-fill"></i>
            {{ $t("app.themes.dark") }}
          </span>
          <span v-else
            ><i class="bi bi-sun-fill"></i>
            {{ $t("app.themes.light") }}
          </span>
        </a>
      </li>
    </ul>
  </li>
</template>

<script setup>
import { useDark } from "@vueuse/core";

const themes = ["dark", "light"];

const isDark = useDark({
  selector: "body", //element to add attribute to
  attribute: "class", // attribute name
  valueDark: "dark", // attribute value for dark mode
  valueLight: "light", // attribute value for light mode
});
</script>