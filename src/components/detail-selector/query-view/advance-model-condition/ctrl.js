import styles from './index.scss';
import { Inject } from 'angular-es-utils';

@Inject()
export default class AdvanceModelConditionBox {
	styles = styles;

	conditionData = {
		isMeet: true,
		groups: [
			[{
				columnName: undefined,
				operator: undefined
			}]
		]
	};

	$onInit() {}

	setCondition() {
		console.log(123);
	}
}
