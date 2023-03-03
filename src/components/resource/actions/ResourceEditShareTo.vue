<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <Select2Field
          @input="$emit('input', (body.users = $event))"
          :field="'resourceEditUsers'"
          :label="'resource.sharetousers'"
          :placeholder="'resource.sharetousers_placeholder_select'"
          :multiple="true"
          :uri="'/users'"
          :text="'username'"
          :values="[ 5, 6, 4, 10, 7, 8, 3 ]"
        />
      </div>
    </div>

    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton :label="'resource.edit_shareto'" />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import Select2Field from "@/components/form/Select2Field.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "ResourceEditShareTo",
  data() {
    return {
      body: {
        id: null,
        users: [],
      },
    };
  },
  computed: {
    ...mapGetters(["resource"]),
  },
  methods: {
    setBody() {
      this.body.id = this.resource.id;
      if (this.resource.sharesTo) {
        let ids = [];
        for (let i = 0; i < this.resource.sharesTo.length; i++) {
          ids.push(this.resource.sharesTo[i].user.id);
        }
        this.body.users = ids;
      }
    },
    ...mapActions(["shareResourceTo"]),
    async submitForm() {
      // turn users array into object
      const users = this.body.users.map((user) => {
        return { id: user };
      });
      this.body.users = users;
      // Send request
      const response = await this.shareResourceTo(this.body);
      // Success
      if (response.status >= 200 && response.status < 300) {
        addSuccessToast(response);
        // Close modal (if any)
        this.$emit("close");
        return;
      }
      // Error
      addErrorToast(response);
    },
  },
  beforeMount() {
    this.setBody();
  },
  components: {
    Select2Field,
    SubmitButton,
  },
};
</script>
