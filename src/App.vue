<template>
  <HeaderItem />
  {{ token }}
  <main>
    <FlashMessage />
    <router-view />
  </main>
  <FooterItem />
</template>

<script>
import { mapGetters } from "vuex";

import HeaderItem from "@/components/layout/HeaderItem.vue";
import FlashMessage from "@/components/fragments/FlashMessage.vue";
import FooterItem from "@/components/layout/FooterItem.vue";

export default {
  name: "App",
  computed: {
    ...mapGetters(["token"]),
  },
  components: {
    HeaderItem,
    FlashMessage,
    FooterItem,
  },
};
</script>