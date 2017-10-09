import './index.scss';

import angular from 'angular';
import template from './index.html';
import controller from './ctrl';

const DDO = {
	template,
	controller,
	transclude: true,
	bindings: {
		columns: '<'
	}
};

export default angular
	.module('bs.components.detailSelectorSelectGrid', [])
	.component('bsSelectGrid', DDO)
	.name;
