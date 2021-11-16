import { AxiosInstance, AxiosRequestConfig, AxiosRequestTransformer } from 'axios';

export default function dataType(http: AxiosInstance) {
	(http.defaults.transformRequest as AxiosRequestTransformer[]).unshift(function dataType(this: AxiosRequestConfig, data) {
		if (this.dataType === 'form') return new URLSearchParams(data);
		if (this.dataType === 'formdata') {
			var formdata = new FormData();
			for (var key in data) {
				formdata.append(key, data[key]);
			}
			return formdata;
		}
		return data;
	});
}
