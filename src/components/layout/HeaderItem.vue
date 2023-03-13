<template>
  <header class="mb-3">
    <nav class="navbar navbar-expand-md navbar-light bg-light shadow-sm">
      <div class="container">
        <router-link
          to="/"
          class="navbar-brand d-flex align-items-center text-primary fw-bold"
        >
          <img
            src="@/assets/images/logo.png"
            alt="Logo"
            width="60"
            height="60"
            class="me-2"
          />
          {{ $t("app.name_short") }}
        </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
          <ul class="navbar-nav me-auto mb-2 mb-md-0 ms-auto">
            <li class="nav-item">
              <router-link to="/profiles" class="nav-link fs-5">
                <span class="border-end border-2 pe-2">
                  {{ $t("profiles.page") }}
                </span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/resources" class="nav-link fs-5">
                <span class="border-end border-2 pe-2">
                  {{ $t("resources.page") }}
                </span>
              </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/comments" class="nav-link fs-5">
                {{ $t("comments.page") }}
              </router-link>
            </li>
          </ul>

          <div class="d-flex ms-auto">
            <ul class="navbar-nav me-auto mb-2 mb-md-0 gap-1">
              <li class="nav-item">
                <SearchItem />
              </li>
              <li class="nav-item" v-if="isAdmin">
                <AdminItem />
              </li>
              <li class="nav-item">
                <ThemeItem />
              </li>
              <li class="nav-item">
                <LocaleItem />
              </li>
              <li class="nav-item">
                <template v-if="isAuthenticated">
                  <ProfileItem />
                </template>
                <template v-else>
                  <router-link to="/login" class="nav-link fs-5">{{
                    $t("login.page")
                  }}</router-link>
                </template>
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
import SearchItem from "@/components/layout/SearchItem.vue";
import AdminItem from "@/components/layout/AdminItem.vue";
import ThemeItem from "@/components/layout/ThemeItem.vue";
import LocaleItem from "@/components/layout/LocaleItem.vue";
import ProfileItem from "@/components/layout/ProfileItem.vue";

export default {
  name: "HeaderItem",
  computed: {
    ...mapGetters(["isAuthenticated", "isAdmin"]),
  },
  components: {
    SearchItem,
    AdminItem,
    ThemeItem,
    LocaleItem,
    ProfileItem,
  },
};
</script>