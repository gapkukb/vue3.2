import axios, { AxiosResponse,AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';

export function _logger(http: AxiosInstance): void {
	const time: Record<string, number> = {};
	http.interceptors.request.use(
		function (config: AxiosRequestConfig) {
			if (config.__retried !== undefined) return config;
			console.log(`%c发起请求，请求地址：${config.url} `, 'background:green;color:#fff;border-radius:4px;padding:2px 4px;');
			console.log('请求参数', config.method === 'put' || config.method === 'post' ? config.data : config.params);
			time[config.url!] = Date.now();
			return config;
		},
		function (error: AxiosError) {
			console.log(
				`%c请求失败，请求地址：${error.config.url} ,错误原因：${error.message}`,
				'background:red;color:#fff;border-radius:4px;padding:2px 4px;',
			);
			console.log(error);
			return Promise.reject(error);
		},
	);

	http.interceptors.response.use(
		function (resp: AxiosResponse) {
			const spent = Date.now() - time[resp.config.url!];
			console.log(
				`%c响应成功，请求地址：${resp.config.url}, 接口耗时：${spent}ms`,
				'background:green;color:#fff;border-radius:4px;padding:2px 4px;',
				resp.config,
			);

			return resp;
		},
		function (error: AxiosError) {
			var config: AxiosRequestConfig;
			var reason = 'abort';
			if (axios.isCancel(error)) {
				config = error.message as any;
				return console.log(
					`%c请求取消，请求地址：${config.url} `,
					'background:red;color:#fff;border-radius:4px;padding:2px 4px;',
				);
			} else {
				config = error.config;
				reason = error.message;
			}
			if (config.__retried) return Promise.reject(error);
			const spent = Date.now() - time[config.url!];
			console.log(
				`%c响应失败，请求地址：${config.url} ,错误原因：${reason}, 接口耗时：${spent}ms`,
				'background:red;color:#fff;border-radius:4px;padding:2px 4px;',
			);
			return Promise.reject(error);
		},
	);
}

/**
 *
 * 打印日志
 */
 export function logger(http: AxiosInstance): void {
	if(import.meta.env.MODE==="development") {
		_logger(http)
	}
 }
export default logger;
