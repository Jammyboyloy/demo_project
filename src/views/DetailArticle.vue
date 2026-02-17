<script setup>
import api from "@/api/http";
import "@/assets/style.css";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const details = ref([]);

function goDashboard() {
  router.push("/");
}

onMounted(async () => {
  const res = await api.get(`/articles/${id}`);
  console.log(res);
  details.value = res.data.data;
});
</script>

<template>
  <div>
    <Navbar />

    <div class="d-flex">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Main Content -->
      <div
        class="flex-grow-1 content container mt-8"
        style="margin-left: 255px"
      >
        <!-- Page Title -->
        <div class="d-flex align-items-center mb-4">
          <button @click="goDashboard" class="btn fw-bold">
            <ChevronsLeft style="width: 35px; height: 35px" />
          </button>
          <h3 class="fw-medium mx-auto m-0 p-0">Detail Article</h3>
        </div>

        <div class="bg-white shadow-sm py-5 rounded-4 px-5">
          <div class="row">
            <div class="col-6">
              <div class="w-100" style="height: 400px">
                <img
                  :src="details.thumbnail"
                  alt=""
                  class="object-fit-contain w-100 h-100"
                />
              </div>
            </div>
            <div class="col-6">
              <div class="d-flex flex-column gap-4">
                <div class="d-flex align-items-center gap-3">
                  <img
                    :src="details.creator?.avatar"
                    alt=""
                    class="rounded-circle"
                    style="width: 35px; height: 35px"
                  />
                  <h6 class="m-0 p-0">
                    By {{ details.creator?.firstName }}
                    {{ details.creator?.lastName }}
                  </h6>
                  <h6 class="m-0 p-0 text-muted">
                    {{
                      new Date(details.createdAt).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    }}
                  </h6>
                </div>
                <h4>Title : {{ details?.title }}</h4>
                <h5>Category : {{ details.category?.name ?? "null" }}</h5>
                <h5 class="text-secondary">Content : {{ details?.content }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
