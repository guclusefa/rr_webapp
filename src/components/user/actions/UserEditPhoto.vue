<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <InputFile
          @file-updated="captureFile($event)"
          :field="'userEditPhotoPhoto'"
          :label="'user.photo'"
          :validate="validatePhoto"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <img v-if="photoPreview" :src="photoPreview" class="img-fluid" />
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton
          :label="'profile.edit_photo'"
          :disabled="!validateForm()"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import userEditPhotoValidation from "@/mixins/userEditPhotoValidation.js";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import InputFile from "@/components/form/InputFile.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserEdit",
  mixins: [userEditPhotoValidation],
  emits: ["input", "close"],
  data() {
    return {
      body: {
        id: null,
        photo: new File([], ""),
      },
      photoPreview: null,
    };
  },
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapGetters(["user"]),
  },
  methods: {
    // Capture file
    captureFile($event) {
      const file = $event;
      // Reset
      this.body.photo = new File([], "");
      this.photoPreview = null;
      if ($event) {
        this.body.photo = file;
        // Create a new FileReader object
        const reader = new FileReader();
        reader.onload = (event) => {
          this.photoPreview = event.target.result;
        };
        reader.readAsDataURL(file);
      }
    },
    setBody() {
      this.body.id = this.profile.id;
    },
    // Form submit
    ...mapActions(["updateProfilePhoto", "updateUser"]),
    async submitForm() {
      withSubmitValidation(async function () {
        const response = await this.updateProfilePhoto(this.body);
        // Success
        if (response.status >= 200 && response.status < 300) {
          addSuccessToast(response);
          // If my profile
          if (this.profile.id === this.user.id) {
            await this.updateUser(this.body);
          }
          // refresh page (because of bug exaplined in profile.js)
          window.location.reload();
          return;
        }
        // Error
        addErrorToast(response);
      }).apply(this);
    },
  },
  created() {
    this.setBody();
  },
  components: {
    InputFile,
    SubmitButton,
  },
};
</script>