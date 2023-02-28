<template>
  <HeaderItem />
  <main>
    <router-view />
    <aside>
      <ToastMessage />
    </aside>
  </main>
  <FooterItem />
</template>

<script>
import HeaderItem from "@/components/layout/HeaderItem.vue";
import FooterItem from "@/components/layout/FooterItem.vue";
import ToastMessage from "@/components/fragments/ToastMessage.vue";

export default {
  name: "App",
  components: {
    HeaderItem,
    FooterItem,
    ToastMessage,
  },
};
</script>