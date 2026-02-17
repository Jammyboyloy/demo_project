import api from "@/api/http";
import { defineStore } from "pinia";
export const useRegisterStore = defineStore("register", () => {
  async function register(firstName, lastName, email, password, confirmPassword) {
    return await api.post("/auth/register", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
    });
  }

  return { register };
});

