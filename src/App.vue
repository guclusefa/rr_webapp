<template>
  <HeaderItem />
  <main>
    <router-view />
  </main>
  <FooterItem />
</template>

<script>
import HeaderItem from "@/components/layout/HeaderItem.vue";
import FooterItem from "@/components/layout/FooterItem.vue";

export default {
  name: "App",
  // make loading available in all components
  components: {
    HeaderItem,
    FooterItem,
  },
};
</script>