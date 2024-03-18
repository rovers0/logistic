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
import Factor from "@/views/auth/Factor.vue";
//Top page
import Dashboard from "@/views/toppage/Dashboard.vue";

import ContractManagement from "@/views/contract/ContractManagement.vue";
import ContractInformation from "@/views/contract/ContractInformation.vue";

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
      {
        path: "/factor",
        name: "Factor",
        component: Factor,
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
      {
        path: "/contract-management",
        name: "ContractManagement",
        component: ContractManagement,
      },
      {
        path: "/contract-information",
        name: "ContractInformation",
        component: ContractInformation,
      },
      {
        path: "/rent",
        name: "RentManagement",
        children: [
          {
            path: "",
            name: "RentIndex",
            component: () => import("@/views/RentManagement/Index.vue"),
          },
          {
            path: "/rent/order",
            name: "RentOrder",
            component: () => import("@/views/RentManagement/Order.vue"),
          },
          {
            path: "/rent/shipping",
            name: "RentShipping",
            component: () => import("@/views/RentManagement/Shipping.vue"),
          },
          {
            path: "/rent/consent",
            name: "RentConfirmOrder",
            component: () => import("@/views/RentManagement/Consent.vue"),
          },
          // {
          //   path: "/rent/more-information",
          //   name: "MoreInformation",
          //   component: () => import("@/views/RentManagement/MoreInformation.vue"),
          // },
        ]
      },
      {
        path: "/achievement",
        name: "Achievement",
        children: [
          {
            path: "",
            name: "AchievementIndex",
            component: () => import("@/views/Achievement/Index.vue"),
          },
          // {
          //   path: "/achievement/schedule",
          //   name: "AchievementSchedule",
          //   component: () => import("@/views/Achievement/Schedule.vue"),
          // },
          {
            path: "/achievement/change",
            name: "AchievementChange",
            component: () => import("@/views/Achievement/Change.vue"),
          },
          {
            path: "/achievement/cancel",
            name: "AchievementCancel",
            component: () => import("@/views/Achievement/Cancel.vue"),
          },
          {
            path: "/achievement/fault",
            name: "AchievementFault",
            component: () => import("@/views/Achievement/Fault.vue"),
          },
        ]
      },
      {
        path: "/exchange",
        name: "Exchange",
        children: [
          {
            path: "",
            name: "ExchangeIndex",
            component: () => import("@/views/Exchange/Index.vue"),
          },
          {
            path: "/exchange/guide",
            name: "ExchangeGuide",
            component: () => import("@/views/Exchange/Guide.vue"),
          },
          // {
          //   path: "/exchange/register",
          //   name: "ExchangeRegister",
          //   component: () => import("@/views/Exchange/Register.vue"),
          // },
          {
            path: "/exchange/shipping",
            name: "ExchangeShipping",
            component: () => import("@/views/Exchange/Shipping.vue"),
          },
          {
            path: "/exchange/approved",
            name: "ExchangeApproved",
            component: () => import("@/views/Exchange/Approved.vue"),
          },
        ]
      },
      {
        path: "/stock",
        name: "Stock",
        children: [
          {
            path: "",
            name: "StockIndex",
            component: () => import("@/views/Stock/Index.vue"),
          },
          {
            path: "/stock/status",
            name: "StockStatus",
            component: () => import("@/views/Stock/Status.vue"),
          },
          {
            path: "/stock/forecast",
            name: "StockForecast",
            component: () => import("@/views/Stock/Forecast.vue"),
          },
          {
            path: "/stock/receipt-management",
            name: "ReceiptManagement",
            component: () => import("@/views/Stock/ReceiptManagement.vue"),
          },
          // {
          //   path: "/stock/ylc-information",
          //   name: "StockYLCInformation",
          //   component: () => import("@/views/Stock/YLCInformation.vue"),
          // },
          // {
          //   path: "/stock/transfer-buyagain",
          //   name: "StockTransferBuyAgain",
          //   component: () => import("@/views/Stock/TransferBuyAgain.vue"),
          // },
        ]
      },
      {
        path: "/payment",
        name: "Payment",
        children: [
          {
            path: "",
            name: "PaymentIndex",
            component: () => import("@/views/Payment/Index.vue"),
          },
          {
            path: "/payment/claim",
            name: "PaymentClaim",
            component: () => import("@/views/Payment/Claim.vue"),
          },
          // {
          //   path: "/payment/partition",
          //   name: "PaymentPartition",
          //   component: () => import("@/views/Payment/Partition.vue"),
          // },
          // {
          //   path: "/payment/master-claim",
          //   name: "PaymentMasterClaim",
          //   component: () => import("@/views/Payment/MasterClaim.vue"),
          // },
        ]
      },
      {
        path: "/master",
        name: "Master",
        children: [
          {
            path: "/master/facility-delivery",
            name: "MasterFacilityDelivery",
            component: () => import("@/views/Master/FacilityDelivery.vue"),
          },
          {
            path: "/master/patients",
            name: "MasterPatients",
            component: () => import("@/views/Master/Patients.vue"),
          },
          {
            path: "/master/products",
            name: "MasterProducts",
            component: () => import("@/views/Master/Products.vue"),
          },
          {
            path: "/master/configs",
            name: "MasterConfigs",
            component: () => import("@/views/Master/Configs.vue"),
          },
        ]
      }
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
  } else if (sessionStorage.getItem("FACTOR")) {
    if (to.name != "Factor") {
      next({
        name: "Factor",
      });
    } else {
      next();
    }
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
