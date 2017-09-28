import './index.scss';

import angular from 'angular';
import DetailSelectorService from './service';

export default angular
	.module('bs.components.detailSelector', [])
	.service('$bsDetailSelector', DetailSelectorService)
	.name;
