import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

import Grid from './grid';
import baseConditionBox from './base-model-condition';
import adnavceConditionBox from './advance-model-condition';

const DDO = {
    template,
    controller,
    transclude: true,
    bindings: {
        opts: '<',
        config: '<',
        registerFromCheckToQuery: '<'
    }
};

export default angular
    .module('bs.components.detailSelectorQueryView', [
        Grid, baseConditionBox, adnavceConditionBox
    ])
    .component('bsQueryView', DDO)
    .name;
