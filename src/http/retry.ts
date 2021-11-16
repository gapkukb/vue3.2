import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosRequestTransformer } from 'axios';



function should(error: AxiosError) {
	return error?.response?.status! >= 500 || error.message.includes('timeout');
}

/**
 * 失败自动重试
 * @param options
 *	retryLimit?: number; 最大重试次数 0-不重试 -1不限次数 默认3次

 *	retryDelay?: number; 延迟重试时间

 *	retryShould?(error: AxiosError): boolean;  重试条件，返回true重试 否则取消重试 , 默认 status >=500服务器错误 或者超时
 */
export function retry(http: AxiosInstance, options: Omit<AxiosRetryConfig & { enable?: boolean }, '__retried'> = {}) {
	http.interceptors.request.use();
	const _default = {
		retryLimit: 3,
		retryDelay: 3000,
		retryShould: should,
		...options,
	};
	(http.defaults.transformRequest as AxiosRequestTransformer[]).push(function (this: AxiosRequestConfig, data) {
		if (this.__retried !== undefined) return data;
		const limit = this.retryLimit ?? _default.enable ? _default.retryLimit : 0;
		if (!limit) return;
		this.__retried = limit;
		return data;
	});

	http.interceptors.response.use(undefined, function (err: AxiosError) {
		// 取消的请求不进入重试
		if (Axios.isCancel(err)) return Promise.reject(err);
		const { config, response, request } = err;
		let retried = config.__retried;
		if (!retried || !(config.retryShould || should)(err)) return Promise.reject(err);
		if (!retried--) return Promise.reject(err);
		config.__retried = retried;

		return new Promise((resolve) => {
			setTimeout(resolve, config.retryDelay ?? _default.retryDelay);
		}).then(() => {
			console.log(`当前发起第${(config.retryLimit ?? _default.retryLimit) - retried!}次重试`);
			return http.request(config);
		});
	});
}
