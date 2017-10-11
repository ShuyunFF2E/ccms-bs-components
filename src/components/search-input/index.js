import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

const DDO = {
	controller,
	template,
	transclude: true,
	bindings: {
		ngModel: '<?',
		ngDisabled: '<?',
		placeholder: '<?',
		search: '&?'
	},
	require: {
		ngModelController: '?ngModel'
	}
};

export default angular
	.module('bs.components.searchInput', [])
	.component('bsSearchInput', DDO)
	.name;
