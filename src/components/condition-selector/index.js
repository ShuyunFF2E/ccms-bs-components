import './index.scss';

import angular from 'angular';
import ConditionSelector from './service';

export default angular
	.module('bs.components.conditionSelector', [])
	.service('$bsConditionSelector', ConditionSelector)
	.name;
