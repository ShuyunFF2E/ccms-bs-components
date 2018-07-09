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
            msg: '长度不能大于10',
            fn(modelValue, viewValue) {
                const v = modelValue || viewValue || '';
                return v.length < 10;
            }
        },
        operator: {
            msg: '哈哈',
            fn() {
                return false;
            }
        }
    };

    $onInit() {
        this.genFields();
        this.genOperators(this.condition.dataType);
    }

    // 切换条件
    onCodeChange() {
        const { condition } = this;
        const field = this.getField(condition.code);
        this.condition = Object.assign(condition, field);

        this.genOperators(condition.dataType);
        condition.operator = this.operators[0];
        if (condition.dataType === 'text') {
            condition.value = [];
        } else {
            condition.value = undefined;
        }
    }

    // 切换操作符
    onOperatorChange() {
        const { dataType, operator } = this.condition;
        this.condition.value = genDefaultConditionValue(dataType, operator);
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

        // e
        if (keyCode === 69) {
            evt.preventDefault();
        }
    }
}

// 根据条件类型和操作符生成默认值
function genDefaultConditionValue(dataType, operator) {
    if (dataType === 'date') {
        return [];
    }

    if (dataType === 'number') {
        if (operator === '介于') {
            return { min: undefined, max: undefined };
        } else {
            return undefined;
        }
    }

    if (dataType === 'text') {
        return [];
    }
    return undefined;
}

function isNumber(v) {
    return Object.prototype.toString.call(v) === '[object Number]' && !Number.isNaN(v);
}
