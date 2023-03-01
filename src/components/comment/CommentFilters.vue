<template>
  <form @submit.prevent="filter()">
    <div class="row mb-3">
      <div class="col">
        <InputText
          @input="$emit('input', (params.search = $event))"
          :type="'search'"
          :field="'search'"
          :label="'comments.search'"
          :placeholder="'comments.search_placeholder'"
          :value="commentsParams.search"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.author = $event))"
          :field="'author'"
          :label="'comments.authors'"
          :options="'authorOptions'"
          :multiple="true"
          :values="commentsParams.author"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.order = $event))"
          :field="'order'"
          :label="'comments.order'"
          :options="'commentsOrderOptions'"
          :value="commentsParams.order"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.direction = $event))"
          :field="'direction'"
          :label="'comments.direction'"
          :options="'directionOptions'"
          :value="commentsParams.direction"
        />
      </div>
    </div>
    <div class="row mb-3">
      <div class="col">
        <SubmitButton :label="'comments.filter'" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

import InputText from "@/components/form/InputText.vue";
import SelectField from "@/components/form/SelectField.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "CommentFilters",
  data() {
    return {
      params: {
        search: "",
        author: [],
        resource: [],
        order: "createdAt",
        direction: "DESC",
        limit: 10,
        page: 1,
      },
    };
  },
  computed: {
    ...mapGetters(["commentsParams"]),
  },
  methods: {
    ...mapActions(["filterComments"]),
    async filter() {
      await this.filterComments(this.params);
    },
  },
  created() {
    this.params = this.commentsParams;
  },
  components: {
    InputText,
    SelectField,
    SubmitButton,
  },
};
</script>