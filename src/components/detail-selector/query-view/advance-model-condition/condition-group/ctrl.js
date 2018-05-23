import styles from './index.scss';
import { Inject } from 'angular-es-utils';

@Inject()
export default class ConditionGroup {
	styles = styles;

	conditions = [];

	$onInit() {

	}

	add = () => {
		this.conditions.push({});
	}

	remove = (item) => {
		const index = this.conditions.indexOf(item);
		this.conditions.splice(index, 1);
		if (this.conditions.length === 0) {
			this.removeGroup(this.conditions)
		}
	}
}
