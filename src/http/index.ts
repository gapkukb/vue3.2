import cache from '@/http/cache';
import cacelDuplicate from '@/http/cancel-duplicate';
import loading from '@/http/loading';
import logger from '@/http/logger';
import { retry } from '@/http/retry';
import { AxiosRequestConfig } from 'axios';
import { Http } from './base';
import dataType from './data-type';
import filter from './filter-value';

const http = new Http({
	timeout: 30000,
});

function t(config: any) {
	console.log('loading');
	return function () {
		console.log('loaded');
		return 1;
	};
}

http.use(dataType).use(filter).use(loading, t).use(logger).use(cache).use(retry, { enable: true }).use(cacelDuplicate);

export default http.create('GET', 'POST');
