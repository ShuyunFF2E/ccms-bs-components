import classes from './index.scss';
import { Inject } from 'angular-es-utils';


@Inject()
export default class KeywordInputCtrl {
    classes = classes;

    constructor() {
        this.ngModel = [];
    }

    $onInit() {

    }

    updateNgModel() {
        this.ngModelController && this.ngModelController.$setViewValue(this.ngModel);
    }

}
