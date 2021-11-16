// axios 缓存插件 ， 通过adapter实现

import Http from '@/http/base';
import { addHashId } from '@/http/utils';
import LRU from 'lru-cache';
import { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosResponseTransformer } from 'axios';

/**
 * 缓存接口数据
 * @param options
 *  strict?: boolean; 是否使用严格模式，默认true，普通模式 = method+url 严格模式 = method+url+params+data
	cache?: boolean; 是否开启缓存
	cacheShould?(response: AxiosResponse): boolean; 缓存条件
	cacheMax?: number;  最大缓存条数,默认100条
	cacheMaxAge?: number; 缓存有效时间,默认5分钟
 */
export function cache(this: Http, http: AxiosInstance, options: CacheOptions = {}) {
	const lru = new LRU({
		max: options.cacheMax || 100,
		maxAge: options.cacheMaxAge || 1000 * 60,
	});

	http.defaults.adapters.push(function (config) {
		const enable = config.cache ?? options.cache;
		if (!enable) return Promise.resolve(config);
		const id = addHashId(config, config.strict ?? options.strict);
		const data = lru.get(id);

		return Promise.resolve(data || config);
	});

	(http.defaults.transformResponse as AxiosResponseTransformer[]).push(function (this: AxiosRequestConfig, data) {
		lru.set(this.__strictHashId, data, this.cacheMaxAge);
		return data;
	});
}

export default cache;
