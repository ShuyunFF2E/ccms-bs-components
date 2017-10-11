import './index.scss';

import { Inject } from 'angular-es-utils';

@Inject('$ccTips', '$element', 'modalInstance')
export default class DetailSelectorSetterCtrl {

	constructor() {
		this.body = this._$element[0].querySelector('.modal-body');
	}

	ok() {
		const columns = this.columns.filter(item => item.selected);

		if (!columns.length) {
			return this._$ccTips.error('至少选择一个列表显示字段');
		}

		this._modalInstance.ok({
			columns: this.columns.map(getPureItem),
			conditions: this.conditions.map(getPureItem),
			extendConditions: this.extendConditions.map(getPureItem)
		});
	}

	// 设置常用条件为可选条件
	setToExtendCondition(condition) {
		const index = this.conditions.findIndex(item => item.code === condition.code);
		if (!~index) return;

		this.conditions.splice(index, 1);
		this.extendConditions.push(condition);
	}

	// 设置可选条件为常用条件
	setToCondition(condition) {
		const index = this.extendConditions.findIndex(item => item.code === condition.code);
		if (!~index) return;

		this.extendConditions.splice(index, 1);
		this.conditions.push(condition);
	}
}

// 返回干净的条件/字段数据
function getPureItem(item) {
	return {
		code: item.code,
		name: item.name,
		selected: !!item.selected
	};
}
