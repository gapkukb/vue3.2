export function dispatch(el: Node, payload: EventInit & { type: string } = {} as any) {
	const { type, bubbles = false, cancelable = false, ...data } = payload;
	const event = new CustomEvent(type, { bubbles, cancelable });
	Object.assign(event, data);
	return el.dispatchEvent(event);
}

export default dispatch;
