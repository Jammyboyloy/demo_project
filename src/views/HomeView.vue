<script setup>
import "@/assets/style.css";
import BaseCard from "@/components/BaseCard.vue";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import { useArticleStore } from "@/stores/article";
import { useAuthStore } from "@/stores/auth";
import { onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
const toast = useToast();

let articleStore = useArticleStore();
let auth = useAuthStore();
let router = useRouter();
function goCreateArticle() {
  router.push("/createArt");
}

const search = ref("");
const sortDir = ref("DESC");

onMounted(() => {
  articleStore.fetchArticles();
  if (auth.loginSuccess) {
    toast.success("Login Successfully!");
    auth.loginSuccess = false;
  }
});

watch([search, sortDir], async ([newSearch, newSortDir]) => {
  await articleStore.fetchArticles({ search: newSearch, sortDir: newSortDir });
});

</script>

<template>
  <div>
    <Navbar />

    <div class="d-flex">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Main Content -->
      <div class="flex-grow-1 content container" style="margin-left: 255px">
        <!-- Page Title -->
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold">Article List</h3>
          <div class="d-flex gap-5">
            <input
              type="text"
              v-model="search"
              class="form-control py-2"
              placeholder="Search Article..."
            />
            <select
              v-model="sortDir"
              class="form-select"
              aria-label="Default select example"
            >
              <option value="" selected disabled>Choose</option>
              <option value="ASC">Ascending</option>
              <option value="DESC">Descending</option>
            </select>
          </div>
        </div>

        <!-- Stats -->
        <div class="row mb-4">
          <div class="col-md-4">
            <div class="card p-3">
              <h6>Total Articles</h6>
              <h3 class="fw-bold">120</h3>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card p-3">
              <h6>Published</h6>
              <h3 class="fw-bold text-success">85</h3>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card p-3">
              <h6>Draft</h6>
              <h3 class="fw-bold text-warning">35</h3>
            </div>
          </div>
        </div>

        <!-- Article Cards -->
        <div class="row g-4">
          <template v-if="articleStore.loading">
            <div v-for="i in 6" :key="'skel-' + i" class="col-md-4 mb-4">
              <BaseCard loading />
            </div>
          </template>

          <template v-else>
            <div
              v-for="article in articleStore.articles"
              :key="article.id"
              class="col-md-4 mb-4"
            >
              <BaseCard :item="article" :loading="false" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
