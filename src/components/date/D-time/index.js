import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

const DDO = {
	controller,
	template,
	// transclude: true,
	bindings: {
		value: '=?',
		placeholders: '<?'
	}
};

export default angular
	.module('bs.components.dTime', [])
	.component('bsDTime', DDO)
	.name;
