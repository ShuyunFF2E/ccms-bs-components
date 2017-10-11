import './index.scss';

import angular from 'angular';
import template from './index.html';
import controller from './ctrl';

const DDO = {
	template,
	controller,
	transclude: true,
	bindings: {
		columns: '<',
		type: '<?',
		// 最多可选数量（仅type为multiple时有效）
		max: '<?'
	}
};

export default angular
	.module('bs.components.detailSelectorGrid', [])
	.component('bsSelectorGrid', DDO)
	.name;
