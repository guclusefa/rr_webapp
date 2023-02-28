<template>
  <OffCanvasButton :label="'profiles.filter'" :classes="'btn btn-primary'" />
  <OffCanvas title="profiles.filter">
    <template #body>
      <UserFilters />
    </template>
  </OffCanvas>
</template>

<script>
import OffCanvasButton from "@/components/fragments/OffCanvasButton.vue";
import OffCanvas from "@/components/fragments/OffCanvas.vue";
import UserFilters from "@/components/user/UserFilters.vue";

export default {
  name: "FilterUserButton",
  components: {
    OffCanvasButton,
    OffCanvas,
    UserFilters,
  },
};
</script>