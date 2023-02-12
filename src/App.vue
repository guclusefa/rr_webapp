<template>
  <HeaderItem />
  <main>
    <router-view />
    <ToastMessage />
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