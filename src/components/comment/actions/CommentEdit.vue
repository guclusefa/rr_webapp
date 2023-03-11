<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <InputTextarea
          @input="$emit('input', (body.content = $event))"
          :field="this.edit ? 'commentEditContent' : 'commentAddContent'"
          :label="'comment.content'"
          :placeholder="'comment.content_placeholder'"
          :required="true"
          :validate="validateContent"
          :value="this.edit && !this.replyTo ? comment.content : body.content"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton
          :label="
            this.edit
              ? 'comment.edit'
              : this.replyTo
              ? 'comment.reply'
              : 'comment.create'
          "
          :disabled="!validateForm()"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import commentEditValidation from "@/mixins/commentEditValidation.js";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import InputTextarea from "@/components/form/InputTextarea.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "CommentEdit",
  mixins: [commentEditValidation],
  emits: ["input", "close"],
  data() {
    return {
      body: {
        id: 0,
        content: "",
        resource: 0,
      },
    };
  },
  props: {
    comment: {
      type: Object,
      required: false,
      default: null,
    },
    edit: {
      type: Boolean,
      required: false,
      default: true,
    },
    resource: {
      type: Object,
      required: true,
    },
    replyTo: {
      type: Object,
      required: false,
      default: null,
    },
  },
  methods: {
    setBodyCreate() {
      this.body.resource = this.resource.id;
    },
    setBodyEdit() {
      this.body.id = this.comment.id;
      this.body.content = this.comment.content;
    },
    setBodyReply() {
      this.body.id = this.replyTo.id;
    },
    ...mapActions([
      "updateComment",
      "createComment",
      "replyToComment",
      "reloadComment",
      "reloadComments",
    ]),
    async submitForm() {
      withSubmitValidation(async function () {
        // Send request
        const response = this.edit
          ? await this.updateComment(this.body)
          : this.replyTo
          ? await this.replyToComment(this.body)
          : await this.createComment(this.body);
        // Success
        if (response.status >= 200 && response.status < 300) {
          // Reload comments
          await this.reloadComments(this.resource);
          // Reload comment if in comment/id view
          if (this.$route.name == "comment") {
            await this.reloadComment(this.$route.params.id);
          }

          addSuccessToast(response);
          // Close modal (if any)
          this.$emit("close");
          return;
        }
        // Error
        addErrorToast(response);
      }).apply(this);
    },
  },
  mounted() {
    if (this.edit) {
      this.setBodyEdit();
      return;
    }
    if (this.replyTo) {
      this.setBodyReply();
      return;
    }
    this.setBodyCreate();
  },
  components: {
    InputTextarea,
    SubmitButton,
  },
};
</script>