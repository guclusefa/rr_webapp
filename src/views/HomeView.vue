<template>
  <section class="container">
    <section class="mb-5">
      <div class="row mb-3">
        <div class="col">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <h1>{{ $t("home.title") }}</h1>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Hero section -->
    <section class="mb-5">
      <div class="row mb-3 border-bottom border-top py-3">
        <div class="col-12 col-md-6 d-flex align-items-center">
          <div>
            <h2>{{ $t("app.name") }}</h2>
            <p class="lead">
              {{ $t("home.description") }}
            </p>
            <div class="d-flex gap-2">
              <router-link to="/resources" class="btn btn-primary">
                {{ $t("resources.page") }}
              </router-link>
              <router-link to="/profiles" class="btn btn-outline-primary">
                {{ $t("profiles.page") }}
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-6 d-none d-md-block">
          <img src="@/assets/images/icons/ico-hero.svg" class="img-fluid" />
        </div>
      </div>
    </section>
  </section>
</template>

<script>
export default {
  name: "HomeView",
};
</script>
