<template>
  <div>
    <!-- Modal -->
    <div
      class="modal fade"
      :id="id"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content px-2">
          <div class="modal-header border-0">
            <slot name="header"></slot>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div :class="`modal-footer border-0 d-flex ${position}`">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              {{ closeText }}
            </button>
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    require: true,
  },
  closeText: {
    type: String,
    default: "Cancel",
  },
  position: {
    type: String,
    default: "",
  },
});
</script>

<style scoped></style>
