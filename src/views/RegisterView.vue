<template>
  <div>
    <div
      class="d-flex justify-content-center align-items-center min-vh-100 py-4 shadow-sm"
    >
      <div
        class="container bg-white shadow-sm py-4 px-6 rounded-4 shadow-sm"
        style="width: 500px"
      >
        <h3 class="text-center text-primary fw-medium mb-3">Create Account</h3>
        <form @submit.prevent="handleRegister">
          <label class="form-label my-2">First Name : </label>
          <div class="position-relative text-secondary mb-2">
            <input
              type="text"
              id="fname"
              v-model="firstName"
              class="form-control bg-prime fs-text ps-7"
              placeholder="Enter your first name"
            />
            <i class="bi bi-person position-absolute icon-input tran-y"></i>
          </div>
          <p class="p-0 m-0 fs-6 text-danger"></p>

          <label class="form-label my-2">Last Name : </label>
          <div class="position-relative text-secondary mb-2">
            <input
              type="text"
              id="lname"
              v-model="lastName"
              class="form-control bg-prime fs-text ps-7"
              placeholder="Enter your last name"
            />
            <i class="bi bi-person position-absolute icon-input tran-y"></i>
          </div>
          <p class="p-0 m-0 fs-6 text-danger"></p>

          <label class="form-label my-2">Email : </label>
          <div class="position-relative text-secondary mb-2">
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control bg-prime fs-text ps-7"
              placeholder="Enter your email"
            />
            <i class="bi bi-envelope position-absolute icon-input tran-y"></i>
          </div>
          <p class="p-0 m-0 fs-6 text-danger"></p>

          <label class="form-label my-2">Password : </label>
          <div class="position-relative text-secondary mb-2">
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control bg-prime fs-text ps-7"
              placeholder="Enter your password"
            />
            <i class="bi bi-lock position-absolute icon-input tran-y"></i>
            <i class="bi bi-eye position-absolute tran-y icon-eye"></i>
          </div>
          <p class="m-0 p-0 fs-6 text-danger"></p>

          <label class="form-label my-2">Confirm Password : </label>
          <div class="position-relative text-secondary mb-2">
            <input
              type="password"
              id="cPassword"
              v-model="confirmPassword"
              class="form-control bg-prime fs-text ps-7"
              placeholder="Confirm your password"
            />
            <i class="bi bi-lock position-absolute icon-input tran-y"></i>
            <i class="bi bi-eye position-absolute tran-y icon-eye"></i>
          </div>
          <p class="m-0 p-0 fs-6 text-danger"></p>

          <button class="btn btn-primary text-white w-100 mt-3">
            Register
          </button>
        </form>
        <div class="d-flex gap-3 mt-3 align-items-center text-secondary">
          <hr class="w-50" />
          <p class="p-0 m-0 fs-6 text-main">OR</p>
          <hr class="w-50" />
        </div>
        <p class="m-0 fs-6 mt-2 text-center text-main">
          Already have an account?<router-link
            to="/login"
            class="ms-2 text-primary"
            >Login</router-link
          >
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRegisterStore } from "@/stores/register";
import { ref } from "vue";
import { useRouter } from "vue-router";

// const registerStore = useRegisterStore();
const email = ref("");
const firstName = ref("");
const lastName = ref("");
const password = ref("");
const confirmPassword = ref("");
const router = useRouter();
let auth = useAuthStore();

async function handleRegister() {
  await auth.register(
    firstName.value,
    lastName.value,
    email.value,
    password.value,
    confirmPassword.value,
  );
  router.push("/login");
}

// const handleRegister = async () => {
//   try {

//     if (
//       !firstName.value ||
//       !lastName.value ||
//       !email.value ||
//       !password.value
//     ) {
//       alert("All fields are required");
//       return;
//     }

//     if (password.value !== confirmPassword.value) {
//       alert("Passwords do not match");
//       return;
//     }

//     await registerStore.register(
//       firstName.value,
//       lastName.value,
//       email.value,
//       password.value,
//       confirmPassword.value,
//     );

//     router.push("/login");
//   } catch (err) {
//     console.log("REGISTER ERROR 👉", err.response?.data);
//     alert(err.response?.data?.message || "Register failed");
//   }
// };
</script>

<style scoped>
.tran-y {
  transform: translateY(-50%);
}

.icon-input {
  position: absolute;
  top: 50%;
  left: 18px;
  font-size: 18px;
}

.icon-eye {
  position: absolute;
  top: 50%;
  right: 18px;
  font-size: 18px;
  cursor: pointer;
}
</style>
