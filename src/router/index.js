import { createRouter, createWebHistory } from "vue-router";
import Map2D from "../views/Map2D/index.vue";
import Map3D from "../views/Map3D/index.vue";

const routes = [
  {
    path: "/",
    name: "Map2D",
    component: Map2D,
  },
  {
    path: "/Map3D",
    name: "Map3D",
    component: Map3D
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
