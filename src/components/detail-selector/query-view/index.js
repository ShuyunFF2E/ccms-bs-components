import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

import detailSelectorSelectGrid from './../select-grid';

const DDO = {
	template,
	controller,
	transclude: true,
	bindings: {
		config: '<'
	}
};

export default angular
	.module('bs.components.detailSelectorQueryView', [
		detailSelectorSelectGrid
	])
	.component('bsQueryView', DDO)
	.name;
