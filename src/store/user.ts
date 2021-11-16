//pinia 代替vuex4  ， 更好的ts支持，更接近vuex5

import { defineStore } from "pinia";

export default defineStore({
	id: "user",
	state: () => ({
		name: "codexu",
		age: 18,
	}),
	getters: {
		// 方法函数可以使用this访问上下文
		nameLength(): number {
			return this.name.length;
		},
		// 箭头函数没有this，因此需要使用state访问上下文
		nameLength2: (state) => state.name.length,
	},
	actions: {
		async fetchData(data: any) {},
	},
});
