import api from "@/api/http";
import { defineStore } from "pinia";
import { ref } from "vue";
export const useDeleteArticleStore = defineStore("delete", () => {
  const loading = ref(false);
  const result = ref(false);
  const deleteArticle = async (id) => {
    loading.value = true;
    try {
      const res = await api.delete(`/articles/${id}`);
      result.value = res.result;
    } catch (err) {
      console.log(err);
    } finally {
      loading.value = false;
    }
  };

  return { loading, deleteArticle, result };
});
