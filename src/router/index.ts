import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Protected from "../views/Protected.vue";
import OpenSource from "../views/OpenSource.vue";
import NotFound from "../views/NotFound.vue";
import { loggedInGuard } from "@/router/guards/logged-in";
import { dialectPermission } from "@/router/guards/dialect-perm";
import { alreadyLoggedInGuard } from "@/router/guards/already-logged-in";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/codi-font",
    name: "OpenSource",
    component: OpenSource
  },
  {
    path: "/connexion",
    name: "Login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/Login.vue"),
    beforeEnter: alreadyLoggedInGuard
  },
  {
    path: "/enregistrar",
    name: "Register",
    component: () =>
      import(/* webpackChunkName: "register" */ "../views/Register.vue"),
    beforeEnter: alreadyLoggedInGuard
  },
  {
    path: "/traduccions",
    name: "TranslationFiles",
    component: () =>
      import(/* webpackChunkName: "translation-files" */ "../views/TranslationFiles.vue")
  },
  {
    path: "/menut-principal",
    name: "MainMenu",
    component: () =>
      import(/* webpackChunkName: "main-menu" */ "../views/MainMenu.vue"),
    beforeEnter: loggedInGuard
  },
  {
    path: "/espaci-traduccion/d/:dialect/sb/:subdialect",
    name: "TranslationSpace",
    component: () =>
      import(
        /* webpackChunkName: "translation-space" */ "../views/TranslationSpace.vue"
      ),
    beforeEnter: dialectPermission
  },
  {
    path: "/sens-autorizacion",
    name: "Protected",
    component: Protected
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
