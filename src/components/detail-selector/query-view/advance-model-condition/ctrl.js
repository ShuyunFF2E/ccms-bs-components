import styles from './index.scss';
import { Inject } from 'angular-es-utils';

@Inject('$element')
export default class AdvanceModelConditionBox {
	styles = styles;

	conditionData = {
		isMeet: true,
		groups: [
			[{}]
		]
	};

	$onInit() {}

	removeGroup = (group) => {
		const index = this.conditionData.groups.indexOf(group);
		~index && this.conditionData.groups.splice(index, 1);
	}

	addGroup = () => {
		this.conditionData.groups.push([{}]);
		setTimeout(() => {
			this._$element[0].querySelector('.' + styles.groups).children[this.conditionData.groups.length - 1].scrollIntoView();
		}, 50);
	}

	setCondition() {
		console.log(123);
	}
}
