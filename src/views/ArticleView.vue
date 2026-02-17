<template>
  <div class="container mt-5">
    <div class="row">
      <template v-if="articleStore.loading">
        <div v-for="i in 6" :key="'skel-' + i" class="col-md-4 mb-4">
          <BaseCard loading />
        </div>
      </template>

      <template v-else>
        <div v-for="article in articleStore.articles" :key="article.id" class="col-md-4 mb-4">
          <BaseCard :item="article" :loading="false" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useArticleStore } from "@/stores/article";
import BaseCard from "@/components/BaseCard.vue";

const articleStore = useArticleStore();

onMounted(() => {
  articleStore.fetchArticles();
});
</script>