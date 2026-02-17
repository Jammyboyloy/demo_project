<template>
  <div>
    <div>
      <Navbar />

      <div class="d-flex">
        <!-- Sidebar -->
        <Sidebar />

        <!-- Main Content -->
        <div
          class="flex-grow-1 content container"
          style="margin-left: 255px"
        >
          <div class="row justify-content-center">
            <div class="col-12">
              <div class="card p-4">
                <h5 class="fw-bold mb-3">Create New Article</h5>
                <form @submit.prevent="updateArticle">
                  <!-- Title -->
                  <div class="mb-3">
                    <label class="form-label">Article Title</label>
                    <input
                      type="text"
                      class="form-control"
                      v-model="form.title"
                      placeholder="Enter article title"
                    />
                  </div>

                  <!-- Category -->
                  <div class="mb-3">
                    <label class="form-label">Category</label>
                    <select
                      class="form-select"
                      v-model="form.categoryId"
                      :class="{ 'text-muted': !form.categoryId }"
                      @change="(e) => console.log(e.target.value)"
                    >
                      <option
                        v-for="category in cate.category"
                        :key="category.id"
                        :value="category.id"
                      >
                        {{ category?.name ?? "null" }}
                      </option>
                    </select>
                  </div>

                  <!-- Thumbnail -->
                  <div class="mb-3">
                    <label class="form-label">Thumbnail Image</label>

                    <!-- Old thumbnail -->
                    <div class="mb-3 mx-auto">
                      <img
                        :src="previewThumbnail"
                        class="rounded"
                        style="max-height: 150px"
                      />
                    </div>

                    <input
                      type="file"
                      class="form-control"
                      @change="handleFile"
                    />
                  </div>

                  <!-- Content -->
                  <div class="mb-3">
                    <label class="form-label">Content</label>
                    <textarea
                      class="form-control"
                      rows="5"
                      v-model="form.content"
                      placeholder="Write your article content..."
                    ></textarea>
                  </div>

                  <!-- Actions -->
                  <div class="d-flex justify-content-end gap-2">
                    <button type="reset" class="btn btn-outline-secondary">
                      Cancel
                    </button>
                    <button type="submit" class="btn btn-primary">
                      Publish Article
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import api from "@/api/http";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import { useCategoryStore } from "@/stores/category";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

let route = useRoute();
let id = route.params.id;
const oldThumbnail = ref(null);
const previewThumbnail = ref(null);

let cate = useCategoryStore();
const form = ref({
  title: "",
  categoryId: "",
  content: "",
});

onMounted(async () => {
  cate.fetchCategory();

  const res = await api.get(`/articles/${id}`);
  const article = res.data.data;

  form.value = {
    title: article.title,
    categoryId: article.category.id,
    content: article.content,
  };

  oldThumbnail.value = article.thumbnail;
  previewThumbnail.value = article.thumbnail;
});

let file = ref(null);

async function updateArticle() {
  try {
    const res = await api.put(`/articles/${id}`, form.value);
    if (file.value) {
      let formData = new FormData();
      formData.append("thumbnail", file.value);
      const res = await api.post(`/articles/${id}/thumbnail`, formData);
      console.log(res);
    }
  } catch (err) {
    console.log(err);
  }
}

let previewUrl = ref(null);

function handleFile(event) {
  const selectedFile = event.target.files[0];

  if (!selectedFile) {
    previewThumbnail.value = oldThumbnail.value;
    file.value = null;
    return;
  }

  file.value = selectedFile;

  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  previewUrl = URL.createObjectURL(selectedFile);
  previewThumbnail.value = previewUrl;
}
</script>

<style scoped></style>
