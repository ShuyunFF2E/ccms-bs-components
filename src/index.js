import angular from 'angular';
import ccmsComponents from 'ccms-components';
import detailSelector from './components/detail-selector';
import conditionSelector from './components/condition-selector';

const version = process.env.version;

const bsComponents = angular.module('ccms.bs.components', [
	ccmsComponents,
	detailSelector,
	conditionSelector
]);

bsComponents.version = version;

export default bsComponents.name;
