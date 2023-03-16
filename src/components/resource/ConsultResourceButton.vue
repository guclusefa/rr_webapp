<template>
  <div class="d-flex align-items-center gap-1">
    <div>
      <button class="btn btn-sm" :focus-visible="false" :focus="false">
        <i
          class="bi bi-bar-chart-fill me-1 dark-txt-white"
          @click="redirect"
          v-if="resource.isConsulted"
        ></i>
        <i class="bi bi-bar-chart dark-txt-white" @click="redirect" v-else></i>
      </button>
    </div>
    <div>
      <a
        v-if="resource.consults > 0"
        href="#"
        @click="showResourceConsults()"
        data-bs-toggle="modal"
        data-bs-target="#modalDialog"
      >
        {{ resource.consults }}
      </a>
      <span v-else>{{ resource.consults }}</span>
    </div>
  </div>
</template>

<script>
import { showModal } from "@/services/modals";
import ResourceLikesList from "@/components/resource/ResourceLikesList";

export default {
  name: "ConsultResourceButton",
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  methods: {
    redirect() {
      this.$router.push({
        name: "resource",
        params: { id: this.resource.id },
      });
    },
    showResourceConsults() {
      showModal(
        this.$t("resource.consults_title", { title: this.resource.title }),
        ResourceLikesList,
        { resource: this.resource, uri: "/consults" }
      );
    },
  },
};
</script>

<style scoped>
.btn:disabled {
  outline: none;
  border-color: transparent !important;
}
.btn {
  padding: 0;
}
</style>