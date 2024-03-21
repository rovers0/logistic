import { createRouter, createWebHistory } from "vue-router";
import axiosClient from "../axios";
import axios from "axios";
import store from "../store";
import NotFound from "@/views/errors/404NotFound.vue";
import Unauthorized from "@/views/errors/401Unauthorized.vue";

//View common
import AuthLayout from "@/components/layout/AuthLayout.vue";
import DefaultLayout from "@/components/layout/DefaultLayout.vue";
//Login page
import Login from "@/views/auth/Login.vue";
//Top page
import Dashboard from "@/views/toppage/Dashboard.vue";

const routes = [
  {
    path: "",
    redirect: "/login",
    component: AuthLayout,
    meta: {
      isGuest: true,
    },
    children: [
      {
        path: "/login",
        name: "Login",
        component: Login,
      },
    ],
  },
  {
    path: "/dashboard",
    redirect: "/dashboard",
    component: DefaultLayout,
    meta: {
      requiresAuth: true,
      accessKey: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard,
      },
    ]
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: NotFound,
  },
  {
    path: "/errors",
    children: [
      {
        path: "/errors/401",
        name: "Unauthorize",
        component: Unauthorized,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
router.beforeEach((to, from, next) => {
  store.commit('initTransit');
  //store.commit("getSetCookieToken");
  if (to.meta.requiresAuth && !sessionStorage.getItem("TOKEN")) {
    next({ name: "Login" });
  } else if (sessionStorage.getItem("TOKEN") && to.meta.isGuest) {
    axiosClient
      .get("user", {
        headers: {
          Accept: "application/json",
        },
      })
      .then((res) => {
        next({
          name: "Dashboard",
        });
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
        next({ name: "Login" });
      });
  } else {
    next();
   }
});

router.onError((error, to) => {
  if (
    error.message.includes('Failed to fetch dynamically imported module') ||
    error.message.includes('Importing a module script failed')
  ) {
    console.log(error.message);
    if (!to?.fullPath) {
      window.location.reload();
    } else {
      window.location = to.fullPath;
    }
  }
})
export default router;
