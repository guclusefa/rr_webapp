<template>
  <template v-if="categories.length > 0 && categoriesMeta.total > 0">
    <!-- Meta -->
    <div class="row mb-4">
      <div class="col">
        <h5>
          {{ $t("categories.meta", categoriesMeta) }}
        </h5>
      </div>
      <div class="col">
        <div class="float-end">
          <AddCategoryButton />
        </div>
      </div>
    </div>
    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{{ $t("categories.name") }}</th>
            <th scope="col">{{ $t("categories.createdAt") }}</th>
            <th scope="col">{{ $t("categories.updatedAt") }}</th>
            <th scope="col">{{ $t("categories.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <th scope="row">{{ category.id }}</th>
            <td>{{ category.name }}</td>
            <td>{{ formatDateTime(category.createdAt) }}</td>
            <td>{{ formatDateTime(category.updatedAt) }}</td>
            <td>
              <CategoryActionsButton :category="category" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Load more -->
    <div class="row" v-if="categoriesMeta.next">
      <div class="col">
        <form @submit.prevent="fetchMoreCategories">
          <SubmitButton :label="'categories.load_more'" />
        </form>
      </div>
    </div>
  </template>

  <template v-else>
    <!-- Meta -->
    <div class="row mb-4" v-if="categoriesMeta.total === 0">
      <div class="col">
        <NoResultMessage />
      </div>
    </div>
    <!-- Loading -->
    <LoadingSpinner v-else />
  </template>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { addErrorToast } from "@/services/toasts.js";

import dateFormatter from "@/mixins/dateFormatter";

import AddCategoryButton from "@/components/admin/category/AddCategoryButton.vue";
import CategoryActionsButton from "@/components/admin/category/CategoryActionsButton.vue";

import NoResultMessage from "@/components/fragments/NoResultMessage.vue";
import LoadingSpinner from "@/components/fragments/LoadingSpinner.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserList",
  mixins: [dateFormatter],
  computed: {
    ...mapGetters(["categories", "categoriesParams", "categoriesMeta"]),
  },
  methods: {
    ...mapActions(["setCategories"]),
    async fetchMoreCategories() {
      // Request
      const response = await this.setCategories({
        ...this.categoriesParams,
        page: this.categoriesMeta.page + 1,
      });
      // Success
      if (response.status >= 200 && response.status < 300) {
        return;
      }
      // Error
      addErrorToast(response);
    },
  },
  components: {
    AddCategoryButton,
    CategoryActionsButton,

    NoResultMessage,
    LoadingSpinner,
    SubmitButton,
  },
};
</script>