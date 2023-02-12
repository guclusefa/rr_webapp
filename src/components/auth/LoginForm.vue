<template>
  <div class="row mb-3">
    <div class="col">
      <form @submit.prevent="submitForm" novalidate>
        <!-- Username -->
        <div class="mb-3">
          <InputText
            :type="'text'"
            :field="'username'"
            :label="$t('login.username')"
            :placeholder="$t('login.username_placeholder')"
            @input="body.username = $event"
            :validation="{
              required: {
                value: true,
                message: $t('login.username_required'),
              },
            }"
          />
        </div>
        <!-- Password -->
        <div class="mb-3">
          <InputText
            :type="'password'"
            :field="'password'"
            :label="$t('login.password')"
            :placeholder="$t('login.password_placeholder')"
            @input="body.password = $event"
            :validation="{
              required: {
                value: true,
                message: $t('login.password_required'),
              },
            }"
          />
        </div>
        <!-- Remember Me -->
        <div class="mb-3">
          <CheckBox
            :field="'remember_me'"
            :label="$t('login.remember_me')"
            @update:modelValue="body.remember_me = $event"
          />
        </div>
        <!-- Submit -->
        <div class="mb-3">
          <SubmitButton :label="$t('login.submit')" :isLoading="isLoading" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from "@/services/modules/auth";
import InputText from "../form/InputText.vue";
import CheckBox from "@/components/form/CheckBox.vue";
import SubmitButton from "../form/SubmitButton.vue";

export default {
  name: "LoginForm",
  data() {
    return {
      body: {
        username: "",
        password: "",
        remember_me: false,
      },
    };
  },
  methods: {
    submitForm() {
      // bootstrap validation
      const form = document.querySelector("form");
      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      } else {
        login(this.body);
      }
    },
  },
  components: {
    InputText,
    CheckBox,
    SubmitButton,
  },
};
</script>