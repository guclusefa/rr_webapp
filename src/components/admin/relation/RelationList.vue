<template>
  <template v-if="relations.length > 0 && relationsMeta.total > 0">
    <!-- Meta -->
    <div class="row mb-4">
      <div class="col">
        <h5>
          {{ $t("relations.meta", relationsMeta) }}
        </h5>
      </div>
      <div class="col">
        <div class="float-end">
          <AddRelationButton />
        </div>
      </div>
    </div>
    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{{ $t("relations.name") }}</th>
            <th scope="col">{{ $t("relations.createdAt") }}</th>
            <th scope="col">{{ $t("relations.updatedAt") }}</th>
            <th scope="col">{{ $t("relations.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="relation in relations" :key="relation.id">
            <th scope="row">{{ relation.id }}</th>
            <td>{{ relation.name }}</td>
            <td>{{ formatDateTime(relation.createdAt) }}</td>
            <td>{{ formatDateTime(relation.updatedAt) }}</td>
            <td>
              <RelationActionsButton :relation="relation" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Load more -->
    <div class="row" v-if="relationsMeta.next">
      <div class="col">
        <form @submit.prevent="fetchMoreRelations">
          <SubmitButton :label="'relations.load_more'" />
        </form>
      </div>
    </div>
  </template>

  <template v-else>
    <!-- Meta -->
    <div class="row mb-4" v-if="relationsMeta.total === 0">
      <div class="col">
        <NoResultMessage />
      </div>
      <div class="col">
        <div class="float-end">
          <AddRelationButton />
        </div>
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

import AddRelationButton from "@/components/admin/relation/AddRelationButton.vue";
import RelationActionsButton from "@/components/admin/relation/RelationActionsButton.vue";

import NoResultMessage from "@/components/fragments/NoResultMessage.vue";
import LoadingSpinner from "@/components/fragments/LoadingSpinner.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserList",
  mixins: [dateFormatter],
  computed: {
    ...mapGetters(["relations", "relationsParams", "relationsMeta"]),
  },
  methods: {
    ...mapActions(["setRelations"]),
    async fetchMoreRelations() {
      // Request
      const response = await this.setRelations({
        ...this.relationsParams,
        page: this.relationsMeta.page + 1,
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
    AddRelationButton,
    RelationActionsButton,

    NoResultMessage,
    LoadingSpinner,
    SubmitButton,
  },
};
</script>