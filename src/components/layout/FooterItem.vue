<template>
  <footer class="footer py-3 bg-light">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center">
        <div class="me-auto">
          <span class="text-muted">
            {{ $t("footer.copyright", { year: currentYear }) }}
          </span>
        </div>
        <div class="order-last order-sm-0">
          <div class="d-flex gap-2 ms-auto footer-links">
            <div>
              <span class="text-muted">
                <router-link to="/legal">{{ $t("legal.page") }}</router-link>
              </span>
            </div>
            <div>
              <span class="text-muted">
                <router-link to="/accessibility">{{
                  $t("accessibility.page")
                }}</router-link>
              </span>
            </div>
            <div>
              <span class="text-muted">
                <router-link to="/about">{{ $t("about.page") }}</router-link>
              </span>
            </div>
          </div>
        </div>
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