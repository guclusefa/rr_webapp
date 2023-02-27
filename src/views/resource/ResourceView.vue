<template>
  <section>
    <div class="container" v-if="this.resource.id == this.id">
      <div class="row">
        <div class="col">
          <h1>{{ $t("resource.title", { title: resource.title }) }}</h1>
          <hr />
        </div>
      </div>
      <div class="row">
        <div class="col">
          <ResourceItem />
        </div>
      </div>
    </div>
    <LoadingSpinner v-else />
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts";

import ResourceItem from "@/components/resource/ResourceItem";
import LoadingSpinner from "@/components/fragments/LoadingSpinner";

export default {
  name: "ResourceView",
  computed: {
    ...mapGetters(["resource"]),
    id() {
      return this.$route.params.id;
    },
  },
  methods: {
    ...mapActions(["setResource"]),
    async setResourceItem() {
      console.log("setResourceItem");
      console.log(this.id);

      const response = await this.setResource(this.id);
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      if(response.status === 404) {
        addErrorToast("resource.not_found");
      } else {
        addErrorToast(response);
      }
      this.$router.push({ name: "home" });
    },
  },
  beforeMount() {
    this.setResourceItem();
  },
  watch: {
    id() {
      this.setResourceItem();
    },
  },
  components: {
    ResourceItem,
    LoadingSpinner,
  },
};
</script>