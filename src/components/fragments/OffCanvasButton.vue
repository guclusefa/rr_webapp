<template>
  <button
    :class="classes"
    type="button"
    data-bs-toggle="offcanvas"
    data-bs-target="#offcanvasScrolling"
  >
    {{ $t(label) }}
  </button>
</template>

<script>
export default {
  name: "OffCanvasButton",
  props: {
    label: {
      type: String,
      required: true,
    },
    classes: {
      type: String,
      required: false,
      default: "btn btn-primary",
    },
  },
};
</script>