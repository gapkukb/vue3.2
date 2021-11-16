export function require(url: string): string {
	return new URL(url, import.meta.url).href;
}

export default require;
