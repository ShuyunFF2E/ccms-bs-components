import styles from './index.scss';
import { Inject } from 'angular-es-utils';
import { Operators } from './contants';

@Inject()
export default class ConditionItem {
    styles = styles;

    condition = {};
    fields = [];
    operators = [];

    validators = {
        textValue: {
            msg: '长度不能大于20',
            fn(modelValue, viewValue) {
                const v = modelValue || viewValue || '';
                return v.length < 20;
            }
        }
    };

    $onInit() {
        const { condition } = this;

        this.genFields();
        this.genOperators(condition.dataType);
        const field = this.getField(condition.code);
        Object.assign(condition, field);
    }

    // 切换条件
    onCodeChange() {
        const { condition } = this;
        const field = this.getField(condition.code);
        Object.assign(condition, field);

        this.genOperators(condition.dataType);
        condition.operator = this.operators[0];

        const { dataType } = condition;
        if (dataType === 'text') {
            condition.value = genDefaultConditionValue(dataType, '包含', condition.format);
        } else if (dataType === 'enum' || dataType === 'dict') {
            condition.value = genDefaultConditionValue(dataType, '等于任意值', condition.format);
        } else if (dataType === 'date') {
            condition.value = genDefaultConditionValue(dataType, '介于', condition.format);
        } else {
            condition.value = undefined;
        }
    }

    // 切换操作符
    onOperatorChange() {
        const { dataType, operator, format } = this.condition;
        this.condition.value = genDefaultConditionValue(dataType, operator, format);
    }

    getField(code) {
        return this.fields.find(item => item.code === code);
    }

    genFields() {
        const { conditions, extendConditions } = this.config;

        this.fields = [...conditions, ...extendConditions].map(item => {
            return {
                code: item.code,
                name: item.name,
                format: item.format,
                dataType: item.dataType,
                options: item.dynamicConfigs || []
            };
        });
    }

    genOperators(dataType) {
        this.operators = Operators[dataType] || [];
    }

    onValueChange() {
        if (isNumber(this.condition.value)) {
            this.condition.value = Number(this.condition.value.toFixed(2));
        }
    }

    onInputKeydown(evt) {
        const keyCode = evt.keyCode || evt.which;

        if ((!evt.ctrlKey && !evt.metaKey) && [
                8, // 退格键(Backspace)
                48, 49, 50, 51, 52, 53, 54, 55, 56, 57, // 0-9
                96, 97, 98, 99, 100, 101, 102, 103, 104, 105, // 笔记本数字键盘
                189, 109, // 减号
                190, 110 // 点号
            ].indexOf(keyCode) === -1) {
            evt.preventDefault();
        }
    }

    getDateRangeOpts() {
        const { condition } = this;
        condition.value.dateOnly = condition.format === 'YMD' ? true : false;
        return condition.value;
    }
}

// 根据条件类型和操作符生成默认值
function genDefaultConditionValue(dataType, operator, format) {
    if (dataType === 'date') {
        return {
            start: format === 'YMDhms' || format === 'YMD' ? undefined : {},
            end: format === 'YMDhms' || format === 'YMD' ? undefined : {}
        };
    }

    if (dataType === 'number') {
        if (operator === '介于') {
            return { min: undefined, max: undefined };
        } else {
            return undefined;
        }
    }

    if (dataType === 'text' || dataType === 'enum' || dataType === 'dict') {
        return [];
    }
    return undefined;
}

function isNumber(v) {
    return Object.prototype.toString.call(v) === '[object Number]' && !Number.isNaN(v);
}
