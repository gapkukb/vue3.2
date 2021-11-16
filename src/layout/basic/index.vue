<template>
	<div class="basic-layout">
		<layout-header />

		<router-view v-slot="{ Component, route }" class="layout-body">
			<keep-alive>
				<component
					v-if="route.meta.keepAlive"
					:is="Component"
				></component>
			</keep-alive>
			<component
				v-if="!route.meta.keepAlive"
				:is="Component"
			></component>
		</router-view>
		<layout-aside />
		<layout-footer />
	</div>
</template>
<script>
import LayoutHeader from "./header.vue";
import LayoutFooter from "./footer.vue";
import LayoutAside from "./aside.vue";

export default {
	name: "layout",
	components: {
		LayoutHeader,
		LayoutFooter,
		LayoutAside,
	},
	methods:{
		test(){

			useLink({to:"/haha"})
		}
	}
};
</script>
