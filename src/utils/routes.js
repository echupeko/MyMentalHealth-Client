import { createRouter, createWebHashHistory } from "vue-router";
import { ACTION_TYPES } from "../assets/constants";

import WelcomeModal from "../components/modals/WelcomeModal";
import LoginJoinForm from "../components/modals/LoginJoinForm";
import ProfilePage from "@/components/profile/ProfilePage";

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      component: WelcomeModal,
    },
    {
      path: "/login",
      component: LoginJoinForm,
      props: {
        actionType: ACTION_TYPES.LOGIN_TYPE
      }
    },
    {
      path: '/join',
      component: LoginJoinForm,
      props: {
        actionType: ACTION_TYPES.JOIN_TYPE
      }
    },
    {
      path: '/profile',
      component: ProfilePage,
    }
  ]
})
