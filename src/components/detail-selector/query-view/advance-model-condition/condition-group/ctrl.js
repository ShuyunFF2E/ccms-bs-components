import styles from './index.scss';
import { Inject } from 'angular-es-utils';

@Inject()
export default class ConditionGroup {
	styles = styles;

	conditions = [];

	$onInit() {
		console.log(this.conditions);

	}
}
