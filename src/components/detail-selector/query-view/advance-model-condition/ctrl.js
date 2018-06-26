import styles from './index.scss';
import { Inject } from 'angular-es-utils';
import { isNumber } from '@/utils/index';
import dateFormat from 'common-javascript-utils/src/date';


const DateFormatMapping = {
    YMD: 'yyyy-MM-dd',
    YMDhms: 'yyyy-MM-dd hh:mm:ss'
};

@Inject('$element', '$ccTips')
export default class AdvanceModelConditionBox {
    styles = styles;

    isOpen = true;

    conditionData = {
        isMeet: true,
        groups: [
            [{}]
        ]
    };

    $onInit() {}

    get $host() {
        return this._$element[0].querySelector('.' + styles.container);
    }

    tipsError(message) {
        this._$ccTips.error(message, {
            container: this.$host,
            duration: 3000
        });
    }


    removeGroup = (group) => {
        const index = this.conditionData.groups.indexOf(group);
        ~index && this.conditionData.groups.splice(index, 1);
    }

    addGroup = () => {
        this.conditionData.groups.push([{}]);
        setTimeout(() => {
            this._$element[0].querySelector('.' + styles.groups).children[this.conditionData.groups.length - 1].scrollIntoView();
        }, 50);
    }

    switchConditionBox() {
        const $conditionBoxDOM = this._$element[0].querySelector('.' + styles.conditionBox);
        if (this.isOpen) {
            $conditionBoxDOM.oheight = $conditionBoxDOM.getBoundingClientRect().height;

            $conditionBoxDOM.style.height = $conditionBoxDOM.oheight + 'px';
            setTimeout(() => {
                $conditionBoxDOM.style.height = 0;
                $conditionBoxDOM.style.overflow = 'hidden';
            }, 0);
        } else {
            $conditionBoxDOM.style.height = $conditionBoxDOM.oheight + 'px';
            setTimeout(() => {
                $conditionBoxDOM.style.overflow = 'unset';
                $conditionBoxDOM.style.height = 'unset';
            }, 300);
        }

        this.isOpen = !this.isOpen;
    }

    reset() {
        this.conditionData.isMeet = true;
        this.conditionData.groups = [
            [{}]
        ];
    }

    validate() {
        const groups = this.conditionData.groups;
        for (let i = 0, len1 = groups.length; i < len1; i++) {
            const group = groups[i];
            for (let j = 0, len2 = group.length; j < len2; j++) {
                const condition = group[j];
                if (!condition.code) {
                    return { result: false, message: '请选择字段' };
                }
                if (condition.dataType === 'text') {
                    if (!condition.value) {
                        return { result: false, message: `请填写 ${condition.name} 的值` };
                    }
                }
                if (condition.dataType === 'boolean' || condition.dataType === 'enum' || condition.dataType === 'dict') {
                    if (!condition.value) {
                        return { result: false, message: `请选择 ${condition.name} 的值` };
                    }
                }
                if (condition.dataType === 'date') {
                    if (!condition.value.start && !condition.value.end) {
                        return { result: false, message: `请选择 ${condition.name} 的值` };
                    }
                }
                if (condition.dataType === 'number') {
                    if (condition.operator === '介于') {
                        if (!isNumber(condition.value.min) || !isNumber(condition.value.max)) {
                            return { result: false, message: `请填写 ${condition.name} 的值` };
                        }
                    } else {
                        if (!isNumber(condition.value)) {
                            return { result: false, message: `请填写 ${condition.name} 的值` };
                        }
                    }
                }
            }
        }
        return { result: true };
    }

    parseConditions() {
        const conditions = [];

        this.conditionData.groups.forEach(group => {
            const sub = [];
            group.forEach(item => {
                const condition = { column: item.code, operator: item.operator };
                if (item.dataType === 'text') {
                    condition.type = 'INPUT';
                    condition.value = item.value;
                } else if (item.dataType === 'boolean') {
                    condition.type = 'Boolean';
                    condition.value = item.value === 'true';
                } else if (item.dataType === 'enum') {
                    condition.type = 'Enum';
                    condition.value = item.value;
                } else if (item.dataType === 'dict') {
                    condition.type = 'Dict';
                    condition.value = item.value;
                } else if (item.dataType === 'number') {
                    condition.type = 'Number';
                    if (item.operator === '介于') {
                        const min = isNumber(item.value.min) ? item.value.min : null;
                        const max = isNumber(item.value.max) ? item.value.max : null;
                        condition.value = [min, max];
                    } else {
                        condition.value = item.value;
                    }
                } else if (item.dataType === 'date') {
                    condition.type = 'YMDhms';
                    const start = item.value.start ? dateFormat(item.value.start, DateFormatMapping[condition.type]) : null;
                    const end = item.value.end ? dateFormat(item.value.end, DateFormatMapping[condition.type]) : null;
                    condition.value = [start, end];
                }

                sub.push(condition);
            });
            conditions.push(sub);
        });
        return conditions;
    }

    search() {
        const validation = this.validate();
        if (!validation.result) {
            this.tipsError('请检查条件是否填写完整');
            return;
        }

        const conditions = this.parseConditions();

        this.opts.params.conditions = conditions;
        this.opts.params.isMeet = this.conditionData.isMeet;
        this.opts.params.page = 1;


        this.fetch();
    }
}
