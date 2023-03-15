<template>
  <section class="container">
    <section class="mb-5">
      <div class="row">
        <div class="d-flex align-items-center justify-content-center">
          <div class="d-flex align-items-center">
            <div>
              <h1 class="text-center">
                {{ $t("not-found.description") }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div class="row mb-3">
        <div class="d-flex align-items-center justify-content-center">
          <div class="d-flex align-items-center">
            <div class="me-auto">
              <img
                src="@/assets/images/icons/ico-not-found.svg"
                class="img-fluid"
                alt="404"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>
  
  <script>
export default {
  name: "404View",
};
</script>