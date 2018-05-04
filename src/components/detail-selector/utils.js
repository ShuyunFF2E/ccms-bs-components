/**
 * 返回干净有意义的条件对象
 * @param {object} item
 */
export function getPureCondition(item) {
	return {
		code: item.code,
		name: item.name
	};
}

/**
 * 判断配置项是否改变[columns,conditions,extendConditions]
 * @param {array} current
 * @param {array} previous
 */
export function hasArrayChanged(current, previous) {
	const currentStr = current.filter(item => item.selected).map(item => item.code).join(',');
	const previousStr = previous.filter(item => item.selected).map(item => item.code).join(',');

	return currentStr !== previousStr;
}


export function removeItemFromArray(item, array) {
	const index = array.indexOf(item);
	if (~index) {
		array.splice(index, 1);
	}
}
