<template>
  <HeaderItem />
  <main>
    <FlashMessage />
    <router-view />
  </main>
  <FooterItem />
</template>

<script>
import HeaderItem from "@/components/layout/HeaderItem.vue";
import FlashMessage from "@/components/fragments/FlashMessage.vue";
import FooterItem from "@/components/layout/FooterItem.vue";

export default {
  name: "App",
  components: {
    HeaderItem,
    FlashMessage,
    FooterItem,
  },
};
</script>