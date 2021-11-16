<template>
	<div
		class="flexible-box"
		:class="[supported ? classname : 'aspect-ratio']"
		:style="[{
			'--ratio': ratio
		}, supported ? null : style]"
	>
		<slot v-if="supported" />
		<div v-else class="flexible-box__body" :class="classname" :style="style">
			<slot />
		</div>
	</div>
</template>
<script>
const supported = !('aspect-ratio' in document.body.style)

export default {
	props: ['class', 'style', 'ratio'],
	computed: {
		supported() {
			return supported
		},
		classname() {
			return this.class
		},
	}
}
</script>
<style lang="stylus">
.flexible-box {
	--radio: 1;
	aspect-ratio: var(--ratio);

	&__body{
		position absolute
		inset:0
	}
}
.aspect-ratio {
	position: relative;
	padding-bottom: calc(100% / var(--ratio));
}
</style>
