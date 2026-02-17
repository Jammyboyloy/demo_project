<template>
  <div class="position-sticky w-100 top-0 z-3">
    <nav class="navbar navbar-expand-lg navbar-light bg-white shadow-sm px-4">
      <div class="container-fluid">
        <span class="navbar-brand fw-bold">📰 Article Dashboard</span>

        <div class="d-flex align-items-center gap-3">
          <div class="nav-dropdown p-2">
            <div>
              <img
                src="https://i.pravatar.cc/40"
                class="rounded-circle"
                width="32"
                height="32"
              />
            </div>

            <div class="menu-container">
              <Menu :model="profileItems">
                <template #start>
                  <div
                    class="d-flex justify-content-between align-items-center px-3 py-2"
                  >
                    <span class="text-secondary small fw-bold">Appearance</span>
                  </div>
                </template>
                <template #item="{ item, props }">
                  <a
                    v-bind="props.action"
                    class="d-flex align-items-center gap-3"
                    :class="{ 'text-danger': item.label === 'Logout' }"
                  >
                    <component
                      :is="item.icon"
                      :class="{ 'text-danger': item.label === 'Logout' }"
                    />
                    <span>{{ item.label }}</span>
                  </a>
                </template>
              </Menu>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { LogOut, Settings, User } from "lucide-vue-next";
import Menu from "primevue/menu";
import { useRouter } from "vue-router";
const router = useRouter();

const profileItems = [
  {
    label: "Profile",
    icon: User,
    class: "item-gap",
    command: () => router.push("/profile"),
  },
  { label: "Settings", icon: Settings, class: "item-gap" },
  { separator: true, class: "item-gap" },
  { label: "Logout", icon: LogOut },
];
</script>

<style scoped>
.nav-dropdown {
  position: relative;
  display: inline-block;
}

.menu-container {
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 1000;
  visibility: hidden;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.2s ease-in-out;
  pointer-events: none;
}

.nav-dropdown:hover .menu-container {
  visibility: visible;
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
}

:deep(.p-menu) {
  padding: 0.4rem 0.5rem;
  border-radius: 12px;
}

:deep(.item-gap) {
  margin-bottom: 3px;
}
</style>
