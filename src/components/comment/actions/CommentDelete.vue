<template>
  <form @submit.prevent="deleteCommentItem" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        {{ $t("comment.delete_confirmation") }}
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton :label="'comment.delete'" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "CommentDelete",
  emits: ["input", "close"],
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
  methods: {
    ...mapActions(["deleteComment", "reloadComments"]),
    async deleteCommentItem() {
      const response = await this.deleteComment(this.comment.id);
      if (response.status >= 200 && response.status < 300) {
        // close modal
        this.$emit("close");
        // redirect to home
        if (this.$route.name == "comment") {
          this.$router.push({ name: "comments" });
        } else {
          this.reloadComments();
        }
        // Success
        addSuccessToast(response);
        return;
      }
      // Error
      addErrorToast(response);
    },
  },
  components: {
    SubmitButton,
  },
};
</script>