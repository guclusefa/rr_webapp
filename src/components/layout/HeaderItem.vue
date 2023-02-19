<template>
  <header class="mb-3">
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container">
        <router-link to="/" class="navbar-brand">{{
          $t("app.name_short")
        }}</router-link>
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
              <router-link to="/" class="nav-link">{{
                $t("home.page")
              }}</router-link>
            </li>
          </ul>
          <div class="d-flex">
            <ul class="navbar-nav me-auto mb-2 mb-md-0">
              <li class="nav-item">
                <ThemeItem />
              </li>
              <li class="nav-item">
                <LocaleItem />
              </li>
              <template v-if="isAuthenticated && user">
                <ProfileItem />
              </template>
              <template v-else>
                <li class="nav-item">
                  <router-link to="/login" class="nav-link">{{
                    $t("login.page")
                  }}</router-link>
                </li>
              </template>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <!-- START TESTING -->
  <div class="test" v-if="isAuthenticated">
    <div class="container">
      <div class="row">
        <div class="col-12">
          <p>{{ token }}</p>
          <p>{{ tokenExpiration }}</p>
          <p>{{ user }}</p>
        </div>
      </div>
    </div>
  </div>
  <!-- END TESTING -->
</template>

<script>
import { mapGetters } from "vuex";
import ThemeItem from "@/components/layout/ThemeItem.vue";
import LocaleItem from "@/components/layout/LocaleItem.vue";
import ProfileItem from "@/components/layout/ProfileItem.vue";

export default {
  name: "HeaderItem",
  computed: {
    ...mapGetters(["isAuthenticated", "token", "tokenExpiration", "user"]),
  },
  components: {
    ThemeItem,
    LocaleItem,
    ProfileItem,
  },
};
</script>