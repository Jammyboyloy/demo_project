import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useAuthStore } from "@/stores/auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: { require: true },
    },
    {
      path: "/about",
      name: "about",
      component: () => import("../views/AboutView.vue"),
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/articles",
      name: "articles",
      component: () => import("../views/ArticleView.vue"),
    },
    {
      path: "/myArticles",
      name: "myArticles",
      component: () => import("../views/MyArticleView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
    {
      path: "/createArt",
      name: "createArt",
      component: () => import("../views/CreateArticleView.vue"),
    },
    {
      path: "/editArt/:id",
      name: "editArt",
      component: () => import("../views/EditArticleView.vue"),
    },
    {
      path: "/detailArt/:id",
      name: "detailArt",
      component: () => import("../views/DetailArticle.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../views/ProfileView.vue"),
    },
    {
      path: "/category",
      name: "category",
      component: () => import("../views/CategoryView.vue"),
    },
    {
      path: "/categorys",
      name: "categorys",
      component: () => import("../views/Categorys.vue"),
    },
    {
      path: "/mainLayout",
      component: () => import("../layouts/MainLayoutDashboard.vue"),
      children: [
        {
          path: "",
          name: "homeTest",
          component: () => import("../views/HomeTest.vue")
        },
        {
          path: "categoryTest",
          name: "categoryTest",
          component: () => import("../views/CategoryView.vue")
        },
      ],
    },
  ],
});

router.beforeEach((to, from) => {
  let auth = useAuthStore();
  if (!auth.isLoggedIn && to.meta.require) {
    return { name: "login" };
  }
  return true;
});

export default router;
