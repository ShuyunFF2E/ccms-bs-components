import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

const DDO = {
	template,
	controller,
	transclude: true,
	bindings: {
		// opts: '<',
		// config: '<',
		condition: '<'
	}
};

export default angular
	.module('bs.components.advanceModelConditionItem', [])
	.component('bsAdvanceConditionItem', DDO)
	.name;
