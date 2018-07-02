import './index.scss';

import angular from 'angular';
import controller from './ctrl';
import template from './index.html';

const DDO = {
    controller,
    template,
    // transclude: true,
    bindings: {
        ngModel: '<?',
        ngDisabled: '<?',
        decimalPlaces: '<?', // 小数位
        placeholder: '<?',
        classes: '<?'
    },
    require: {
        ngModelController: '?ngModel'
    }
};

export default angular
    .module('bs.components.numberInput', [])
    .component('bsNumberInput', DDO)
    .name;
