<template>
  <form @submit.prevent="filter()">
    <div class="row mb-3">
      <div class="col">
        <InputText
          @input="$emit('input', (params.search = $event))"
          :type="'search'"
          :field="'search'"
          :label="'resources.search'"
          :placeholder="'resources.search_placeholder'"
          :value="resourcesParams.search"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <SubmitButton :label="'resources.filter'" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import InputText from "@/components/form/InputText.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserFilters",
  data() {
    return {
      params: {
        search: "",
        verified: 0,
        visibility: 0,
        author: [],
        relation: [],
        category: [],
        order: "createdAt",
        direction: "DESC",
        limit: 10,
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters(["resourcesParams"]),
  },
  methods: {
    ...mapActions(["filterResources"]),
    filter() {
      this.filterResources(this.params);
    },
  },
  created() {
    this.params = this.resourcesParams;
  },
  components: {
    InputText,
    SubmitButton,
  },
};
</script>