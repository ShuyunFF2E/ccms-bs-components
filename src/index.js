import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngResource from 'angular-resource';
import ccmsComponents from 'ccms-components';
import detailSelector from './components/detail-selector';

const version = process.env.version;

const bsComponents = angular.module('bs.components', [
	uiRouter,
	ngResource,
	ccmsComponents,
	detailSelector
]);

bsComponents.version = version;

export default bsComponents.name;
