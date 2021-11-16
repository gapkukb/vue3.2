import { AxiosError, AxiosResponse } from 'axios';

declare module 'axios' {
	interface AxiosRequestConfig extends CacheOptions, AxiosRetryConfig {
		/** 请求是否可取消 */
		cancellable?: boolean;
		/**
		 * 请求的数据类型
		 * @option json 默认值,将使用 application/json
		 * @option form 将使用 application/www-form-urlencode
		 * @option formdata 将使用 application/mutiple-fromdata
		 * @option script 通过script请求脚本
		 * @option jsonp 通过script发起jsonp请求
		 */
		dataType?: 'json' | 'script' | 'jsonp' | 'form' | 'formdata';
		/** 发起请求时是否显示loading */
		loading?: boolean;
		/** 显示loading的延迟时间 ,默认300ms*/
		loadingDelay?: number;
		/** jsonp的回调函数名，默认'cb' */
		jsonpCallback?: string;
	}
	interface AxiosDefaults {
		/**
		 * 顺序执行
		 * @rejection 直接返回错误
		 * @resolve (config) 继续往下执行
		 * @resolve (data) 直接返回成功
		 */
		adapters: ((config: AxiosRequestConfig) => Promise<any>)[];
	}
}

declare global {
	type HashMap = Record<string | number | symbol, unknown>;

	interface CacheOptions {
		__hashId?: number;
		__strictHashId?: number;
		/** 是否严格模式，非严格模式只校验method+url,严格模式还会校验params+data */
		strict?: boolean;
		/** 是否开启缓存 */
		cache?: boolean;
		/** 缓存条件 */
		cacheShould?(response: AxiosResponse): boolean;
		/** 最大缓存条数,默认100条 */
		cacheMax?: number;
		/** 缓存有效时间,默认5分钟 */
		cacheMaxAge?: number;
	}

	interface AxiosRetryConfig {
		/** 内部属性，已重试次数 */
		__retried?: number;
		/** 最大重试次数 0-不重试 -1不限次数 默认3次 */
		retryLimit?: number;
		/** 延迟重试时间 */
		retryDelay?: number;
		/** 重试条件，返回true重试 否则取消重试 , 默认 status >=500服务器错误 或者超时 */
		retryShould?(error: AxiosError): boolean;
	}
}
