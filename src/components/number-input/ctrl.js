import styles from './index.scss';
import { Inject } from 'angular-es-utils';


@Inject('$element')
export default class NumberInputCtrl {
    styles = styles;

    constructor() {
        this.ngModel = undefined;
        this.classes = {};
        this.allowNegative = false;
        this.decimalPlaces = 0;
    }

    $onInit() {}

    updateNgModel() {

        if (!this.testInputComingValue(this.ngModel)) {
            this.ngModel = this.lastNgModelValue;
            return;
        }
        const ngModel = this.ngModel && isNumber(Number(this.ngModel)) ?
            Number(this.ngModel) :
            undefined;
        if (ngModel !== Number(this.lastNgModelValue)) {
            this.ngModelController.$setViewValue(ngModel);
            this.lastNgModelValue = this.ngModel;
        }
    }

    testInputComingValue(value) {
        if (this.allowNegative) {
            if (this.decimalPlaces > 0) {
                return new RegExp(`^0$|^-?(([1-9][0-9]{0,}|0)\\.?[0-9]{0,${this.decimalPlaces}})?$`).test(value);
            } else {
                return /^0$|^-?([1-9][0-9]{0,})?$/.test(value);
            }
        } else {
            if (this.decimalPlaces > 0) {
                // eslint-disable-next-line
                return new RegExp(`^0$|^(([1-9][0-9]{0,}|0)\\.?[0-9]{0,${this.decimalPlaces}})?$`).test(value);
            } else {
                return /^0$|^([1-9][0-9]{0,})?$/.test(value);
            }
        }
    }
}

// 判断是否为正确的数值类型
function isNumber(v) {
    return Object.prototype.toString.call(v) === '[object Number]' &&
        !Number.isNaN(v);
}
