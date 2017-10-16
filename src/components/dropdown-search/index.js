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
		loading: '<?',
		clearable: '<?',
		ngDisabled: '<?',
		placeholder: '<?',
		mapping: '<?',
		emptyMsg: '<?',
		width: '<?',
		search: '&?',
		onDropdownOpen: '&?',
		onDropdownClose: '&?'
	},
	require: {
		ngModelController: '?ngModel'
	}
};

export default angular
	.module('bs.components.dropdownSearch', [])
	.component('bsDropdownSearch', DDO)
	.name;
