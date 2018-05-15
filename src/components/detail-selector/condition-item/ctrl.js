import styles from './index.scss';

export default class ConditionItemCtrl {

	styles = styles;

	$onInit() {
		const condition = this.condition;

		if (condition.dataType === 'number') {
			condition.minValue = condition.minValue || undefined;
			condition.maxValue = condition.maxValue || undefined;
		} else if (condition.dataType === 'enum' || condition.dataType === 'dict') {
			condition.dynamicConfigs = condition.dynamicConfigs || [];
			condition.values = condition.values || [];
		} else if (condition.dataType === 'text') {
			condition.values = [];
		}
	}
}
