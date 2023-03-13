<template>
  <template v-if="bans.length > 0 && bansMeta.total > 0">
    <!-- Meta -->
    <div class="row mb-4">
      <div class="d-flex flex-wrap align-items-center">
        <div class="me-auto">
          <h5 v-html="$t('bans.meta', bansMeta)" />
        </div>
        <div class="order-last order-sm-0">
          <AddBanButton />
        </div>
      </div>
    </div>
    <!-- Table -->
    <div class="table-responsive">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">{{ $t("bans.user") }}</th>
            <th scope="col">{{ $t("bans.author") }}</th>
            <th scope="col">{{ $t("bans.reason") }}</th>
            <th scope="col">{{ $t("bans.endDate") }}</th>
            <th scope="col">{{ $t("bans.createdAt") }}</th>
            <th scope="col">{{ $t("bans.updatedAt") }}</th>
            <th scope="col">{{ $t("bans.actions") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ban in bans" :key="ban.id">
            <th scope="row">{{ ban.id }}</th>
            <td>
              <UserIdentifier :user="ban.user" />
            </td>
            <td>
              <UserIdentifier :user="ban.author" />
            </td>
            <td>{{ ban.reason }}</td>
            <td>
              {{ ban.endDate ? formatDate(ban.endDate) : $t("bans.perma") }}
            </td>
            <td>{{ formatDateTime(ban.createdAt) }}</td>
            <td>{{ formatDateTime(ban.updatedAt) }}</td>
            <td>
              <BanActionsButton :ban="ban" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Load more -->
    <div class="row" v-if="bansMeta.next">
      <div class="col">
        <form @submit.prevent="fetchMoreBans">
          <SubmitButton :label="'bans.load_more'" />
        </form>
      </div>
    </div>
  </template>

  <template v-else>
    <!-- Meta -->
    <div class="row mb-4" v-if="bansMeta.total === 0">
      <div class="d-flex flex-wrap align-items-center">
        <div class="me-auto">
          <NoResultMessage />
        </div>
        <div class="order-last order-sm-0">
          <AddBanButton />
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

import AddBanButton from "@/components/admin/ban/AddBanButton.vue";
import BanActionsButton from "@/components/admin/ban/BanActionsButton.vue";

import UserIdentifier from "@/components/user/UserIdentifier.vue";

import NoResultMessage from "@/components/fragments/NoResultMessage.vue";
import LoadingSpinner from "@/components/fragments/LoadingSpinner.vue";
import SubmitButton from "@/components/form/SubmitButton.vue";

export default {
  name: "UserList",
  mixins: [dateFormatter],
  computed: {
    ...mapGetters(["bans", "bansParams", "bansMeta"]),
  },
  methods: {
    ...mapActions(["setBans"]),
    async fetchMoreBans() {
      // Request
      const response = await this.setBans({
        ...this.bansParams,
        page: this.bansMeta.page + 1,
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
    AddBanButton,
    BanActionsButton,

    UserIdentifier,

    NoResultMessage,
    LoadingSpinner,
    SubmitButton,
  },
};
</script>