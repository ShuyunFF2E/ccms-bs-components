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
		}
	};

	$onInit() {
		this.genFields();
		this.genOperators(this.condition.dataType);
	}

	onCodeChange() {
		const field = this.getField(this.condition.code);
		this.condition = Object.assign(this.condition, field);

		this.genOperators(this.condition.dataType);
		this.condition.operator = this.operators[0];
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
				dataType: item.dataType
			};
		});
	}

	genOperators(dataType) {
		this.operators = Operators[dataType] || [];
	}
}
