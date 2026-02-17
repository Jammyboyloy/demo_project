import { defineStore } from "pinia";
import { ref } from "vue";
import api from "@/api/http";

export const useArticleStore = defineStore("article", () => {
  const articles = ref([]);
  const loading = ref(false);

  async function fetchArticles({
    search = "",
    sortBy = "createdAt",
    sortDir = "DESC",
  } = {}) {
    loading.value = true;
    try {
      const res = await api.get("/articles", {
        params: {
          search,
          sortBy,
          sortDir,
        },
      });
      articles.value = res.data.data.items;
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      // Professional tip: add a tiny delay if the internet is TOO fast
      // so the skeleton doesn't "flicker" annoyingly.
      loading.value = false;
    }
  }

  return { articles, loading, fetchArticles };
});
