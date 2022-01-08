/*
 * @Author: YourName
 * @Date: 2021-12-31 17:21:58
 * @LastEditTime: 2022-01-08 17:56:36
 * @Description: 
 * @版权声明
 */
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home/index.vue"
import Map2D from "../views/Map2D/index.vue";
import Map3D from "../views/Map3D/index.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/Map2D",
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
