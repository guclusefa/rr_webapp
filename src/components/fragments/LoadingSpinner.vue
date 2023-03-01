<template>
  <!-- Loading -->
  <div class="row">
    <div class="col">
      <div class="d-flex justify-content-center">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">{{ $t("app.loading") }}</span>
        </div>
      </div>
    </div>
  </div>
  <!-- End loading -->
</template>

<script>
export default {
  name: "LoadingSpinner",
};
</script>