import styles from './index.scss';

function isUndefined(v) {
	return v === undefined || v === null;
}

export default class NumberRangeCtrl {
	styles = styles;


	validators = {
		min: {
			msg: '该值必须小于大值',
			fn: (modelValue) => {
				if (!isUndefined(this.maxValue)) {
					return modelValue < this.maxValue;
				}
				return true;
			}
		},
		max: {
			msg: '该值必须大于小值',
			fn: (modelValue) => {
				if (!isUndefined(this.minValue)) {
					return modelValue > this.minValue;
				}
				return true;
			}
		}
	};

	$onInit() {

	}

}
