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
    width: '<?'
  },
  require: {
    ngModelController: '?ngModel'
  }
};

export default angular
  .module('bs.components.multipleSelect', [])
  .component('bsMultipleSelect', DDO)
  .name;
