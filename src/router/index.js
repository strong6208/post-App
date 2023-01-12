import { createRouter, createWebHistory } from "vue-router";
import Welcome from "../views/Welcome.vue";
import Auth from "../views/Auth.vue";
import AllPosts from "../views/posts/AllPosts.vue";
import UserProfile from "../views/users/UserProfile.vue";
import EditProfile from "../views/users/EditProfile.vue";
import CreatePost from "../views/posts/CreatePost.vue";
import NotFound from "../views/NotFound.vue";
import UserPosts from "../views/posts/UserPosts.vue";
import EditPost from "../views/posts/EditPost.vue";
import PostDetails from "../views/posts/PostDetails.vue";
import MatchingPosts from "../views/posts/MatchingPosts.vue";

import { projectAuth } from "@/firebase/config";

const requireAuth = (from, to, next) => {
  let user = projectAuth.currentUser;
  if (user) {
    next();
  } else {
    next({ name: "Welcome" });
  }
};

const noRequireAuth = (from, to, next) => {
  let user = projectAuth.currentUser;
  if (user) {
    next({ name: "Welcome" });
  } else {
    next();
  }
};

const routes = [
  {
    path: "/",
    name: "AllPosts",
    component: AllPosts,
    beforeEnter: requireAuth,
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/auth",
    name: "Auth",
    component: Auth,
    beforeEnter: noRequireAuth,
  },
  {
    path: "/profile/:id",
    name: "UserProfile",
    component: UserProfile,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/editprofile",
    name: "EditProfile",
    component: EditProfile,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/createpost",
    name: "CreatePost",
    component: CreatePost,
    beforeEnter: requireAuth,
  },
  {
    path: "/editpost/:id",
    name: "EditPost",
    component: EditPost,
    beforeEnter: requireAuth,
  },
  {
    path: "/myposts",
    name: "UserPosts",
    component: UserPosts,
    beforeEnter: requireAuth,
  },
  {
    path: "/post/:id",
    name: "PostDetails",
    component: PostDetails,
    props: true,
    beforeEnter: requireAuth,
  },
  {
    path: "/matchingposts/:search",
    name: "MatchingPosts",
    component: MatchingPosts,
    props: true,
    beforeEnter: requireAuth,
  },
  // 404
  {
    path: "/:catchAll(.*)",
    name: "NotFound",
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
