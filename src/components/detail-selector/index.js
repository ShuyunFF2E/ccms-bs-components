import './index.scss';

import angular from 'angular';
import DetailSelectorService from './service';

import QueryView from './query-view';
import ResultView from './result-view';
import conditionItem from './condition-item';

export default angular
    .module('bs.components.detailSelector', [
        QueryView, ResultView, conditionItem
    ])
    .service('$bsDetailSelector', DetailSelectorService)
    .name;
