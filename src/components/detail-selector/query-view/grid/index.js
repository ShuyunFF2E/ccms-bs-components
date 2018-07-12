import './index.scss';

import angular from 'angular';
import template from './index.html';
import controller from './ctrl';

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
        onPageChange: '&'
    }
};

export default angular
    .module('bs.components.detailSelectorGrid', [])
    .component('bsSelectorGrid', DDO)
    .name;
