import { AxiosRequestConfig } from 'axios';

/**
 * 将任意对象转换为字符串，如果是hashmap则会进行排序
 * 将忽略掉 null | undefined | Function
 */
function toString(source: any, output: string[] = []): string {
	if (source === null || source === undefined || typeof source === 'function') {
	} else if (typeof source === 'object') {
		Object.keys(source)
			.sort()
			.forEach((key) => {
				toString(source[key], output);
			});
	} else {
		output.push(source);
	}
	return output.join('');
}

export function addHashId(config: AxiosRequestConfig, strict: boolean = true) {
	config.__hashId ||= murmurhash3_32_gc(config.method! + config.url);
	if (!strict) return config.__hashId;

	const paramsString = murmurhash3_32_gc(toString(config.params));
	const dataString = murmurhash3_32_gc(toString(config.data));

	config.__strictHashId ||= Math.round(config.__hashId + paramsString + dataString);
	return config.__strictHashId;
}

export function createResponse(data: any, config?: any) {
	return {
		data,
		status: 200,
		statusText: 'OK',
		headers: {},
		config,
		request: null,
	};
}

/**
 * 根据字符串生成32位数字hash , 相同字符串总是生成相同的
 * @link https://github.com/garycourt/murmurhash-js
 * @param key ASCII only
 * @param seed  seed Positive integer only
 * @returns  32-bit positive integer hash
 */

function murmurhash3_32_gc(key: string, seed: number = 0) {
	var remainder, bytes, h1, h1b, c1, c1b, c2, c2b, k1, i;

	remainder = key.length & 3; // key.length % 4
	bytes = key.length - remainder;
	h1 = seed;
	c1 = 0xcc9e2d51;
	c2 = 0x1b873593;
	i = 0;

	while (i < bytes) {
		k1 =
			(key.charCodeAt(i) & 0xff) |
			((key.charCodeAt(++i) & 0xff) << 8) |
			((key.charCodeAt(++i) & 0xff) << 16) |
			((key.charCodeAt(++i) & 0xff) << 24);
		++i;

		k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
		k1 = (k1 << 15) | (k1 >>> 17);
		k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;

		h1 ^= k1;
		h1 = (h1 << 13) | (h1 >>> 19);
		h1b = ((h1 & 0xffff) * 5 + ((((h1 >>> 16) * 5) & 0xffff) << 16)) & 0xffffffff;
		h1 = (h1b & 0xffff) + 0x6b64 + ((((h1b >>> 16) + 0xe654) & 0xffff) << 16);
	}

	k1 = 0;

	switch (remainder) {
		case 3:
			k1 ^= (key.charCodeAt(i + 2) & 0xff) << 16;
		case 2:
			k1 ^= (key.charCodeAt(i + 1) & 0xff) << 8;
		case 1:
			k1 ^= key.charCodeAt(i) & 0xff;

			k1 = ((k1 & 0xffff) * c1 + ((((k1 >>> 16) * c1) & 0xffff) << 16)) & 0xffffffff;
			k1 = (k1 << 15) | (k1 >>> 17);
			k1 = ((k1 & 0xffff) * c2 + ((((k1 >>> 16) * c2) & 0xffff) << 16)) & 0xffffffff;
			h1 ^= k1;
	}

	h1 ^= key.length;

	h1 ^= h1 >>> 16;
	h1 = ((h1 & 0xffff) * 0x85ebca6b + ((((h1 >>> 16) * 0x85ebca6b) & 0xffff) << 16)) & 0xffffffff;
	h1 ^= h1 >>> 13;
	h1 = ((h1 & 0xffff) * 0xc2b2ae35 + ((((h1 >>> 16) * 0xc2b2ae35) & 0xffff) << 16)) & 0xffffffff;
	h1 ^= h1 >>> 16;

	return h1 >>> 0;
}
