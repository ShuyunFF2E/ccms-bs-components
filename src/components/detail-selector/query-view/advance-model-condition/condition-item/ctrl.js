import styles from './index.scss';
import { Inject } from 'angular-es-utils';
import { Operators } from './contants';

@Inject()
export default class ConditionItem {
	styles = styles;

	condition = {};
	fields = [];
	operators = [];

	validators = {
		textValue: {
			msg: '长度不能大于10',
			fn(modelValue, viewValue) {
				const v = modelValue || viewValue || '';
				return v.length < 10;
			}
		},
		operator: {
			msg: '哈哈',
			fn() {
				return false;
			}
		}
	};

	$onInit() {
		this.genFields();
		this.genOperators(this.condition.dataType);
		console.log(this.condition);

	}

	onCodeChange() {
		const { condition } = this;
		const field = this.getField(condition.code);
		this.condition = Object.assign(condition, field);

		this.genOperators(condition.dataType);
		condition.operator = this.operators[0];
		if (condition.dataType === 'text') {
			condition.value = [];
		} else {
			condition.value = undefined;
		}

	}

	onOperatorChange() {
		const { condition } = this;
		if (condition.dataType === 'date') {
			condition.value = [];
		} else if (condition.dataType === 'number') {
			if (condition.operator === '介于') {
				condition.value = { min: undefined, max: undefined };
			} else {
				condition.value = undefined;
			}
		}
	}

	getField(code) {
		return this.fields.find(item => item.code === code);
	}

	genFields() {
		const { conditions, extendConditions } = this.config;

		this.fields = [...conditions, ...extendConditions].map(item => {
			return {
				code: item.code,
				name: item.name,
				format: item.format,
				dataType: item.dataType,
				options: item.dynamicConfigs || []
			};
		});
	}

	genOperators(dataType) {
		this.operators = Operators[dataType] || [];
	}
}
