<template>
  <div class="card d-flex align-items-center p-4">
    <Select
      v-model="selectCate"
      :options="cate.category"
      optionLabel="name"
      filter
      filterPlaceholder="Search Categories"
      placeholder="Select Category"
      class="w-50"
    >
      <template #option="slotProps">
        <div class="d-flex align-items-center gap-3 py-2">
          <LayoutGrid/>
          <span>{{ slotProps.option.name }}</span>
        </div>
      </template>
    </Select>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Select from "primevue/select";
import { useCategoryStore } from "@/stores/category";

const cate = useCategoryStore();
const selectCate = ref(null);

onMounted(() => {
  cate.fetchCategory();
});
</script>

<style>

</style>