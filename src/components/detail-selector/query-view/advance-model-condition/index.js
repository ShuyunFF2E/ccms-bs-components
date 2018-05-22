import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

import conditionGroup from './condition-group';

const DDO = {
	template,
	controller,
	transclude: true,
	bindings: {
		opts: '<',
		config: '<',
		search: '<'
	}
};

export default angular
	.module('bs.components.advanceModelConditionBox', [conditionGroup])
	.component('bsAdvanceConditionBox', DDO)
	.name;
