<template>
  <nav id="sidebar" :class="{ close: isClosed }" class="bg-danger">
    <ul>
      <!-- Header -->
      <li>
        <div class="logo">
          <i class="bi bi-code-slash"></i>
          <span v-if="!isClosed">oding2go</span>
        </div>

        <button @click="toggleSidebar" id="toggle-btn">
          <i class="bi bi-list text-white fs-5"></i>
        </button>
      </li>

      <!-- Home -->
      <li>
        <RouterLink to="/mainLayout" active-class="active">
          <i class="bi bi-house"></i>
          <span v-if="!isClosed">Home</span>
        </RouterLink>
      </li>

      <!-- Dashboard -->
      <li>
        <RouterLink to="/mainLayout/categoryTest" active-class="active">
          <i class="bi bi-grid"></i>
          <span v-if="!isClosed">Dashboard</span>
        </RouterLink>
      </li>

      <!-- CREATE DROPDOWN -->
      <li>
        <button
          class="dropdown-btn"
          :class="{ rotate: subMenus.create }"
          @click="toggleSubMenu('create')"
        >
          <i class="bi bi-folder-plus"></i>
          <span v-if="!isClosed">Create</span>
          <i v-if="!isClosed" class="bi bi-chevron-down"></i>
        </button>

        <ul class="sub-menu" :class="{ show: subMenus.create }">
          <div>
            <li>
              <a href="#">
                <i class="bi bi-folder"></i>
                <span v-if="!isClosed">Folder</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="bi bi-file-earmark-text"></i>
                <span v-if="!isClosed">Document</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="bi bi-kanban"></i>
                <span v-if="!isClosed">Project</span>
              </a>
            </li>
          </div>
        </ul>
      </li>

      <!-- TODO DROPDOWN -->
      <li>
        <button
          class="dropdown-btn"
          :class="{ rotate: subMenus.todo }"
          @click="toggleSubMenu('todo')"
        >
          <i class="bi bi-check2-square"></i>
          <span v-if="!isClosed">Todo-Lists</span>
          <i v-if="!isClosed" class="bi bi-chevron-down"></i>
        </button>

        <ul class="sub-menu" :class="{ show: subMenus.todo }">
          <div>
            <li>
              <a href="#">
                <i class="bi bi-briefcase"></i>
                <span v-if="!isClosed">Work</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="bi bi-person"></i>
                <span v-if="!isClosed">Private</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="bi bi-code"></i>
                <span v-if="!isClosed">Coding</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="bi bi-flower1"></i>
                <span v-if="!isClosed">Gardening</span>
              </a>
            </li>
            <li>
              <a href="#">
                <i class="bi bi-book"></i>
                <span v-if="!isClosed">School</span>
              </a>
            </li>
          </div>
        </ul>
      </li>

      <!-- Calendar -->
      <li>
        <RouterLink to="/calendar" active-class="active">
          <i class="bi bi-calendar-event"></i>
          <span v-if="!isClosed">Calendar</span>
        </RouterLink>
      </li>

      <!-- Profile -->
      <li>
        <RouterLink to="/profile" active-class="active">
          <i class="bi bi-person-circle"></i>
          <span v-if="!isClosed">Profile</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<script setup>
import { ref, reactive } from "vue";

const isClosed = ref(false);

const subMenus = reactive({
  create: false,
  todo: false,
});

function toggleSidebar() {
  isClosed.value = !isClosed.value;
}

function toggleSubMenu(menu) {
  if (isClosed.value) isClosed.value = false;
  subMenus[menu] = !subMenus[menu];
}
</script>

<style scoped>

:root {
  --base-clr: #11121a;
  --line-clr: #42434a;
  --hover-clr: #222533;
  --text-clr: #e6e6ef;
  --accent-clr: #5e63ff;
  --secondary-text-clr: #b0b3c1;
}

* {
  margin: 0;
  padding: 0;
}

html {
  font-family: Poppins, "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  line-height: 1.5rem;
}

body {
  min-height: 100vh;
  min-height: 100dvh;
  background-color: white;
  color: var(--text-clr);
  display: grid;
  grid-template-columns: auto 1fr;
}

/* ==================== SIDEBAR ==================== */
#sidebar {
  box-sizing: border-box;
  height: 100vh;
  width: 250px;
  padding: 5px 1em;
  background-color: var(--base-clr);
  border-right: 1px solid var(--line-clr);
  position: sticky;
  top: 0;
  align-self: start;
  transition: 300ms ease-in-out;
  overflow: hidden;
}

#sidebar.close {
  padding: 5px;
  width: 60px;
}

#sidebar ul {
  list-style: none;
}

/* ---------- Header (logo + toggle) ---------- */
#sidebar > ul > li:first-child {
  position: relative;
  height: 80px; 
  transition: height 300ms ease-in;
}

#sidebar > ul > li:first-child .logo {
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0 0.85em;
  box-sizing: border-box;
  font-weight: 600;
  font-size: 20px;
}

/* Toggle button – positioned absolutely, centered vertically on the right */
#sidebar > ul > li:first-child #toggle-btn {
  position: absolute;
  left: 100%; /* start at right edge of parent */
  top: 50%; /* center vertically */
  transform: translateY(-50%) translateX(-100%); /* shift left by its own width */
  margin: 0;
  padding: 0.85em;
  border: none;
  border-radius: 0.65em;
  background: none;
  cursor: pointer;
  transition:
    left 300ms ease-in,
    top 300ms ease-in-out,
    transform 300ms ease-in-out;
}

#sidebar > ul > li:first-child #toggle-btn:hover {
  background-color: var(--hover-clr);
}

#toggle-btn svg {
  transition: rotate 150ms ease;
}

/* ---------- Active state ---------- */
#sidebar ul li.active a {
  color: var(--accent-clr);
}

#sidebar ul li.active a svg {
  fill: var(--accent-clr);
}

/* ---------- Common link / button styles ---------- */
#sidebar a,
#sidebar .dropdown-btn,
#sidebar .logo {
  border-radius: 0.5em;
  padding: 0.85em;
  text-decoration: none;
  color: var(--text-clr);
  display: flex;
  align-items: center;
  gap: 1em;
}

.dropdown-btn {
  width: 100%;
  text-align: left;
  background: none;
  border: none;
  font: inherit;
  cursor: pointer;
}

#sidebar svg {
  flex-shrink: 0;
  fill: var(--text-clr);
}

#sidebar a span,
#sidebar .dropdown-btn span {
  flex-grow: 1;
}

#sidebar a:hover,
#sidebar .dropdown-btn:hover {
  background-color: var(--hover-clr);
}

/* ---------- Submenus ---------- */
#sidebar .sub-menu {
  display: grid;
  grid-template-rows: 0fr;
  transition: 300ms ease-in-out;
}

#sidebar .sub-menu > div {
  overflow: hidden;
}

#sidebar .sub-menu.show {
  grid-template-rows: 1fr;
}

.dropdown-btn svg {
  transition: 200ms ease;
}

.rotate svg:last-child {
  rotate: 180deg;
}

#sidebar .sub-menu a {
  padding-left: 2em;
}

/* ==================== MAIN CONTENT ==================== */
main {
  padding: min(30px, 7%);
}

main p {
  color: var(--secondary-text-clr);
  margin-top: 5px;
  margin-bottom: 15px;
}

.container {
  border: 1px solid var(--line-clr);
  border-radius: 1em;
  margin-bottom: 20px;
  padding: min(3em, 15%);
}

.container h2,
.container p {
  margin-top: 1em;
}

/* ==================== COLLAPSED SIDEBAR (ANIMATED) ==================== */
#sidebar.close > ul > li:first-child {
  height: 125px;
}

#sidebar.close > ul > li:first-child .logo {
  height: 80px;
  text-align: center;
  font-size: 20px;
}

#sidebar.close > ul > li:first-child .logo span {
  display: none;
}

#sidebar.close > ul > li:first-child #toggle-btn {
  left: 50%;
  top: 80px;
  transform: translateX(-50%);
}

/* ==================== MOBILE (BOTTOM BAR) ==================== */
@media (max-width: 800px) {
  body {
    grid-template-columns: 1fr;
  }

  main {
    padding: 2em 1em 60px 1em;
  }

  .container {
    border: none;
    padding: 0;
  }

  #sidebar {
    height: 60px;
    width: 100%;
    border-right: none;
    border-top: 1px solid var(--line-clr);
    padding: 0;
    position: fixed;
    top: unset;
    bottom: 0;
  }

  #sidebar > ul {
    padding: 0;
    display: grid;
    grid-auto-columns: 60px;
    grid-auto-flow: column;
    align-items: center;
    overflow-x: scroll;
  }

  #sidebar ul li {
    height: 100%;
  }

  #sidebar ul a,
  #sidebar ul .dropdown-btn {
    width: 60px;
    height: 60px;
    padding: 0;
    border-radius: 0;
    justify-content: center;
  }

  /* Hide text and extra elements on mobile */
  #sidebar ul li span,
  #sidebar ul li:first-child,
  #sidebar ul .dropdown-btn svg:last-child {
    display: none;
  }

  /* Mobile submenu (appears above the bar) */
  #sidebar ul li .sub-menu.show {
    position: fixed;
    bottom: 60px;
    left: 0;
    box-sizing: border-box;
    height: 60px;
    width: 100%;
    background-color: var(--hover-clr);
    border-top: 1px solid var(--line-clr);
    display: flex;
    justify-content: center;
  }

  #sidebar ul li .sub-menu.show > div {
    overflow-x: auto;
  }

  #sidebar ul li .sub-menu.show li {
    display: inline-flex;
  }

  #sidebar ul li .sub-menu.show a {
    box-sizing: border-box;
    padding: 1em;
    width: auto;
    justify-content: center;
  }
}

</style>