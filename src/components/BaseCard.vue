<template>
  <div class="card-container">
    <div v-if="loading" class="card h-100 p-3 skeleton-card">
      <div class="skeleton-img mb-3"></div>
      <div class="skeleton-badge mb-2"></div>
      <div class="skeleton-title mb-2"></div>
      <div class="skeleton-content mb-3"></div>
      <div class="d-flex gap-2 align-items-center mt-auto">
        <div class="skeleton-avatar"></div>
        <div class="skeleton-text"></div>
      </div>
    </div>

    <router-link v-else :to="`/detailArt/${item.id}`" class="nav-link">
    <div class="card h-100 p-3 actual-card">
      <div class="card-img" style="height: 200px">
        <img
          :src="item.thumbnail"
          class="card-img-top rounded-3 mb-3 w-100 h-100 object-fit-cover"
        />
      </div>
      <span class="badge bg-success mb-2 w-fit">{{
        item.category?.name || "General"
      }}</span>
      <h5 class="fw-bold">{{ textCut(item.title) }}</h5>
      <p class="text-muted small">{{ textCut(item.content) }}</p>
      <div class="d-flex gap-2 align-items-center mt-auto">
        <img
          :src="item.creator.avatar"
          class="rounded-circle"
          style="width: 35px; height: 35px"
        />
        <small class="text-muted"
          >By {{ item.creator.firstName }} {{ item.creator.lastName }} •
          {{ formatDate(item.createdAt) }}</small
        >
      </div>
    </div>
    </router-link>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
  loading: Boolean,
});

function textCut(text, limit = 35) {
  if (text.length < limit) return text;
  else return text.slice(0, limit) + "...";
}

const formatDate = (date) =>
  new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
</script>

<style scoped>
/* The Shimmer Animation */
@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
}

.skeleton-card div {
  background: #eee;
  background: linear-gradient(90deg, #eff1f3 4%, #e2e2e2 25%, #eff1f3 36%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite linear;
  border-radius: 4px;
}

.skeleton-img {
  width: 100%;
  height: 200px;
}
.skeleton-badge {
  width: 60px;
  height: 18px;
}
.skeleton-title {
  width: 80%;
  height: 22px;
}
.skeleton-content {
  width: 100%;
  height: 40px;
}
.skeleton-avatar {
  width: 35px;
  height: 35px;
  border-radius: 50% !important;
}
.skeleton-text {
  width: 50%;
  height: 14px;
}

/* Smooth fade-in for the actual card */
.actual-card {
  animation: fadeIn 0.4s ease-in;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
