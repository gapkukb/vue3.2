import { addHashId } from '@/http/utils';
import { AxiosInstance } from 'axios';
/**
 * 防止重复请求，自动取消上一次未完成的请求
 * strict?:boolean 是否启用严格模式，默认true
 *  */
export function cacelDuplicate(http: AxiosInstance, strict: boolean = true): void {
	const store: Record<string, Function> = {};
	http.defaults.adapters.unshift(function (config) {
		const id = addHashId(config, strict);
		if (store[id]) {
			store[id]();
			delete store[id];
		} else {
			//@ts-ignore
			store[id] = config.abort;
		}
		return Promise.resolve(config);
	});
}

export default cacelDuplicate;
