<template>
  <div></div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

export default {
  name: "LogoutForm",
  computed: {
    ...mapGetters(["isAuthenticated"]),
  },
  methods: {
    ...mapActions(["logout"]),
  },
  beforeMount() {
    if (this.isAuthenticated) {
      this.logout();
      addSuccessToast("logout.success");
    } else {
      addErrorToast("logout.error");
    }
    this.$router.push({ name: "home" });
  },
};
</script>