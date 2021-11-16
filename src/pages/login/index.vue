<template>
	<div class="login">login</div>
</template>
<script lang="ts">
import mx from '@/styles/mixins.styl'
import { a } from '@/styles/test'

</script>

<style lang="stylus">
@import "../../styles/mixins.styl"
.login
	+sm()
		background:$color
	+sm()
		color:#fff
	background:blue
.test
	+sm()
		background:$color
</style>
