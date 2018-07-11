import './index.scss';

import angular from 'angular';
import DetailSelectorService from './service';
import SmartDetailSelectorService from './smart-service';

import QueryView from './query-view';
import ResultView from './result-view';

export default angular
    .module('bs.components.detailSelector', [
        QueryView, ResultView
    ])
    .service('$bsDetailSelector', DetailSelectorService)
    .service('$bsSmartDetailSelector', SmartDetailSelectorService)
    .name;
