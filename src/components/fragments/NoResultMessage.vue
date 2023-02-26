<template>
  <div class="row mb-4">
    <div class="col">
      <h5>
        {{ $t(message) }}
      </h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "NoResultMessage",
  props: {
    message: {
      type: String,
      required: false,
      default: "app.no_results",
    },
  },
};
</script>