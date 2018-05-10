import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

const DDO = {
	controller,
	template,
	// transclude: true,
	bindings: {
		minDate: '=?',
		maxDate: '=?',
		disabled: '<?',
		placeholder: '<?'
	}
};

export default angular
	.module('bs.components.dateRange', [])
	.component('bsDateRange', DDO)
	.name;
