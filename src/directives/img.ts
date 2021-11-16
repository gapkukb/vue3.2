import { CustomDirective } from '@/directives';

interface T extends HTMLImageElement {
	_bind(e: MouseEvent): void;
}

function event(type: 'add' | 'remove', img: T) {
	//@ts-ignore
	img[type + 'EventListener']('click', img._bind, false);
}

interface Options {
	/** 默认图片地址，为空则不进行替换 */
	placeholder?: string;
	/** 加载失败图片地址，为空则不进行替换 */
	error?: string;
	/** 加载失败是否允许点击重试，默认true */
	retryable?: boolean;
}

let options: Options = {};

export function setOptions(_options: Options = {}) {
	options = _options;
}

export function loadImage(img: T) {
	const { placeholder, error, retryable = true } = options;
	// 设置默认图
	// img.src = ''; // 设置为空可中断原来的请求
	if (placeholder) img.src = placeholder; // 设置占位图
	return new Promise<T>((resolve, reject) => {
		img.onload = (e) => {
			if (img.complete) {
				delete img.dataset.src;
				event('remove', img);
				resolve(img);
			}
		};
		img.onerror = reject;
		img.src = img.dataset.src!;
	}).catch((e) => {
		// 设置错误图
		if (error) img.src = error;
		if (retryable) {
			img._bind = function () {
				event('remove', img);
				loadImage(img);
			};
			event('add', img);
		}
		return Promise.reject(e);
	});
}

function settle(el: T, { value, oldValue }: { value: string; oldValue: string }) {
	if (value === oldValue) return;
	el.dataset.src = value || el.src;
	loadImage(el);
}

export default {
	name: 'img',
	beforeMount: settle,
	updated: settle,
	beforeUnmount(el) {
		event('remove', el);
	},
} as CustomDirective<T, string>;
