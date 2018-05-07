import './assets/styles/bs-iconfont.css';
import './assets/styles/index.css';
import 'angularjs-dragula/dist/dragula.css';
import angular from 'angular';
import ccmsComponents from 'ccms-ep-components';
import angularDragula from 'angularjs-dragula';
import detailSelector from './components/detail-selector';
import conditionSelector from './components/condition-selector';
import searchInput from './components/search-input';
import dropdownSearch from './components/dropdown-search';
import conditionItem from './components/condition-item';
import numberRange from './components/number-range';

const version = process.env.version;

const bsComponents = angular.module('ccms.bs.components', [
	ccmsComponents,
	detailSelector,
	conditionSelector,
	searchInput,
	dropdownSearch,
	conditionItem,
	numberRange,
	angularDragula(angular)
]);

bsComponents.version = version;

export default bsComponents.name;
