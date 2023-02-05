<template>
  <div class="row mb-3">
    <div class="col">
      <button class="btn btn-primary" @click="loadMore" :disabled="isLoading">
        <span v-if="isLoading"> {{ $t("app.loading") }} </span>
        <span v-else>{{ $t("app.see_more") }}</span>
      </button>
    </div>
  </div>
</template>
  
<script>
export default {
  name: "LoadMoreButton",
  props: {
    isLoading: {
      type: Boolean,
      required: true,
    },
    page: {
      type: Number,
      required: true,
    },
    fetch: {
      type: Function,
      required: true,
    },
  },
  methods: {
    loadMore() {
      this.fetch({ page: this.page + 1 });
    },
  },
};
</script>