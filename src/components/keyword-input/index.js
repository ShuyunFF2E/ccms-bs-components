import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

const DDO = {
	controller,
	template,
	// transclude: true,
	bindings: {
		ngModel: '<?',
		ngDisabled: '<?'
	},
	require: {
		ngModelController: '?ngModel'
	}
};

export default angular
	.module('bs.components.keywordInput', [])
	.component('bsKeywordInput', DDO)
	.name;
