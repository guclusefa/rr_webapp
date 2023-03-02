<template>
  <form @submit.prevent="filter()">
    <div class="row mb-3">
      <div class="col">
        <InputText
          @input="$emit('input', (params.search = $event))"
          :type="'search'"
          :field="'filterCommentSearch'"
          :label="'comments.search'"
          :placeholder="'comments.search_placeholder'"
          :value="commentsParams.search"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <Select2Field
          @input="$emit('input', (commentsParams.resource = $event))"
          :field="'filterCommentResource'"
          :label="'comments.resources'"
          :placeholder="'comments.resources_placeholder_select'"
          :multiple="true"
          :uri="'/resources'"
          :text="'title'"
          :values="commentsParams.resource"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <Select2Field
          @input="$emit('input', (commentsParams.author = $event))"
          :field="'filterCommentAuthor'"
          :label="'comments.authors'"
          :placeholder="'comments.authors_placeholder_select'"
          :multiple="true"
          :uri="'/users'"
          :text="'username'"
          :values="commentsParams.author"
        />
      </div>
    </div>

    <div class="row mb-3">
      <div class="col">
        <SelectField
          @input="$emit('input', (params.order = $event))"
          :field="'filterCommentOrder'"
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
          :field="'filterCommentDirection'"
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
import Select2Field from "@/components/form/Select2Field.vue";
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
    Select2Field,
    SubmitButton,
  },
};
</script>