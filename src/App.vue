<template>
	<div id="app">
		<router-view v-slot="{ Component, route }" class="layout-body">
			<transition :name="route.meta.animation || 'fade'" mode="out-in">
				<component :is="Component"></component>
			</transition>
		</router-view>
	</div>
</template>
