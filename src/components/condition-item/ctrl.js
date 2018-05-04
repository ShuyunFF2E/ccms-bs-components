import styles from './index.scss';

export default class ConditionItemCtrl {

	styles = styles;

	$onInit() {
		console.log(this.condition.dynamicConfigs);

	}
}
