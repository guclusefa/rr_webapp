<template>
  <div
    class="offcanvas offcanvas-start"
    data-bs-scroll="true"
    data-bs-backdrop="false"
    tabindex="-1"
    id="offcanvasScrolling"
  >
    <div class="offcanvas-header bg-primary">
      <h5 class="offcanvas-title">
        {{ offCanvas.title }}
      </h5>
      <i
        class="bi bi-x-lg cursor-pointer fs-5"
        id="offCanvasCloseButton"
        data-bs-dismiss="offcanvas"
      ></i>
    </div>
    <div class="offcanvas-body">
      <component :is="offCanvas.body" v-bind="offCanvas.props" />
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "OffCanvas",
  computed: {
    ...mapGetters(["offCanvas"]),
  },
  methods: {
    ...mapActions(["setOffCanvas"]),
  },
  // watch change route, reload offcanvas
  watch: {
    $route() {
      this.setOffCanvas({
        title: "",
        body: null,
        props: {},
      });
      const offcanvasClose = document.getElementById("offCanvasCloseButton");
      offcanvasClose.click();
    },
  },
};
</script>