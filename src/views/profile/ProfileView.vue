<template>
  <section>
    <div class="container" v-if="!loading">
      <div class="row">
        <div class="col">
          <h1>{{ $t("profile.title", { username: profileUser.username }) }}</h1>
          <hr />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <UserProfile :user="profileUser" :canEdit="canEdit" />
        </div>
      </div>
    </div>
    <!-- Loading -->
    <div class="container" v-else>
      <div class="row">
        <div class="col">
          <div class="d-flex justify-content-center">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">{{ $t("app.loading") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- End loading -->
  </section>
</template>

<script>
import api from "@/services/api.js";
import { mapGetters } from "vuex";
import { addErrorToast } from "@/services/toasts";

import UserProfile from "@/components/user/UserProfile";

export default {
  name: "ProfileView",
  data() {
    return {
      profileUser: {
        id: null,
        username: null,
        email: null,
        firstName: null,
        lastName: null,
        bio: null,
        photo: null,
        roles: [],
        createdAt: null,
        gender: null,
        birthDate: null,
        isCertified: null,
        isVerified: null,
      },
      canEdit: false,
    };
  },
  computed: {
    id() {
      return this.$route.params.id;
    },
    ...mapGetters(["user", "loading"]),
  },
  methods: {
    getUser() {
      if (this.id == this.user.id) {
        this.canEdit = true;
        return (this.profileUser = this.user);
      } 
      api
        .get(`/users/${this.id}`)
        .then((response) => {
          this.profileUser = response.data.data;
        })
        .catch(() => {
          addErrorToast("user.not_found");
          this.$router.push({ name: "home" });
        });
    },
  },
  beforeMount() {
    this.getUser();
  },
  watch: {
    id() {
      this.getUser();
    },
  },
  components: {
    UserProfile,
  },
};
</script>