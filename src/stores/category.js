import api from "@/api/http";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
export const useCategoryStore = defineStore("category", () => {
  let category = ref([]);
  let loading = ref(false);
  const pagination = reactive({
    currentPage: 1,
    itemPerPage: 5,
    totalItems: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  async function fetchCategory(page = 1, per_page = 5) {
    loading.value = true;
    try {
      const res = await api.get(
        `/categories?_page=${page}&_per_page=${per_page}&sortBy=createdAt&sortDir=DESC&search=`,
      );
      category.value = res.data.data.items;
      const meta = res.data.data.meta;
      pagination.totalItems = meta.totalItems;
      pagination.currentPage = meta.currentPage;
      pagination.totalPages = meta.totalPages;
      pagination.hasNextPage = meta.hasNextPage;
      pagination.hasPreviousPage = meta.hasPreviousPage;
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      loading.value = false;
    }
    // console.log(res);
  }
  return { category, fetchCategory, loading, pagination };
});
