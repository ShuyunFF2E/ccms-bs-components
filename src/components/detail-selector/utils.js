/**
 * 返回干净有意义的条件对象
 * @param {object} item
 */
export function getPureCondition(item) {
	return {
		code: item.code,
		name: item.name,

		/**
		 * 是否在配置选择器组件中勾选
		 */
		selected: !!item.selected,

		/**
		 * 是否在“更多”条件中勾选
		 * 仅对可用搜索条件有效
		 */
		active: !!item.active
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
