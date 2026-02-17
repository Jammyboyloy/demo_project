<template>
  <div>
    <Navbar />
    <div class="d-flex">
      <Sidebar />
      <div class="flex-grow-1 content container" style="margin-left: 255px">
        <div class="d-flex justify-content-between align-items-center mb-4">
          <h3 class="fw-bold">My Article</h3>
          <button
            @click="router.push('/createArt')"
            class="btn btn-primary rounded-pill"
          >
            New Article
          </button>
        </div>

        <BaseTable
          :rows="myArticle.ownArticle"
          :column="columns"
          :loading="myArticle.loading"
          :pagination="myArticle.pagination"
          :itemPerPage="per_page"
          @edit="goEdit"
          @delete="handleDelete"
        >
          <template #col-thumbnail="{ value }">
            <img :src="value" class="rounded-2" width="70" height="70" />
          </template>

          <template #col-category="{ value }">
            {{ value?.name ?? "N/A" }}
          </template>
        </BaseTable>

        <BaseModal id="deleteModal" position="justify-content-center">
          <template #header>
            <h1 class="modal-title fs-5 mx-auto">Modal title</h1>
          </template>
          <template #body>
            <p class="text-center m-0 p-0">
              Are you sure you want to delete
              <strong>{{ selectedArticle?.id }}</strong> ?
            </p>
          </template>
          <template #footer>
            <button
              class="btn btn-danger"
              @click="deleteSelectArticle"
              :disabled="deleteArt.loading"
            >
              <span
                v-if="deleteArt.loading"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              Confirm
            </button>
          </template>
        </BaseModal>

        <BasePagination
          :totalPages="myArticle.pagination.totalPages"
          :current-page="myArticle.pagination.currentPage"
          :total-items="myArticle.pagination.totalItems"
          :item-per-page="per_page"
          :has-next-page="myArticle.pagination.hasNextPage"
          :has-previous-page="myArticle.pagination.hasPreviousPage"
          @changePage="changePage"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOwnArticleStore } from "@/stores/ownArticle";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/http";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import BaseTable from "@/components/BaseTable.vue";
import BasePagination from "@/components/BasePagination.vue";
import BaseModal from "@/components/BaseModal.vue";
import { useDeleteArticleStore } from "@/stores/deleteArticle";

const myArticle = useOwnArticleStore();
const router = useRouter();
const per_page = ref(3);
let deleteArt = useDeleteArticleStore();

const columns = [
  { label: "id", key: "id" },
  { label: "title", key: "title" },
  { label: "category", key: "category" },
  { label: "content", key: "content" },
  { label: "thumbnail", key: "thumbnail" },
];

onMounted(() => {
  myArticle.fetchOwnArticle(1, per_page.value);
});

const changePage = (page) => {
  myArticle.fetchOwnArticle(page, per_page.value);
};

const selectedArticle = ref(null);

const handleDelete = (article) => {
  selectedArticle.value = article;
  console.log(selectedArticle.value)
};

async function deleteSelectArticle() {
  await deleteArt.deleteArticle(selectedArticle.value.id);

  const modalEl = document.getElementById("deleteModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();

  await myArticle.fetchOwnArticle(
    myArticle.pagination.currentPage,
    per_page.value,
  );

  selectedArticle.value = null;
}

function goEdit(id) {
  router.push(`/editArt/${id}`);
}
</script>
