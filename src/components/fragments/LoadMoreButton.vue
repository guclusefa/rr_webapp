<template>
  <div class="row">
    <div class="col">
      <button
        class="btn btn-primary mb-3"
        @click="loadMore"
        :disabled="isLoading"
        v-if="meta.next"
      >
        <span v-if="isLoading"> {{ $t("app.loading") }} </span>
        <span v-else>{{ $t("app.see_more") }}</span>
      </button>
    </div>
  </div>
</template>
  
<script>
export default {
  props: {
    meta: {
      type: Object,
      required: true,
    },
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
      this.fetchData(this.page + 1);
    },
  },
};
</script>