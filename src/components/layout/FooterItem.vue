<template>
  <footer class="footer py-3 bg-light">
    <div class="container">
      <ul
        class="list-unstyled d-flex justify-content-between align-items-center mb-0"
      >
        <li class="text-muted">
          {{ $t("footer.copyright", { year: currentYear }) }}
        </li>
        <div class="d-flex">
          <li class="text-muted">
            <router-link to="/legal" class="me-3" active-class="active-link">
              {{ $t("legal.page") }}
            </router-link>
          </li>
          <li class="text-muted">
            <router-link to="/about" active-class="active-link">
              {{ $t("about.page") }}
            </router-link>
          </li>
        </div>
      </ul>
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