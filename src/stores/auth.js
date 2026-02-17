import api from "@/api/http";
import { defineStore } from "pinia";
import { computed, ref } from "vue";

export const useAuthStore = defineStore("auth", () => {
  let user = ref(null);
  let token = ref(localStorage.getItem("token"));
  let loginSuccess = ref(false);
  let isLoggedIn = computed(() => !!token.value);
  console.log(isLoggedIn);

  async function login(email, password) {
    try {
      const res = await api.post("/auth/login", { email, password });

      user.value = res.data.data.user;
      token.value = res.data.data.token;
      localStorage.setItem("token", token.value);
      loginSuccess.value = true;
    } catch (err) {
      throw new Error(err.response?.data?.message || "Login failed");
    }
  }

  async function logout() {
    await api.delete("/auth/logout");
    user.value = null;
    token.value = null;
    localStorage.removeItem("token");
  }

  async function register(
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  ) {
    const res = await api.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });

    console.log(res);
  }

  return { user, token, isLoggedIn, loginSuccess, login, logout, register };
});
