<template>
  <header>
    <div class="container">
      <nav>
        <router-link to="/">{{ $t("home.page") }}</router-link> |
        <router-link to="/about">{{ $t("about.page") }}</router-link> |
        <LocaleSwitcher />
      </nav>
    </div>
  </header>
</template>

<script>
import LocaleSwitcher from "./LocaleSwitcher.vue";

export default {
  name: "HeaderItem",
  components: {
    LocaleSwitcher,
  },
};
</script>

<style lang="scss" scoped>
nav {
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $secondary;
    }
  }
}
</style>