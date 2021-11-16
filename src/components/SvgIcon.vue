<template>
	<svg aria-hidden="true">
		<use :xlink:href="id" :fill="color" />
	</svg>
</template>

<script lang="ts" setup>
import { computed, withDefaults } from "vue";

type Props = {
	prefix: string;
	name: string;
	color: string;
};

const props = withDefaults(defineProps<Props>(), {
	prefix: "icon",
	name: "",
	color: "#000",
});

const id = computed(() => `#${props.prefix}-${props.name}`);
</script>
