<template>
  <header>
    <div class="container">
      <nav>
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: "HeaderItem",
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