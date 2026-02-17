<template>
  <div>
    <Navbar />

    <div class="d-flex">
      <Sidebar />

      <div class="flex-grow-1 content container" style="margin-left: 255px">
        <div class="row justify-content-center">
          <div class="col-12">
            <div class="card p-4">
              <h5 class="fw-bold mb-3">Create New Article</h5>

              <form @submit.prevent="createArticle">
                <!-- Title -->
                <div class="mb-2">
                  <label class="form-label">Article Title</label>
                  <input
                    type="text"
                    class="form-control mb-2"
                    v-model="form.title"
                    placeholder="Enter article title"
                  />
                  <p v-if="err.title" class="text-danger m-0 p-0">
                    {{ err.title }}
                  </p>
                </div>

                <!-- Category -->
                <div class="mb-2">
                  <label class="form-label">Category</label>
                  <select class="form-select mb-2" v-model="form.categoryId">
                    <option selected disabled hidden value="">
                      Choose category
                    </option>
                    <option
                      v-for="category in cate.category"
                      :key="category.id"
                      :value="category.id"
                    >
                      {{ category.name }}
                    </option>
                  </select>
                  <p v-if="err.category" class="text-danger m-0 p-0">
                    {{ err.category }}
                  </p>
                </div>

                <!-- Thumbnail -->
                <div class="mb-3">
                  <label class="form-label">Thumbnail Image</label>

                  <div v-if="haveImg" class="mb-3 mx-auto">
                    <img
                      :src="previewThumbnail"
                      class="rounded"
                      style="max-height: 150px"
                    />
                  </div>

                  <input
                    type="file"
                    class="form-control mb-2"
                    @change="handleFile"
                  />

                  <p v-if="err.thumbnail" class="text-danger m-0 p-0">
                    {{ err.thumbnail }}
                  </p>
                </div>

                <!-- Content -->
                <div class="mb-3">
                  <label class="form-label">Content</label>
                  <textarea
                    class="form-control mb-2"
                    rows="5"
                    v-model="form.content"
                    placeholder="Write your article content..."
                  ></textarea>
                  <p v-if="err.content" class="text-danger m-0 p-0">
                    {{ err.content }}
                  </p>
                </div>

                <!-- Actions -->
                <div class="d-flex justify-content-end gap-2">
                  <button type="reset" class="btn btn-outline-secondary">
                    Cancel
                  </button>

                  <button
                    type="submit"
                    class="btn btn-primary"
                    :disabled="loading"
                  >
                    <span
                      v-if="loading"
                      class="spinner-border spinner-border-sm me-2"
                    ></span>
                    Publish Article
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Crop Modal -->
    <Modal
      v-if="showCropModal"
      @closeModal="showCropModal = false"
      closeText="Cancel"
    >
      <template #header>
        <h5 class="mx-auto">Crop Thumbnail</h5>
      </template>

      <template #body>
        <div style="height: 250px">
          <Cropper
            ref="cropperRef"
            :src="cropImage"
            :stencil-props="{ aspectRatio: 1 }"
            :default-size="defaultSize"
            image-restriction="stencil"
          />
        </div>
      </template>

      <template #footer>
        <button class="btn btn-primary" @click="confirmCrop">Confirm</button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import api from "@/api/http";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import Modal from "@/components/Modal.vue";
import { useCategoryStore } from "@/stores/category";
import { notify } from "@/utils/toast";
import {
  validates,
  require,
  checkContent,
  checkFileSize,
} from "@/utils/validate";

import { ref, reactive, onMounted } from "vue";
import { useRouter } from "vue-router";

import { Cropper } from "vue-advanced-cropper";
import "vue-advanced-cropper/dist/style.css";

const router = useRouter();
const cate = useCategoryStore();
const toast = notify(router);

const loading = ref(false);
const previewThumbnail = ref(null);
const haveImg = ref(false);
const file = ref(null);

const showCropModal = ref(false);
const cropperRef = ref(null);
const cropImage = ref(null);

const form = ref({
  title: "",
  categoryId: "",
  content: "",
});

const err = reactive({
  title: "",
  category: "",
  content: "",
  thumbnail: "",
});

onMounted(() => {
  cate.fetchCategory();
});

function defaultSize({ imageSize }) {
  return {
    width: imageSize.width,
    height: imageSize.height,
  };
}

function handleFile(event) {
  const selectFile = event.target.files[0];
  if (!selectFile) return;

  if (selectFile.size > 1024 * 1024) {
    err.thumbnail = "Image must be under 1MB";
    return;
  }

  cropImage.value = URL.createObjectURL(selectFile);
  showCropModal.value = true;
}

function confirmCrop() {
  const result = cropperRef.value.getResult();
  const canvas = result.canvas;

  canvas.toBlob(
    (blob) => {
      file.value = new File([blob], "thumbnail.png", {
        type: "image/png",
      });

      previewThumbnail.value = URL.createObjectURL(blob);
      haveImg.value = true;
      showCropModal.value = false;
    },
    "image/png",
    0.9,
  );
}

function validateForm() {
  err.title = require(form.value.title, "Title is required");
  err.category = require(form.value.categoryId, "Category is required");

  err.content = validates(form.value.content, [
    (v) => require(v, "Content is required"),
    (v) => checkContent(v, "Content must be at least 10 characters long"),
  ]);

  err.thumbnail = require(file.value, "Thumbnail is required");

  return !err.title && !err.category && !err.content && !err.thumbnail;
}

async function createArticle() {
  if (!validateForm()) return;

  loading.value = true;

  try {
    const res = await api.post("/articles", form.value);
    const id = res.data.data.id;

    if (file.value) {
      const formData = new FormData();
      formData.append("thumbnail", file.value);

      await api.post(`/articles/${id}/thumbnail`, formData);
    }

    toast.success("Created Article Successfully!", "/myArticles");
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}
</script>