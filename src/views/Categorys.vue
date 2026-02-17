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
          <button class="btn btn-primary rounded-pill" @click="handleCreate">
            <i class="bi bi-plus-lg"></i> New Category
          </button>
        </div>
        <div>
          <BaseTable
            :column="columns"
            :rows="cate.category"
            :loading="cate.loading"
            @edit="handleEdit"
            @delete="handleDelete"
          ></BaseTable>
          <BasePagination
            :totalPages="cate.pagination.totalPages"
            :currentPage="cate.pagination.currentPage"
            :hasNextPage="cate.pagination.hasNextPage"
            :hasPreviousPage="cate.pagination.hasPreviousPage"
            :totalItems="cate.pagination.totalItems"
            :itemPerPage="per_page"
            @changePage="changePage"
          />
          <!-- Create Modal / Edit Modal -->
          <Modal v-if="showModal" @close-modal="closeModal">
            <template #header>
              <h1 class="modal-title fs-5 mx-auto">{{ modalTile }}</h1>
            </template>
            <template #body>
              <BaseInput
                input-placeholder="Enter Category Name"
                input-icon="LayoutDashboard"
                v-model="categoryName"
                :isDisabled="isDisabled"
              />
            </template>
            <template #footer>
              <button
                :class="`btn btn-${color}`"
                @click="handleAction"
                :disabled="loading"
              >
                <span
                  v-if="loading"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                {{ modalConfirm }}
              </button>
            </template>
          </Modal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Modal from "@/components/Modal.vue";
import BasePagination from "@/components/BasePagination.vue";
import BaseTable from "@/components/BaseTable.vue";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import { useCategoryStore } from "@/stores/category";
import { onMounted, ref } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import api from "@/api/http";
let cate = useCategoryStore();
let per_page = ref(5);
let columns = [
  { label: "Id", key: "id" },
  { label: "Name", key: "name" },
];

let showModal = ref(false);
let categoryName = ref("");
let loading = ref(false);
let modalTile = ref("");
let modalConfirm = ref("");
let isEdit = ref(null);
let isDelete = ref(null);
let color = ref("danger");
let isDisabled = ref(false);
onMounted(async () => {
  await cate.fetchCategory(1, per_page.value);
  console.log(cate.category);
  console.log(cate.pagination);
});

async function handleAction() {
  loading.value = true;
  try {
    if (isEdit.value) {
      await api.put(`/categories/${isEdit.value}`, {
        name: categoryName.value,
      });
    } else if (isDelete.value) {
      await api.delete(`/categories/${isDelete.value}`);
    } else await api.post("/categories", { name: categoryName.value });
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
    showModal.value = false;
    isEdit.value = null;
    isDelete.value = null;
    cate.fetchCategory(1, per_page.value);
  }
}

const changePage = (page) => {
  cate.fetchCategory(page, per_page.value);
};

const closeModal = () => {
  showModal.value = false;
};

const handleCreate = () => {
  showModal.value = true;
  modalTile.value = "Create Category";
  modalConfirm.value = "Create";
  color.value = "primary";
  categoryName.value = "";
};

const handleEdit = (value) => {
  isEdit.value = value.id;
  showModal.value = true;
  modalTile.value = "Update Category";
  modalConfirm.value = "Update";
  color.value = "primary";
  categoryName.value = value.name;
};

const handleDelete = (value) => {
  isDelete.value = value.id;
  showModal.value = true;
  modalTile.value = "Delete Category";
  modalConfirm.value = "Delete";
  color.value = "danger";
  categoryName.value = value.name;
  isDisabled.value = true;
};
</script>

<style scoped></style>
