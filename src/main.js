import "./assets/bootstrap/css/bootstrap.css";
import "./assets/bootstrap/css/theme.css";
import "./assets/bootstrap/js/bootstrap.bundle.min.js";
import "./assets/bootstrap/icons/bootstrap-icons.css";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import * as LucideIcons from "lucide-vue-next";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "primeicons/primeicons.css"; // icons

import "./assets/main.css";

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});
app.use(Toast, {
  position: "bottom-right",
  timeout: 3000,
  closeOnClick: true,
  pauseOnHover: false,
  transition: "Vue-Toastification__bounce", // bottom → top slide
});

for (const [key, component] of Object.entries(LucideIcons)) {
  app.component(key, component);
}

app.mount("#app");
