import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';
import bsAdvanceConditionItem from '../condition-item';

const DDO = {
	template,
	controller,
	transclude: true,
	bindings: {
		// opts: '<',
		config: '<',
		conditions: '<',
		removeGroup: '<'
	}
};

export default angular
	.module('bs.components.advanceModelConditionGroup', [bsAdvanceConditionItem])
	.component('bsConditionGroup', DDO)
	.name;
