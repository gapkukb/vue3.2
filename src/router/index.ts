import { createRouter, createWebHistory } from "vue-router";
import routes from "./routes";
import interceptor from './interceptor'

export const router = createRouter({
	history: createWebHistory(),
	routes,
});

interceptor(router)

export default router



