import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

const DDO = {
	controller,
	template,
	// transclude: true,
	bindings: {
		month: '=?',
		date: '=?',
		disabled: '<?',
		monthPlaceholder: '<?',
		datePlaceholder: '<?'
	}
};

export default angular
	.module('bs.components.monthDate', [])
	.component('bsMonthDate', DDO)
	.name;
