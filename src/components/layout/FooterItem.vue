<template>
  <footer class="footer py-3 bg-light">
    <div class="container">
      <span class="text-muted">{{
        $t("footer.copyright", { year: currentYear })
      }}</span>
      <router-link to="/about" class="float-end">{{
        $t("about.page")
      }}</router-link>
    </div>
  </footer>
</template>

<script>
export default {
  name: "FooterItem",
  data() {
    return {
      currentYear: new Date().getFullYear(),
    };
  },
};
</script>