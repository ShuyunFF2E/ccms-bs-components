import './index.scss';

import angular from 'angular';
import DetailSelectorService from './service';

import QueryView from './query-view';
import CheckView from './check-view';

export default angular
	.module('bs.components.detailSelector', [
		QueryView, CheckView
	])
	.service('$bsDetailSelector', DetailSelectorService)
	.name;
