<template>
  <button type="button" class="btn btn-primary" @click="$refs.addModal.show()">
    {{ $t("resources.create") }}
  </button>
  <ModalDialog ref="addModal" :title="'ressources.create'">
    <template #body>
      <ResourceEdit :edit="false" @close="$refs.addModal.close()" />
    </template>
  </ModalDialog>
</template>

<script>
import ModalDialog from "@/components/fragments/ModalDialog";
import ResourceEdit from "@/components/resource/ResourceEdit";

export default {
  name: "AddResource",
  components: {
    ModalDialog,
    ResourceEdit,
  },
};
</script>