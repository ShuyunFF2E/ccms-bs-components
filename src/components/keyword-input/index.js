import angular from 'angular';
import controller from '../multiple-select/ctrl';
import template from '../multiple-select/index.html';

const DDO = {
    controller,
    template,
    // transclude: true,
    bindings: {
        ngModel: '<?',
        ngDisabled: '<?',
        minHeight: '<?',
        maxHeight: '<?'
    },
    require: {
        ngModelController: '?ngModel'
    }
};

export default angular
    .module('bs.components.keywordInput', [])
    .component('bsKeywordInput', DDO)
    .name;
