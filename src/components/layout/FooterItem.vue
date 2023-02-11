<template>
  <div style="height: 30px"></div>
  <footer class="footer py-3 bg-light">
    <div class="container">
      <span class="text-muted">{{
        $t("footer.copyright", { year: currentYear })
      }}</span>
      <span class="text-muted float-end">
        <router-link to="/about" class="nav-link">{{
          $t("about.page")
        }}</router-link>
      </span>
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