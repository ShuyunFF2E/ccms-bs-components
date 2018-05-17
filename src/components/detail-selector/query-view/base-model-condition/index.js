import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

const DDO = {
	template,
	controller,
	transclude: true,
	bindings: {
		opts: '<',
		config: '<',
		fetch: '<'
	}
};

export default angular
	.module('bs.components.baseModelConditionBox', [])
	.component('bsBaseConditionBox', DDO)
	.name;
