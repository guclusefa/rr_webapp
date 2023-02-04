<template>
  <div class="row">
    <div class="col text-end">
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
    fetchData: {
      type: Function,
      required: true,
    },
  },
  methods: {
    loadMore() {
      this.fetchData({ page: this.page + 1 });
    },
  },
};
</script>