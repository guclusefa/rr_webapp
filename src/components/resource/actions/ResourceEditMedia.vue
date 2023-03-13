<template>
  <form @submit.prevent="submitForm" novalidate>
    <div class="row">
      <div class="col-12 mb-3">
        <InputFile
          @file-updated="captureFile($event)"
          :field="'resourceEditMediaMedia'"
          :label="'resource.media'"
          :validate="validateMedia"
          :accepts="'image/*, video/*'"
        />
      </div>
    </div>
    <div class="row">
      <div class="col-12 mb-3">
        <img v-if="mediaPreview" :src="mediaPreview" class="img-fluid" />
      </div>
    </div>
    <div class="row">
      <div class="col-6 ms-auto text-end">
        <!-- Submit -->
        <SubmitButton
          :label="'resource.edit_media'"
          :disabled="!validateForm()"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";
import resourceEditMediaValidation from "@/mixins/resourceEditMediaValidation.js";
import { withSubmitValidation } from "@/services/validators.js";
import { addSuccessToast, addErrorToast } from "@/services/toasts";

import InputFile from "@/components/form/InputFile.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "ResourceEditMedia",
  mixins: [resourceEditMediaValidation],
  emits: ["input", "close"],
  data() {
    return {
      body: {
        id: null,
        media: new File([], ""),
      },
      mediaPreview: null,
    };
  },
  props: {
    resource: {
      type: Object,
      required: true,
    },
  },
  methods: {
    // Capture file
    captureFile($event) {
      const file = $event;
      // Reset
      this.body.media = new File([], "");
      this.mediaPreview = null;
      if ($event) {
        this.body.media = file;
        // Create a new FileReader object
        const reader = new FileReader();
        reader.onload = (event) => {
          // if video file take the middle frame and converti it to base64 : (TODO not working)
          if (file.type.includes("video")) {
            const video = document.createElement("video");
            video.src = event.target.result;
            video.onloadedmetadata = () => {
              const canvas = document.createElement("canvas");
              canvas.width = video.videoWidth;
              canvas.height = video.videoHeight;
              const ctx = canvas.getContext("2d");
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              this.mediaPreview = canvas.toDataURL("image/jpeg");
            };
          } else {
            this.mediaPreview = event.target.result;
          }
        };
        reader.readAsDataURL(file);
      }
    },
    setBody() {
      this.body.id = this.resource.id;
    },
    // Form submit
    ...mapActions(["updateResourceMedia"]),
    async submitForm() {
      withSubmitValidation(async function () {
        const response = await this.updateResourceMedia(this.body);
        // Success
        if (response.status >= 200 && response.status < 300) {
          addSuccessToast(response);
          // refresh page (because of bug exaplined in profile.js)
          window.location.reload();
          return;
        }
        // Error
        console.log(response);
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