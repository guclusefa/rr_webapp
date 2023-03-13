<template>
  <div class="row">
    <div class="col-12">
      <h5 style="font-weight: 600;">
        {{ $t(message) }}
      </h5>
    </div>
<!--     <div class="col-12">
      <img src="@/assets/images/icons/ico-void.svg" class="img-fluid" />
    </div> -->
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