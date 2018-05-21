import styles from './index.scss';

import { Inject } from 'angular-es-utils';
import { removeItemFromArray } from '../utils';

@Inject('$scope', '$ccTips', '$element', 'modalInstance', 'dragulaService')
export default class DetailSelectorSetterCtrl {
	styles = styles;

	constructor() {
		this.body = this._$element[0].querySelector('.modal-body');
		this.conditions.forEach(v => v.checked = false);
		this.extendConditions.forEach(v => v.checked = false);

		const commonZoneMax = this.commonZoneMax;
		const conditions = this.conditions;

		this._dragulaService.options(this._$scope, 'bag-condition', {
			accepts(el, target) {
				if (el.dataset.owner === target.dataset.owner) {
					return true;
				}

				// 常显条件最多设置8个
				if (target.dataset.owner === 'COMMON' &&
					conditions.length >= commonZoneMax) {
					return false;
				}
				return true;
			}
		});
	}

	getSelectedConditions(conditions) {
		return conditions.filter(v => v.checked);
	}

	moveToExtendCondition() {
		const conditions = this.getSelectedConditions(this.conditions);

		conditions.forEach(condition => {
			condition.checked = false;
			removeItemFromArray(condition, this.conditions);
			this.extendConditions.push(condition);
		});
	}

	moveToCondition() {
		const conditions = this.getSelectedConditions(this.extendConditions);

		for (let i = 0; i < conditions.length; i++) {
			if (this.conditions.length >= this.commonZoneMax) return;

			const condition = conditions[i];
			condition.checked = false;
			removeItemFromArray(condition, this.extendConditions);
			this.conditions.push(condition);
		}

	}

	ok() {
		this._modalInstance.ok({
			conditions: this.conditions,
			extendConditions: this.extendConditions
		});
	}
}
