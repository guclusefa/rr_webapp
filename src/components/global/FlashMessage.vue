 <template>
  <div class="alert alert-danger" role="alert" v-if="errorMessage">
    {{ errorMessage }}
  </div>
</template>

<script>
export default {
  name: "FlashMessage",
  props: {
    errorMessage: {
      type: String,
      required: true,
    },
  },
};
</script>