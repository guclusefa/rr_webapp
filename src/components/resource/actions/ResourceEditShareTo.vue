<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <Select2Field
          @input="$emit('input', (shareToBody.users = $event))"
          :field="'resourceEditUsers'"
          :label="'resource.sharetousers'"
          :placeholder="'resource.sharetousers_placeholder_select'"
          :multiple="true"
          :uri="'/users'"
          :text="'username'"
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
  components: {
    Select2Field,
    SubmitButton,
  },
};
</script>
