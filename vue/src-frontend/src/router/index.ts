import { UtilsServcie } from "@/services/UtilsService";

import { AuthUser } from "@/interfaces/interfaces";
import {
  createRouter,
  createWebHistory,
  RouteLocationNormalized,
  Router,
  RouteRecordRaw,
} from "vue-router";

import store from "../store";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/Home.vue"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/spotify",
    name: "spotify",
    component: () => import("@/views/Spotify.vue"),
    children: [
      {
        path: "player",
        name: "player",
        component: () => import("@/views/Spotify/Player.vue"),
      },
      {
        path: "discover",
        name: "discover",
        component: () => import("@/views/Spotify/Discover.vue"),
      },
      {
        name: "stats",
        path: "stats",
        component: () => import("@/views/Spotify/Stats.vue"),
      },
    ],
  },
  {
    path: "/spotify/login-success",
    name: "spotify-login-success",
    component: () => import("@/views/SpotifyLoggedIn.vue"),
    beforeEnter: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
    ) => {
      store.commit("setSpotifyAuthSuccess", true);

      return;
    },
  },
  {
    path: "/excel",
    name: "excel",
    component: () => import("@/views/Excel.vue"),
  },
  {
    path: "/about",
    name: "about",
    component: () => import("@/views/About.vue"),
  },
];

const router: Router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to: any, from: any) => {
  let authToken: AuthUser | null = UtilsServcie.getDecodedAuthCookie();

  if (!authToken && to.path !== "/login") {
    return "/login";
  }

  if (!authToken && to.path === "/login") {
    return;
  }

  const now = new Date();
  const expDate = new Date(authToken.exp * 1000);

  if (now > expDate && to.path !== "/login") {
    return "/login";
  }

  if (!store.state.auth.isAuthenticated) {
    store.commit("setActiveUser", authToken);
    store.commit("setAuth", true);
  }

  if (to.path === "/login") {
    return "/";
  }
});

export default router;
