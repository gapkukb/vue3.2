import dispatch from '@/utils/dispatch';
// TODO:改为指令
const nodes: Set<Node> = new Set();

document.addEventListener('click', (e: any) => {
	const target = e.target as Node;
	const path = e.path || e.composedPath?.();

	nodes.forEach((node) => {
		if (node !== target && (path ? !path.includes(node) : node.contains(target))) {
			dispatch(node, { type: 'clickoutside' });
		}
	});
});

function useCliseOutside() {
	const wrapper = ref<Node>(null as any);

	onMounted(() => {
		nodes.add(wrapper.value);
	});
	onBeforeUnmount(() => {
		nodes.delete(wrapper.value);
	});

	return wrapper;
}
