<template>
  <div class="position-fixed left-0">
    <div class="sidebar p-3">
      <h5 class="text-white mb-4">Admin Panel</h5>
      <router-link class="active" to="/">
        <i class="bi bi-speedometer2 me-2"></i> Dashboard
      </router-link>
      <router-link to="/myArticles">
        <i class="bi bi-speedometer2 me-2"></i> My Articles
      </router-link>
      <router-link to="/createArt">
        <i class="bi bi-speedometer2 me-2"></i> Create Article
      </router-link>
      <router-link to="/category">
        <i class="bi bi-tags me-2"></i> Categories
      </router-link>
      <a href="#"><i class="bi bi-people me-2"></i> Users</a>
      <a href="#"><i class="bi bi-gear me-2"></i> Settings</a>
      <hr class="border-secondary" />
      <a class="text-white" @click="handleLogout()"
        ><i class="bi bi-box-arrow-left me-2"></i> Logout</a
      >
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRouter } from "vue-router";
let auth = useAuthStore();
let router = useRouter();
async function handleLogout() {
  await auth.logout();
  router.push("/login");
}
</script>

<style scoped></style>
