<template>
  <!-- Side -->
  <div class="col-lg-12 col-xl-6 border position-relative">
    <div class="dropdown position-absolute top-0 end-0 m-2" v-if="canEdit">
      <button class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
        {{ $t("profile.actions") }}
      </button>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#">{{ $t("profile.edit") }}</a></li>
        <li><a class="dropdown-item" href="#">{{ $t("profile.edit_password") }}</a></li>
        <li><a class="dropdown-item" href="#">{{ $t("profile.edit_email") }}</a></li>
        <li v-if="!user.isVerified"><a class="dropdown-item" href="#">{{ $t("profile.verify_email") }}</a></li>
        <li><a class="dropdown-item" href="#">{{ $t("profile.delete") }}</a></li>
      </ul>
    </div>
    <div class="row d-flex align-items-center">
      <div class="col-4">
        <template v-if="user.photo">
          <img :src="user.photo" class="img-fluid" />
        </template>
        <template v-else>
          <img src="@/assets/images/user/default.jpg" class="img-fluid" />
        </template>
      </div>
      <div class="col-8 p-2">
        <div class="text-strong pb-1" v-if="user.username">
          @{{ user.username }}
          <span class="badge bg-primary ms-1" v-if="user.isCertified">
            {{ $t("user.certified") }}
          </span>
          <span class="badge bg-success ms-1" v-if="user.isVerified">
            {{ $t("user.verified") }}
          </span>
        </div>
        <div class="text-muted pb-1" v-if="user.roles[0] || user.gender">
          <span class="badge bg-dark" v-if="user.roles[0]">
            {{ $t(`user.roles.${user.roles[0]}`) }}
          </span>
          <span class="badge bg-secondary ms-1" v-if="user.gender">
            {{ $t(`user.gender.${user.gender}`) }}
          </span>
        </div>
        <div class="text-muted pb-1" v-if="user.email">{{ user.email }}</div>
        <div class="text-muted pb-1" v-if="user.firstName || user.lastName">
          <template v-if="user.firstName">{{ user.firstName }}</template>
          <template v-if="user.lastName">{{ user.lastName }}</template>
        </div>
        <div class="text-muted pb-1" v-if="user.bio">{{ user.bio }}</div>
        <div class="text-muted pb-1" v-if="user.birthDate">
          {{
            $t(`user.age`, {
              birthDate: formatDate(user.birthDate),
              age: getAge(user.birthDate),
            })
          }}
        </div>
        <div class="text-muted pb-1" v-if="user.createdAt">
          {{
            $t(`user.member_since`, {
              createdAt: formatDate(user.createdAt),
              days: getDays(user.createdAt),
            })
          }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dateFormatter from "@/services/dates";

export default {
  name: "UserProfile",
  props: {
    user: {
      type: Object,
      required: true,
    },
    canEdit: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatDate(date) {
      return dateFormatter.formatDate(date);
    },
    getAge(date) {
      return dateFormatter.getAge(date);
    },
    getDays(date) {
      return dateFormatter.getDays(date);
    },
  },
};
</script>