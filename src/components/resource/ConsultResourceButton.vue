<template>
  <button class="btn btn-sm" @click="redirect">
    <i class="bi bi-bar-chart-fill me-1" v-if="resource.isConsulted"></i>
    <i class="bi bi-bar-chart me-1" v-else></i>
    {{ resource.consults }}
  </button>
</template>

<script>
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
  },
};
</script>