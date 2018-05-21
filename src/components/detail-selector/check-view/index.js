import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

import Grid from './../grid';

const DDO = {
	template,
	controller,
	transclude: true,
	bindings: {
		opts: '<',
		config: '<'
	}
};

export default angular
	.module('bs.components.detailSelectorCheckView', [
		Grid
	])
	.component('bsCheckView', DDO)
	.name;
