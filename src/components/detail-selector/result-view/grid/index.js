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
        total: '<',
        columns: '<',
        data: '<',
        onPageChange: '&',
        onRefresh: '&'
    }
};

export default angular
    .module('bs.components.detailSelectorResultViewGrid', [])
    .component('bsResultViewGrid', DDO)
    .name;
