import styles from './index.scss';
import { Inject } from 'angular-es-utils';

@Inject('$element', '$ccTips')
export default class AdvanceModelConditionBox {
	styles = styles;

	isOpen = true;

	conditionData = {
		isMeet: true,
		groups: [
			[{}]
		]
	};

	$onInit() {}

	get $host() {
		return this._$element[0].querySelector('.' + styles.container);
	}

	tipsError(message) {
		const v = this._$ccTips.error(message, this.$host);
		setTimeout(() => {
			v.close();
		}, 3000);
	}


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

	switchConditionBox() {
		const $conditionBoxDOM = this._$element[0].querySelector('.' + styles.conditionBox);
		if (this.isOpen) {
			$conditionBoxDOM.oheight = $conditionBoxDOM.getBoundingClientRect().height;

			$conditionBoxDOM.style.height = $conditionBoxDOM.oheight + 'px';
			setTimeout(() => {
				$conditionBoxDOM.style.height = 0;
				$conditionBoxDOM.style.overflow = 'hidden';
			}, 0);
		} else {
			$conditionBoxDOM.style.height = $conditionBoxDOM.oheight + 'px';
			setTimeout(() => {
				$conditionBoxDOM.style.overflow = 'unset';
				$conditionBoxDOM.style.height = 'unset';
			}, 300);
		}

		this.isOpen = !this.isOpen;
	}

	reset() {
		this.conditionData.isMeet = true;
		this.conditionData.groups = [
			[{}]
		];
	}

	validate() {
		const groups = this.conditionData.groups;
		for (let i = 0, len1 = groups.length; i < len1; i++) {
			const group = groups[i];
			for (let j = 0, len2 = group.length; j < len2; j++) {
				const condition = group[j];
				if (!condition.code) {
					return { result: false, message: '请选择字段' };
				}
				if (condition.dataType === 'text') {
					if (!condition.value) {
						return { result: false, message: `请填写 ${condition.name} 的值` };
					}
				}
			}
		}
		return { result: true };
	}

	search() {
		const validation = this.validate();
		if (!validation.result) {
			this.tipsError('请检查条件是否填写完整');
			return;
		}

		console.log(validation);

	}
}
