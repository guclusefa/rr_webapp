<template>
  <div class="alert alert-info" role="alert" v-if="noResponse">
    {{ $t("app.no_response") }}
  </div>
</template>

<script>
export default {
  name: "NoResponseMessage",
  props: {
    noResponse: {
      type: Boolean,
      required: true,
    },
  },
};
</script>