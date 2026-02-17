<script setup>
import "@/assets/style.css";
import Navbar from "@/components/layout/Navbar.vue";
import Sidebar from "@/components/layout/Sidebar.vue";
import InputText from "primevue/inputtext";
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import { ref } from "vue";
const profileID = ref("1234");
</script>

<template>
  <div>
    <Navbar />

    <div class="d-flex">
      <!-- Sidebar -->
      <Sidebar />

      <!-- Main Content -->
      <div class="flex-grow-1 content container" style="margin-left: 255px">
        <div class="container-fluid bg-white p-5 shadow-sm">
          <div class="row g-5">
            <div class="col-lg-4">
              <div class="card border-0 bg-light py-3">
                <div
                  class="position-relative mx-auto"
                  style="width: 150px; height: 150px"
                >
                  <img
                    id="avatar"
                    class="rounded-circle border w-100 h-100"
                    alt=""
                  />
                  <div
                    class="dropdown position-absolute bg-primary rounded-circle"
                    style="bottom: 35px; right: -9px"
                  >
                    <span
                      class="d-flex justify-content-center align-items-center bg-btn text-white rounded-circle"
                      data-bs-toggle="dropdown"
                      style="width: 30px; height: 30px; cursor: pointer"
                    >
                      <Pencil size="18" />
                    </span>

                    <ul class="dropdown-menu px-2 bg-main border">
                      <li>
                        <input
                          type="file"
                          id="uploadImage"
                          accept="image/*"
                          style="display: none"
                        />
                        <label
                          for="uploadImage"
                          class="btn dropdown-item mb-1 nav-text"
                        >
                          <i class="bi bi-camera-fill me-2"></i> Change Profile
                        </label>
                      </li>
                      <li>
                        <button
                          class="btn dropdown-item nav-text"
                          type="button"
                          data-bs-toggle="modal"
                          data-bs-target="#removeAvatar"
                        >
                          <i class="bi bi-trash text-danger me-2"></i> Remove
                          Profile
                        </button>
                      </li>
                    </ul>
                    <div
                      class="modal fade"
                      id="removeAvatar"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel3"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content rounded-3 bg-main">
                          <div class="modal-body text-center">
                            <h5 class="text-danger fw-medium mb-3">
                              Remove Profile
                            </h5>
                            <p class="text-secondary">
                              Are you sure you want to remove profile?
                            </p>
                            <button
                              class="btn btn-outline-secondary px-5 py-2"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button
                              class="btn btn-danger ms-2 px-5 py-2"
                              id="removeProfile"
                              data-bs-dismiss="modal"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card-body py-2">
                  <h6 class="text-main text-center mb-3" id="usernames"></h6>
                  <div class="d-flex justify-content-center gap-3">
                    <button
                      class="btn btn-danger px-4"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal2"
                    >
                      Log out
                    </button>
                    <button
                      class="btn btn-primary text-white px-4 getInfoBack"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#editInfo"
                    >
                      Edit Info
                    </button>
                    <div
                      class="modal fade"
                      id="exampleModal2"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel2"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content rounded-3 bg-main">
                          <div class="modal-body text-center">
                            <h5 class="text-danger fw-medium mb-3">Logout</h5>
                            <p class="text-secondary">
                              Are you sure you want to logout?
                            </p>
                            <button
                              class="btn btn-outline-secondary px-5 py-2"
                              data-bs-dismiss="modal"
                            >
                              Cancel
                            </button>
                            <button
                              class="btn btn-danger ms-2 px-5 py-2"
                              id="btnLogout2"
                            >
                              Logout
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      class="modal fade"
                      id="editInfo"
                      tabindex="-1"
                      aria-labelledby="exampleModalLabel2"
                      aria-hidden="true"
                    >
                      <div class="modal-dialog modal-dialog-centered">
                        <div class="modal-content rounded-3 bg-main">
                          <div class="modal-body">
                            <h5 class="text-primary fw-medium mb-3 text-center">
                              Edit Info
                            </h5>
                            <div class="container">
                              <div class="row">
                                <div class="col-12">
                                  <label class="form-label my-2 text-main"
                                    >First Name :
                                  </label>
                                  <IconField>
                                    <InputIcon>
                                      <User size="20" class="text-muted" />
                                    </InputIcon>
                                    <InputText disabled class="w-100" />
                                  </IconField>
                                  <p class="mes text-danger"></p>
                                </div>
                                <div class="col-12">
                                  <label class="form-label my-2 text-main"
                                    >Last Name :
                                  </label>
                                  <IconField>
                                    <InputIcon>
                                      <User size="20" class="text-muted" />
                                    </InputIcon>
                                    <InputText disabled class="w-100" />
                                  </IconField>
                                  <p class="mes text-danger"></p>
                                </div>
                                <div class="col-12">
                                  <label class="form-label my-2 text-main"
                                    >Email :
                                  </label>
                                  <IconField>
                                    <InputIcon>
                                      <Mail size="20" class="text-muted" />
                                    </InputIcon>
                                    <InputText disabled class="w-100" />
                                  </IconField>
                                  <p class="mes text-danger"></p>
                                </div>
                              </div>
                            </div>

                            <div class="d-flex justify-content-end mt-3">
                              <button
                                class="btn btn-outline-secondary px-5 py-2"
                                data-bs-dismiss="modal"
                              >
                                Cancel
                              </button>
                              <button
                                class="btn bg-primary text-white ms-2 px-5 py-2 text-center"
                                id="btnEdit"
                              >
                                Save
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="col-lg-8">
              <div class="row d-flex">
                <div class="col-lg-6">
                  <label class="form-label my-2 text-main">Profile ID : </label>
                  <IconField>
                    <InputIcon>
                      <Hash size="19" class="text-muted" />
                    </InputIcon>
                    <InputText disabled class="w-100 ps-7" v-model="profileID" />
                  </IconField>
                </div>
                <div class="col-lg-6">
                  <label class="form-label my-2 text-main">Email : </label>
                  <IconField>
                    <InputIcon>
                      <Mail size="20" class="text-muted" />
                    </InputIcon>
                    <InputText disabled class="w-100 ps-7" />
                  </IconField>
                </div>
                <div class="col-lg-6">
                  <label class="form-label my-2 text-main">First Name : </label>
                  <IconField>
                    <InputIcon>
                      <User size="20" class="text-muted" />
                    </InputIcon>
                    <InputText disabled class="w-100 ps-7" />
                  </IconField>
                </div>
                <div class="col-lg-6">
                  <label class="form-label my-2 text-main">Last Name : </label>
                  <IconField>
                    <InputIcon>
                      <User size="20" class="text-muted" />
                    </InputIcon>
                    <InputText disabled class="w-100 ps-7" />
                  </IconField>
                </div>
                <div class="col-lg-6">
                  <label class="form-label my-2 text-main"
                    >Register at :
                  </label>
                  <IconField>
                    <InputIcon>
                      <CalendarDays size="20" class="text-muted" />
                    </InputIcon>
                    <InputText disabled class="w-100 ps-7" />
                  </IconField>
                </div>
                <div class="col-lg-6">
                  <label class="form-label my-2 text-main">Username : </label>
                  <IconField>
                    <InputIcon>
                      <User size="20" class="text-muted" />
                    </InputIcon>
                    <InputText disabled class="w-100 ps-7" />
                  </IconField>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
input:disabled {
  background-color: transparent !important;
}
</style>
