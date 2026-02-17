import api from "@/api/http";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useDeleteCategoryStore = defineStore("delete", () => {
  const loading = ref(false);
  async function deleteCate(id) {
    loading.value = true;
    try {
      await api.delete(`/categories/${id}`);
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  }
  return { deleteCate, loading };
});
