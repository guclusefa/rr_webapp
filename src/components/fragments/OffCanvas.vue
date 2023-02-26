<template>
  <aside
    class="offcanvas offcanvas-start"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="offcanvasScrolling"
  >
    <div class="offcanvas-header border-bottom">
      <h5 class="offcanvas-title">
        {{ $t(title) }}
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
      ></button>
    </div>
    <div class="offcanvas-body">
      <slot name="body"></slot>
    </div>
  </aside>
</template>

<script>
export default {
  name: "OffCanvas",
  props: {
    title: {
      type: String,
      required: true,
    },
  },
};
</script>