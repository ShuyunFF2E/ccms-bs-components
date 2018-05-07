import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

const DDO = {
	controller,
	template,
	// transclude: true,
	bindings: {
		minValue: '=?',
		maxValue: '=?',
		disabled: '<?',
		minPlaceholder: '<?',
		maxPlaceholder: '<?'
	}
};

export default angular
	.module('bs.components.numberRange', [])
	.component('bsNumberRange', DDO)
	.name;
