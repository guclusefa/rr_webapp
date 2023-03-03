<template>
  <HeaderItem />
  <main>
    <router-view />
    <aside>
      <ModalDialog />
    </aside>
    <aside>
      <OffCanvas />
    </aside>
    <aside>
      <ToastMessage />
    </aside>
  </main>
  <FooterItem />
</template>

<script>
import HeaderItem from "@/components/layout/HeaderItem.vue";
import FooterItem from "@/components/layout/FooterItem.vue";

import OffCanvas from "@/components/fragments/OffCanvas.vue";
import ModalDialog from "@/components/fragments/ModalDialog.vue";
import ToastMessage from "@/components/fragments/ToastMessage.vue";

export default {
  name: "App",
  components: {
    HeaderItem,
    FooterItem,

    OffCanvas,
    ModalDialog,
    ToastMessage,
  },
};
</script>