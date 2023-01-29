<template>
  <header>
    <div class="container">
      <nav>
        <router-link to="/">{{ $t("home.page") }}</router-link> |
        <router-link to="/about">{{ $t("about.page") }}</router-link> |
        <ThemeSwitcher /> |
        <LocaleSwitcher />
      </nav>
    </div>
  </header>
</template>

<script>
import ThemeSwitcher from "./ThemeSwitcher.vue";
import LocaleSwitcher from "./LocaleSwitcher.vue";

export default {
  name: "HeaderItem",
  components: {
    ThemeSwitcher,
    LocaleSwitcher,
  },
};
</script>