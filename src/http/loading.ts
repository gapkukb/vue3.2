import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosRequestTransformer } from 'axios';

/**
 *  自动开启和关闭loading，需要自行提供loading方法
 *  loadingMethod必须返回关闭方法，以供内部调用
 */
export function loading(http: AxiosInstance, loadingMethod: (config: AxiosRequestConfig) => Function): void {
	let close: any = null;
	let accumulator = 0;

	function common(config: AxiosRequestConfig) {
		if (!config.loading) return;
		if (!--accumulator) {
			close?.();
			close = null;
		}
	}

	// 为了保证loading是在请求发出的前一刻调用，不受其他插件影响，这里使用了transformrequest而不是interceptor
	(http.defaults.transformRequest as AxiosRequestTransformer[]).push(function (this: AxiosRequestConfig, data) {
		if (this.loading) {
			accumulator++;
			close ||= loadingMethod(this);
		}
		return data;
	});

	http.interceptors.response.use(
		function (resp) {
			common(resp.config);
			return resp;
		},
		function (error: AxiosError) {
			common(Axios.isCancel(error) ? (error.message as AxiosRequestConfig) : error.config);
			return Promise.reject(error);
		},
	);
}

export default loading;
