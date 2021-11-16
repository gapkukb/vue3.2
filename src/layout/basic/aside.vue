
<template lang="pug">
//- div(style="height: 200vh;")
img(v-lazy="'/fsaf.png'")
ratio(style="background-color: red")(ratio=2,v-draggable)
	div.a.b.c(v-lines="lines")(v-visible) 很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊很多文字啊
div(style="height: 200vh;")
//- img(v-img="logo512" @click="test")
</template>

<script lang="ts" setup>
import Ratio from '@/components/Ratio.vue';
import logo from "@/assets/logo.png"
import logo512 from "@/assets/logo512.png"

const url = ref(logo)

setTimeout(() => {
	url.value = logo512
}, 2000);
</script>
<script lang="ts">
export default {
	name: "Aside",
	data() {
		return {
			lines: 1
		}
	},
	methods:{
		test(){
			console.log(123);

		}
	},
	mounted() {
		// setTimeout(() => {

		// }, 5000);
	}
};
</script>
<style lang="stylus">

</style>
