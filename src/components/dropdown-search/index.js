import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

const DDO = {
	controller,
	template,
	transclude: true,
	bindings: {
		ngModel: '<',
		datalist: '<',
		loading: '=',
		ngDisabled: '<?',
		placeholder: '<?',
		mapping: '<?',
		emptyMsg: '<?',
		search: '&?',
		change: '<?'
	},
	require: {
		ngModelController: '?ngModel'
	}
};

export default angular
	.module('bs.components.dropdownSearch', [])
	.component('bsDropdownSearch', DDO)
	.name;
