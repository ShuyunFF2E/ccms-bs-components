import styles from './index.scss';
import { Inject } from 'angular-es-utils';


@Inject('$element')
export default class NumberInputCtrl {
    styles = styles;

    constructor() {
        this.ngModel = undefined;
        this.classes = {};
        this.allowNegative = true;
        this.decimalPlaces = 1;
    }

    $onInit() {
        this.allowedKeys = [46, 8, 9, 27, 13, 110];

        this.getComponentElement('input').then($input => {
            this.$input = $input;
            this.registerCompositionEvent();
        });
    }

    updateNgModel() {
        if (this.ngModelController && !this.lock) {
            const ngModel = this.ngModel && isNumber(Number(this.ngModel)) ?
                Number(this.ngModel) :
                undefined;
            this.ngModelController.$setViewValue(ngModel);
        }
    }

    registerCompositionEvent() {
        this.$input.addEventListener('keydown', this.onKeydown, false);
        this.$input.addEventListener('compositionstart', this.onCompositionStart, false);
        this.$input.addEventListener('compositionend', this.onCompositionEnd, false);
    }

    replaceModelValue(element) {
        const regex = this.decimalPlaces > 0 ?
            (/[^0-9.]/g) :
            (/[^0-9]/g);

        element.value = element.value.replace(regex, '');
        this.ngModel = element.value;

        this.updateNgModel();
    }

    onCompositionStart = () => {
        this.lock = true;
    }

    onCompositionEnd = (evt) => {
        this.lock = false;
        this.replaceModelValue(evt.target);
    }

    onKeydown = (evt) => {
        if (this.lock) return evt.preventDefault();

        const keyCode = evt.which || evt.keyCode;

        if (this.allowedKeys.indexOf(keyCode) !== -1 ||
            // 允许小键盘
            (keyCode >= 96 && keyCode <= 105) ||
            // Allow: Ctrl+A
            (keyCode === 65 && (evt.ctrlKey === true || evt.metaKey === true)) ||
            // Allow: Ctrl+C
            (keyCode === 67 && (evt.ctrlKey === true || evt.metaKey === true)) ||
            // Allow: Ctrl+V
            (keyCode === 86 && (evt.ctrlKey === true || evt.metaKey === true)) ||
            // Allow: Ctrl+X
            (keyCode === 88 && (evt.ctrlKey === true || evt.metaKey === true)) ||
            // Allow: home, end, left, right
            (keyCode >= 35 && keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }

        const regEx = new RegExp('^[0-9-.]*$');
        // 校验输入的合理性
        if (regEx.test(evt.key)) {
            // 校验完整输入的合理性
            const value = evt.target.value + evt.key;

            if (!this.testInputComingValue(value)) {
                evt.preventDefault();
            }

            return;
        }

        evt.preventDefault();
    }

    testInputComingValue(value) {
        if (this.allowNegative) {
            if (this.decimalPlaces > 0) {
                return new RegExp(`^0$|^-?(([1-9][0-9]{0,}|0).?[0-9]{0,${this.decimalPlaces}})?$`).test(value);
            } else {
                return /^0$|^-?([1-9][0-9]{0,})?$/.test(value);
            }
        } else {
            if (this.decimalPlaces > 0) {
                return new RegExp(`^0$|^(([1-9][0-9]{0,}|0).?[0-9]{0,${this.decimalPlaces}})?$`).test(value);
            } else {
                return /^0$|^([1-9][0-9]{0,})?$/.test(value);
            }
        }
    }

    getElement(tag) {
        return this._$element[0].querySelector(tag);
    }

    getComponentElement(tag) {
        return new Promise((resolve) => {
            const task = () => {
                const element = this.getElement(tag);
                if (element) {
                    resolve(element);
                } else {
                    setTimeout(task, 50);
                }
            };
            task();
        });
    }
}

// 判断是否为正确的数值类型
function isNumber(v) {
    return Object.prototype.toString.call(v) === '[object Number]' &&
        !Number.isNaN(v);
}
