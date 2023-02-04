<template>
  <header class="mb-3">
    <!-- Fixed navbar -->
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container">
        <router-link to="/" class="navbar-brand">{{ $t("app.name_short") }}</router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item">
              <router-link to="/users" class="nav-link">{{ $t("users.page") }}</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/about" class="nav-link">{{ $t("about.page") }}</router-link>
            </li>
          </ul>
          <div class=" d-inline-flex">
              <ThemeSwitcher />
              <LocaleSwitcher />
          </div>
        </div>
      </div>
    </nav>
  </header>

</template>

<script>
import ThemeSwitcher from "@/components/fragments/ThemeSwitcher.vue";
import LocaleSwitcher from "@/components/fragments/LocaleSwitcher.vue";

export default {
  name: "HeaderItem",
  components: {
    ThemeSwitcher,
    LocaleSwitcher,
  },
};
</script>