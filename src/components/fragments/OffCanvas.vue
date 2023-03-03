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
        {{ offCanvas.title }}
      </h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
      ></button>
    </div>
    <div class="offcanvas-body">
      <component :is="offCanvas.body" v-bind="offCanvas.props" />
    </div>
  </aside>
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
    },
  },
};
</script>