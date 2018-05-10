import './index.scss';

import angular from 'angular';
import DetailSelectorService from './service';

import QueryView from './query-view';
import CheckView from './check-view';
import conditionItem from './condition-item';

export default angular
	.module('bs.components.detailSelector', [
		QueryView, CheckView, conditionItem
	])
	.service('$bsDetailSelector', DetailSelectorService)
	.name;
