import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

const DDO = {
	controller,
	template,
	transclude: true,
	bindings: {
		condition: '<',
		extend: '<',
		removeExtendCondition: '<'
	}
};

export default angular
	.module('bs.components.conditionItem', [])
	.component('bsConditionItem', DDO)
	.name;
