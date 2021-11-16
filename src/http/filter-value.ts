import { AxiosInstance, AxiosRequestTransformer } from 'axios';
import { isArray, isPlainObject } from 'axios/lib/utils';

type Predicate = (value: any) => boolean;

function _predicate(value: any) {
	if (!value && value !== 0 && value !== false) return false;
	if (isArray(value)) return value.length !== 0;
	if (isPlainObject(value)) return Object.keys(value).length !== 0;
	return true;
}

function _filter(hashMap: HashMap = {}, predicate: Predicate) {
	return Object.keys(hashMap)
		.filter((k) => predicate(hashMap[k]))
		.reduce((acc, i) => {
			acc[i] = hashMap[i];
			return acc;
		}, Object.create(null));
}
/**
 * 过滤参数 null undefined "",NaN 空对象([],{})
 * @param hashMap 过滤对象
 * @param predicate 判断条件，默认过滤掉 null undefined "",NaN 空对象([],{})
 * @returns new object
 */
export default function filter(http: AxiosInstance, predicate: Predicate = _predicate) {
	(http.defaults.transformRequest as AxiosRequestTransformer[]).unshift(function filter(this: AxiosInstance, data, headers) {
		return _filter(data, predicate);
	});
}
