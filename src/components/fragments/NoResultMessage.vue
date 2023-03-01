<template>
  <h5>
    {{ $t(message) }}
  </h5>
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