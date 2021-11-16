/**
 * 单位国际化 e.g: 50 km/h
 * style: 'unit',
 * unit: 'kilometer-per-hour'
 */

const usd = new Intl.NumberFormat('zh-CN', {
	style: 'currency',
	currency: 'CNY',
	maximumSignificantDigits: 4,
	maximumFractionDigits: 3,
	minimumIntegerDigits: 2, // 最小两位长度，不足前面补0：8 - >08
	minimumSignificantDigits: 3,
});

export function amoutlize(numberlike: string | number, decimal: number = 2) {
	return usd.format(+numberlike);
}

export default amoutlize;

/**
 * 利用 Intel.Collator 国际化排序器对中文按照拼音排序
 */
export function sortByPinyin(array: string[]) {
	return array.sort(new Intl.Collator('zh-tw').compare);
}
