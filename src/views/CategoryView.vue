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
          <button
            data-bs-toggle="modal"
            data-bs-target="#createCategory"
            class="btn btn-primary rounded-pill"
          >
            <i class="bi bi-plus-lg"></i> New Category
          </button>
        </div>

        <BaseModal id="createCategory">
          <template #header>
            <h1 class="modal-title fs-5 mx-auto">Create Category</h1>
          </template>
          <template #body>
            <BaseInput
              input-placeholder="Enter Category Name"
              input-icon="LayoutDashboard"
              v-model="categoryName"
            />
          </template>
          <template #footer>
            <button
              class="btn btn-primary"
              @click="createCategory"
              :disabled="loading"
            >
              <span
                v-if="loading"
                class="spinner-border spinner-border-sm me-2"
              ></span>
              Create
            </button>
          </template>
        </BaseModal>

        <div>
          <BaseTable
            :column="columns"
            :rows="cate.category"
            :loading="cate.loading"
            @delete="handleDelete"
          >
            <!-- <template #col-category="{ value }">
              {{ value?.name ?? "N/A" }}
            </template> -->
          </BaseTable>

          <BaseModal id="deleteModal" position="justify-content-center">
            <template #header>
              <h1 class="modal-title fs-5 mx-auto">Modal title</h1>
            </template>
            <template #body>
              <p class="text-center m-0 p-0">
                Are you sure you want to delete
                <strong>{{ selectedCategory?.name }}</strong> ?
              </p>
            </template>
            <template #footer>
              <button
                class="btn btn-danger"
                @click="deleteSelectCategory"
                :disabled="deleteCategory.loading"
              >
                <span
                  v-if="deleteCategory.loading"
                  class="spinner-border spinner-border-sm me-2"
                ></span>
                Confirm
              </button>
            </template>
          </BaseModal>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import BaseTable from "@/components/BaseTable.vue";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import BaseModal from "@/components/BaseModal.vue";
import { useCategoryStore } from "@/stores/category";
import { useDeleteCategoryStore } from "@/stores/deleteCategory";
import { ref, onMounted } from "vue";
import BaseInput from "@/components/BaseInput.vue";
import api from "@/api/http";
let columns = [{ label: "Name", key: "name" }];
let cate = useCategoryStore();
let deleteCategory = useDeleteCategoryStore();
const selectedCategory = ref(null);
const categoryName = ref("");
let loading = ref(false);

onMounted(() => {
  cate.fetchCategory();
});

const handleDelete = (cate) => {
  selectedCategory.value = cate;
};

async function deleteSelectCategory() {
  await deleteCategory.deleteCate(selectedCategory.value.id);

  const modalEl = document.getElementById("deleteModal");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();

  await cate.fetchCategory();

  selectedCategory.value = null;
}

async function createCategory() {
  loading.value = true;
  try {
    await api.post("/categories", { name: categoryName.value });
  } catch (err) {
    console.log(err);
  } finally {
    loading.value = false;
    categoryName.value = "";
  }

  const modalEl = document.getElementById("createCategory");
  const modal = bootstrap.Modal.getInstance(modalEl);
  modal.hide();

  await cate.fetchCategory();
}
</script>

<style scoped></style>
