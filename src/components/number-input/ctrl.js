import styles from './index.scss';
import { Inject } from 'angular-es-utils';


@Inject('$element')
export default class NumberInputCtrl {
    styles = styles;

    constructor() {
        this.ngModel = undefined;
        this.classes = {};
        this.allowNegative = true;
        this.decimalPlaces = 2;
    }

    $onInit() {
        this.$input = this._$element[0].querySelector('input');
        this.registerCompositionEvent();
    }

    updateNgModel() {
        this.ngModelController && this.ngModelController.$setViewValue(this.ngModel);
    }

    registerCompositionEvent() {
        this.$input.addEventListener('keydown', this.onKeydown, false);
        this.$input.addEventListener('compositionstart', this.onCompositionStart, false);
        this.$input.addEventListener('compositionend', this.onCompositionEnd, false);
    }

    replaceModelValue(element) {
        const regex = /[^1-9a-zA-Z.]/g;
        element.value = element.value.replace(regex, '');
    }

    onCompositionStart = () => {
        this.lock = true;
    }

    onCompositionEnd = (evt) => {
        this.lock = false;
        this.replaceModelValue(evt.target);
    }

    onKeydown = (evt) => {
        if (this.lock) return;

        const keyCode = evt.which || evt.keyCode;

        const allowedKeys = [46, 8, 9, 27, 13, 110];
        if (this.decimalPlaces > 0) {
            allowedKeys.push(190); // 小数点
        }

        if (allowedKeys.indexOf(keyCode) !== -1 ||
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

        const regEx = new RegExp('^[0-9-]*$');
        // 校验输入的合理性
        if (regEx.test(evt.key)) {
            // 校验完整输入的合理性
            if (this.allowNegative) {
                if (!/^0$|^-?([1-9][0-9]{0,})?$/.test(evt.target.value + evt.key)) {
                    evt.preventDefault();
                }
            }
            return;
        }

        evt.preventDefault();
    }
}

// eslint-disable-next-line
function generateRegExp(allowNegative, decimalPlaces) {

    if (allowNegative) {
        if (decimalPlaces > 0) {
            return /^0$|^-?([1-9][0-9]{0,})?$|^-?([1-9][0-9]{0,})?$/;
        } else {
            return /^0$|^-?([1-9][0-9]{0,})?$/;
        }
    }
}
