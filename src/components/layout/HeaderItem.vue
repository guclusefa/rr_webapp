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
          </ul>
          <div class="d-flex">
              <ul class="navbar-nav me-auto mb-2 mb-md-0">
                <li class="nav-item">
                  <ThemeItem />
                </li>
                <li class="nav-item">
                  <LocaleItem />
                </li>
                <li class="nav-item" v-if="token && user">
                  <ProfileItem />
                </li>
                <li class="nav-item" v-else>
                  <router-link to="/login" class="nav-link">{{ $t("login.page") }}</router-link>
                </li>
              </ul>
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

import ThemeItem from "@/components/layout/ThemeItem.vue";
import LocaleItem from "./LocaleItem.vue";
import ProfileItem from "./ProfileItem.vue";

export default {
  name: "HeaderItem",
  computed: {
    ...mapGetters(["token"]),
    ...mapGetters(["tokenExpiration"]),
    ...mapGetters(["user"]),
  },
  components: {
    ThemeItem,
    LocaleItem,
    ProfileItem,
  },
};
</script>