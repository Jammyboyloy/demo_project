import { defineStore } from "pinia";
import api from "@/api/http";
import { reactive, ref } from "vue";

export const useOwnArticleStore = defineStore("own", () => {
  const ownArticle = ref([]);
  const loading = ref(false);
  const pagination = reactive({
    currentPage: 1,
    itemPerPage: 3, 
    totalItems: 0,
    totalPages: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  async function fetchOwnArticle(page, per_page) {
    loading.value = true;
    
    pagination.currentPage = page;
    pagination.itemPerPage = per_page;

    try {
      const res = await api.get(
        `/articles/own?search=&_page=${page}&_per_page=${per_page}&sortBy=createdAt&sortDir=DESC`,
      );
      
      ownArticle.value = res.data.data.items || [];
      
      // Update pagination metadata
      const meta = res.data.data.meta;
      pagination.totalItems = meta.totalItems;
      pagination.totalPages = meta.totalPages;
      pagination.hasNextPage = meta.hasNextPage;
      pagination.hasPreviousPage = meta.hasPreviousPage;
    } catch (err) {
      console.error("API Error:", err);
    } finally {
      loading.value = false;
    }
  }

  return { ownArticle, fetchOwnArticle, loading, pagination };
});