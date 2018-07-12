import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';


const DDO = {
    template,
    controller,
    transclude: true,
    bindings: {
        page: '<',
        size: '<',
        data: '<',
        total: '<',
        columns: '<',
        primaryKey: '<',
        condition: '<',
        onRefresh: '&',
        onPageChange: '&',
        setStatisticState: '&'
    }
};

export default angular
    .module('bs.components.detailSelectorResultViewGrid', [])
    .component('bsResultViewGrid', DDO)
    .name;
