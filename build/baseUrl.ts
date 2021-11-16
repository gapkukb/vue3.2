//处理静态资源连接

export default function baseUrl(src = "") {
	const { VITE_APP_STATIC_URL } = import.meta.env;

	return VITE_APP_STATIC_URL + src;
}
