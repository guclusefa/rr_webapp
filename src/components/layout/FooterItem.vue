<template>
  <footer class="footer py-3 bg-light">
    <div class="container d-flex justify-content-between align-items-center">
      <div class="text-muted">
        {{ $t("footer.copyright", { year: currentYear }) }}
      </div>
      <div class="d-flex gap-2">
        <router-link to="/legal" class="me-3">{{ $t("legal.page") }}</router-link>
        <router-link to="/about">{{
          $t("about.page")
        }}</router-link>
      </div>
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