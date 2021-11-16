import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import buildURL from 'axios/lib/helpers/buildURL';
import createError from 'axios/lib/core/createError';
import { addHashId } from '@/http/utils';

export function getScript(config: AxiosRequestConfig, isJsonp: boolean): Promise<AxiosResponse> {
	return new Promise((resolve, reject) => {
		let script: HTMLScriptElement;
		let isAbort = false;
		let timer = 0;
		// 成功
		function _resolve(data: any = null) {
			resolve({
				status: 200,
				statusText: 'ok',
				config,
				request: script,
				data: data,
			} as any);
		}
		// 成功执行操作后
		function remove() {
			if (script) {
				script.onload = script.onerror = null;
				script.remove();
				timer && window.clearTimeout(timer);
				script = null as any;
			}
		}

		let url = (config.baseURL || '') + config.url;
		url = buildURL(url, config.params, config.paramsSerializer);
		const id = 'id' + addHashId(config);
		script = document.getElementById(id) as HTMLScriptElement;
		if (script) return _resolve();
		script = document.createElement('script');
		script.id = id;

		// 请求失败
		script.onerror = function (error) {
			remove();
			reject(createError('Network Error', config, '404'));
		};
		if (isJsonp) {
			let callbackName = `jsonp_${Math.random().toString().slice(2)}`;
			config.params[config.jsonpCallback || 'callback'] = callbackName;
			//@ts-ignore
			window[callbackName] = (data) => {
				_resolve(data);
			};
		} else {
			// 请求成功
			script.onload = function () {
				remove();
				_resolve();
			};
		}
		// 若设置了超时时间
		const timeout = config.timeout;
		if (timeout) {
			timer = window.setTimeout(function () {
				remove();
				isAbort = true;
				reject(createError('timeout of ' + timeout + 'ms exceeded', config, '405'));
			}, timeout);
		}
		// 若定义了取消操作
		if (config.cancelToken) {
			config.cancelToken.promise.then(function () {
				remove();
				isAbort = true;
				reject(createError('Cancel Error', config, '404'));
			});
		}
		script.src = url;
		const target = document.getElementsByTagName('script')[0] || document.head;
		target.parentNode && target.parentNode.insertBefore(script, target);
	});
}

export function scriptAdapater(http: AxiosInstance) {
	http.defaults.adapters.push(function (config) {
		if (config.dataType === 'jsonp') return getScript(config, true);
		if (config.dataType === 'script') return getScript(config, false);
		return Promise.resolve(config);
	});
}
