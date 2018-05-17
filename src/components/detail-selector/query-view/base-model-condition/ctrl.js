import styles from './index.scss';

export default class BaseModelConditionBox {
	styles = styles;

	isOpen = true;

	$onInit() {

	}

	getEnableConditions() {
		return [
			...this.config.conditions,
			...this.config.extendConditions.filter(v => v.selected)
		];
	}

	reset() {
		const conditions = this.getEnableConditions();

		conditions.forEach(condition => {
			const dataType = condition.dataType || condition.typeName;
			if (dataType === 'text') {
				condition.value = [];
			} else if (dataType === 'boolean') {
				condition.value = undefined;
			} else if (dataType === 'enum' || dataType === 'dict') {
				condition.value = [];
			} else if (dataType === 'number') {
				condition.value.min = undefined;
				condition.value.max = undefined;
			} else if (dataType === 'date') {
				const format = condition.styleType;
				if (format === 'YMDhms' || format === 'YMD') {
					condition.value = undefined;
				} else if (format === 'MD') {
					condition.value = undefined;
				} else if (format === 'Dhms') {
					condition.value = undefined;
				} else if (format === 'hms') {
					condition.value = undefined;
				}
			}
		});

	}

	search() {
		const conditions = this.getEnableConditions();

		const formDataList = [];

		conditions.forEach(item => {
			const dataType = item.dataType;
			const formData = { column: item.code, value: item.value };
			formData.type = getFormDataType(dataType, item.format);

			if (dataType === 'text') {
				if (item.value && item.value.length > 0) {
					formData.operator = '包含';
					formDataList.push(formData);
				}
			} else if (dataType === 'enum' || dataType === 'dict') {
				if (item.value && item.value.length > 0) {
					formData.operator = '等于任意值';
					formDataList.push(formData);
				}
			} else if (dataType === 'number') {
				if (isValidation(item.value.min) || isValidation(item.value.max)) {
					formData.operator = '介于';
					formDataList.push(formData);
				}
			} else if (dataType === 'boolean') {
				if (isValidation(item.value)) {
					formData.operator = '等于';
					formData.value = item.value === 'true';
					formDataList.push(formData);
				}
			} else if (dataType === 'date' && item.value && (item.value.start || item.value.end)) {
				const format = item.format;
				if (format === 'YMDhms' || format === 'YMD') {
					formDataList.push(formData);
				}
			}
		});

		this.fetch({
			conditions: formDataList,
			isMeet: true,
			offset: 0,
			limit: 10
		});
	}
}


function isValidation(v) {
	return v !== undefined && v !== null;
}

const TypeMapping = {
	text: 'INPUT',
	enum: 'Enum',
	dict: 'Dict',
	number: 'Number',
	boolean: 'Boolean'
};

function getFormDataType(dataType, format) {
	if (dataType !== 'date') {
		return TypeMapping[dataType];
	}

	return format;
}
