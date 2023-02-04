<template>
  <div class="row">
    <div
      class="col-xxl-3 col-xl-4 col-md-6 col-12"
      v-for="user in users"
      :key="user.id"
    >
      <UserCard :user="user" />
    </div>
  </div>
  <div class="row">
    <div class="col" v-if="loading && users.length === 0">
      <div class="text-center">
        <div class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <button
        class="btn btn-primary mb-3"
        @click="loadMore"
        :disabled="loading"
        v-if="meta.next"
      >
        <span v-if="loading && users.length > 0">
          <span class="spinner-border spinner-border-sm" role="status">
            <span class="sr-only"></span>
          </span>
          Chargement...
        </span>
        <span v-else>Voir plus</span>
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p v-if="users.length > 0">
        {{ meta.end }} éléments pour un total de {{ meta.total }} ({{
          meta.limit
        }}
        éléments par page)
      </p>
      <p v-else-if="!loading">Aucun résultat</p>
    </div>
  </div>
</template>
  
  <script>
import axios from "axios";
import UserCard from "@/components/user/UserCard.vue";

export default {
  data() {
    return {
      users: [],
      meta: [],
      page: 1,
      loading: false,
    };
  },
  methods: {
    async getUsers() {
      this.loading = true;
      try {
        const response = await axios.get(
          "http://localhost:8000/api/users?limit=2&page=" + this.page
        );
        this.meta = response.data["meta"];
        this.users.push(...response.data["data"]);
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false;
      }
    },
    loadMore() {
      this.loading = true;
      this.page++;
      this.getUsers();
    },
  },
  mounted() {
    this.getUsers();
  },
  components: {
    UserCard,
  },
};
</script>
