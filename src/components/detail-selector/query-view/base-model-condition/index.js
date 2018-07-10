import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';
import conditionItem from './condition-item';

const DDO = {
    template,
    controller,
    transclude: true,
    bindings: {
        config: '<',
        fetch: '<'
    }
};

export default angular
    .module('bs.components.baseModelConditionBox', [
        conditionItem
    ])
    .component('bsBaseConditionBox', DDO)
    .name;
