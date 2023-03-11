<template>
  <div class="d-flex align-items-center">
    <button
      class="btn btn-sm"
      :focus-visible="false"
      :focus="false"
      @click="toggleLike"
      :disabled="loading || !isAuthenticated"
    >
      <i class="bi bi-bookmark-fill text-primary me-1" v-if="isSaved"></i>
      <i class="bi bi-bookmark me-1" v-else></i>
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "SaveButton",
  data() {
    return {
      saves: this.resource.saves,
      isSaved: this.resource.isSaved,
    };
  },
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["isAuthenticated", "loading"]),
  },
  methods: {
    ...mapActions(["saveResource"]),
    save() {
      this.saveResource(this.resource.id);
      this.saves++;
      this.isSaved = true;
    },
    unLike() {
      this.saveResource(this.resource.id);
      this.saves--;
      this.isSaved = false;
    },
    toggleLike() {
      if (this.isSaved) {
        this.unLike();
      } else {
        this.save();
      }
    },
  },
};
</script>

<style scoped>
.btn:disabled {
  outline: none;
  border-color: transparent !important;
}
.btn {
  padding: 0;
}
</style>