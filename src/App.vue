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
import FooterItem from "@/components/layout/FooterItem.vue";

export default {
  name: "App",
  components: {
    HeaderItem,
    FooterItem,
  },
};
</script>