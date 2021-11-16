import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, Method, AxiosDefaults } from 'axios';
import { merge } from 'axios/lib/utils';
import defaults from 'axios/lib/defaults';
import createError from 'axios/lib/core/createError';
import { createResponse } from '@/http/utils';

type RequestConfig = Omit<AxiosRequestConfig, 'method|url'>;

/**
 * 如果data是formdata|arraybuffer|buffer|stream|blob|file，则使用默认的header，直接返回数据
 * 如果data是URLSearchParams类型，axios把Content-Type修改为application/x-www-form-urlencoded;charset=utf-8，且序列化data
 * 如果data是HashMap，axios把Content-Type修改为application/json;charset=utf-8，且序列化data
 * interceptor先于transformer执行，transformer只能同步，interceptor可以异步，transformer只建议修改data不建议修改header
 */
export class Http {
	axios!: AxiosInstance;
	constructor(config: AxiosRequestConfig = {}, public tokenName: string = 'Authorization') {
		config.withCredentials ||= true;
		this.axios = axios.create(config);
		this.axios.defaults.adapter = this.adapter.bind(this);
		this.axios.defaults.adapters = [];
		this.setToken(localStorage.getItem(tokenName) || '');
	}
	// 修改默认的适配器，支持数组方式顺序执行
	private async adapter(config: AxiosRequestConfig) {
		try {
			for (const adapter of this.axios.defaults.adapters) {
				const result = await adapter(config);
				if (result !== config) return createResponse(result, config);
			}
			return defaults.adapter(config);
		} catch (error: any) {
			// reject终止执行
			return Promise.reject(createError(error || 'Bad Request on custom adapter', config, '400'));
		}
	}
	use<T extends any[]>(plugin: (http: AxiosInstance, ...option: T) => any, ...option: T) {
		plugin(this.axios, ...option);
		return this;
	}
	setToken(token: string) {
		localStorage.setItem(this.tokenName, token);
		this.axios.defaults.headers.common[this.tokenName] = token;
		return this;
	}

	private factory(method: Method, prefix = '') {
		const usebody = method === 'put' || method === 'post' || method === 'patch';
		const field = usebody ? 'data' : 'params';
		const request = this.axios.request;
		const CancelToken = axios.CancelToken;

		return function <Q extends HashMap, R = any>(url: string, conf: RequestConfig = {}) {
			conf.cancellable;
			fetch.abort = function () {};
			function fetch(payload?: Q, config?: RequestConfig) {
				const source = CancelToken.source();
				const cfg = merge(conf, {
					method,
					url: prefix + url,
					[field]: payload,
					cancelToken: source.token,
					abort: fetch.abort,
					...config,
				});
				if (cfg.cancellable) {
					fetch.abort = cfg.abort = function () {
						source.cancel(cfg as any);
					};
				}

				return request<Q, R>(cfg).catch((err) => {
					// 取消的请求不进入下一步的catch，但是可以进入finally回调
					if (!axios.isCancel(err)) return Promise.reject(err);
				});
			}
			return fetch;
		};
	}
	create<T extends Method>(...methods: T[]): Record<T, ReturnType<Http['factory']>> {
		return methods.reduce((acc, method) => {
			acc[method] = this.factory(method);
			return acc;
		}, Object.create(null));
	}
}

export default Http;
