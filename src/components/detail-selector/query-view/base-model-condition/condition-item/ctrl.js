import styles from './index.scss';

export default class ConditionItemCtrl {
	styles = styles;

	$onInit() {
		const condition = this.condition;

		// 数字
		if (condition.dataType === 'number') {
			condition.value = condition.value || {
				min: undefined,
				max: undefined
			};
		}

		// 枚举 & 字典
		else if (condition.dataType === 'enum' ||
			condition.dataType === 'dict') {
			condition.dynamicConfigs = condition.dynamicConfigs || [];
			condition.value = condition.value || [];
		}

		// 文本
		else if (condition.dataType === 'text') {
			condition.value = [];
		}

		// 日期
		else if (condition.dataType === 'date') {
			condition.value = condition.value || {
				start: undefined,
				end: undefined
			};
		}
	}
}
