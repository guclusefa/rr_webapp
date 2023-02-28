<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <InputTextarea
          @input="$emit('input', (body.content = $event))"
          :field="'commentContent'"
          :label="'comment.content'"
          :placeholder="'comment.content_placeholder'"
          :required="true"
          :validate="validateContent"
          :value="this.edit ? comment.content : body.content"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6">
        <!-- Submit -->
        <SubmitButton
          :label="this.edit ? 'comment.edit' : 'comment.create'"
          :disabled="!validateForm()"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import commentEditValidation from "@/mixins/commentEditValidation.js";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import InputTextarea from "@/components/form/InputTextarea.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "CommentEdit",
  mixins: [commentEditValidation],
  data() {
    return {
      body: {
        content: "",
        resource: 0,
      },
    };
  },
  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
    resource: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["comment", "commentsParamsDefault"]),
  },
  methods: {
    setBody() {
      this.body.content = this.comment.content;
    },
    ...mapActions(["updateComment", "createComment", "reloadComments"]),
    async submitForm() {
      withSubmitValidation(async function () {
        // Set resource id
        this.body.resource = this.resource.id;
        // Send request
        const response = this.edit
          ? await this.updateComment(this.body)
          : await this.createComment(this.body);
        // Success
        if (response.status >= 200 && response.status < 300) {
          if (!this.edit) {
            this.reloadComments();
          }
          addSuccessToast(response);
          return;
        }
        // Error
        addErrorToast(response);
      }).apply(this);
    },
  },
  mounted() {
    if (this.edit) {
      this.setBody();
    }
  },
  components: {
    InputTextarea,
    SubmitButton,
  },
};
</script>