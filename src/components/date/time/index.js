import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

const DDO = {
    controller,
    template,
    // transclude: true,
    bindings: {
        time: '=?',
        placeholders: '<?',
        placement: '@?'
    }
};

export default angular
    .module('bs.components.time', [])
    .component('bsTime', DDO)
    .name;
