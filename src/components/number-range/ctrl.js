import styles from './index.scss';

function isUndefined(v) {
    return v === undefined || v === null;
}

export default class NumberRangeCtrl {
    styles = styles;


    validators = {
        min: {
            msg: '该值必须小于大值',
            fn: (modelValue) => {
                if (!isUndefined(this.maxValue)) {
                    return modelValue < this.maxValue;
                }
                return true;
            }
        },
        max: {
            msg: '该值必须大于小值',
            fn: (modelValue) => {
                if (!isUndefined(this.minValue)) {
                    return modelValue > this.minValue;
                }
                return true;
            }
        }
    };

    $onInit() {

    }

    onValueChange(evt, v) {
        if (isNumber(this[v])) {
            this[v] = Number(this[v].toFixed(2));
        }

        // if (isNumber(this.maxValue)) {
        //     this.maxValue = Number(this.maxValue.toFixed(2));
        // }
    }

    onInputKeydown(evt) {
        const keyCode = evt.keyCode || evt.which;

        if ((!evt.ctrlKey && !evt.metaKey) && [8, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 173, 190].indexOf(keyCode) === -1) {
            evt.preventDefault();
        }

    }

}


function isNumber(v) {
    return Object.prototype.toString.call(v) === '[object Number]' && !Number.isNaN(v);
}
