import './index.scss';

import angular from 'angular';
import DetailSelectorService from './service';

import QueryView from './query-view';

export default angular
	.module('bs.components.detailSelector', [
		QueryView
	])
	.service('$bsDetailSelector', DetailSelectorService)
	.name;
