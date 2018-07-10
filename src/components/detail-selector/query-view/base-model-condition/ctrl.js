import styles from './index.scss';
import DateValidation from '@/utils/date';
import dateFormat from 'common-javascript-utils/src/date';
import { Inject } from 'angular-es-utils';


const DateFormatMapping = {
    YMD: 'yyyy-MM-dd',
    YMDhms: 'yyyy-MM-dd hh:mm:ss'
};


@Inject('$element')
export default class BaseModelConditionBox {
    styles = styles;

    isOpen = true;

    getEnableConditions() {
        return [
            ...this.config.conditions,
            ...this.config.extendConditions.filter(v => v.selected)
        ];
    }

    switchConditionBox() {
        const $conditionBoxDOM = this._$element[0].querySelector('.' + styles.conditionZone);
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
        const conditions = this.getEnableConditions();

        conditions.forEach(condition => {
            const dataType = condition.dataType || condition.typeName;
            if (dataType === 'text') {
                condition.value = [];
            } else if (dataType === 'boolean') {
                condition.value = undefined;
            } else if (dataType === 'enum' || dataType === 'dict') {
                condition.value = [];
            } else if (dataType === 'number') {
                condition.value.min = undefined;
                condition.value.max = undefined;
            } else if (dataType === 'date') {
                const format = condition.format;
                if (format === 'YMDhms' || format === 'YMD') {
                    condition.value.start = undefined;
                    condition.value.end = undefined;
                } else if (format === 'MD') {
                    condition.value.start = {};
                    condition.value.end = {};
                } else if (format === 'Dhms') {
                    condition.value.start = {};
                    condition.value.end = {};
                } else if (format === 'hms') {
                    condition.value.start = {};
                    condition.value.end = {};
                }
            }
        });

    }

    switchToAdanceModel() {
        this.config.searchModel = 'ADVANCE';
    }

    searchData() {
        const conditions = this.getEnableConditions();

        const formDataList = [];

        conditions.forEach(item => {
            const dataType = item.dataType;
            const formData = { column: item.code, value: item.value };
            formData.type = getFormDataType(dataType, item.format);

            if (dataType === 'text') {
                if (item.value && item.value.length > 0) {
                    formData.operator = '包含';
                    formDataList.push(formData);
                }
            } else if (dataType === 'enum' || dataType === 'dict') {
                if (item.value && item.value.length > 0) {
                    formData.operator = '等于任意值';
                    formDataList.push(formData);
                }
            } else if (dataType === 'number') {
                if (isValidation(item.value.min) || isValidation(item.value.max)) {
                    formData.operator = '介于';
                    const min = isValidation(item.value.min) ? item.value.min : null;
                    const max = isValidation(item.value.max) ? item.value.max : null;
                    formData.value = [min, max];
                    formDataList.push(formData);
                }
            } else if (dataType === 'boolean') {
                if (isValidation(item.value)) {
                    formData.operator = '等于';
                    formData.value = item.value === 'true';
                    formDataList.push(formData);
                }
            } else if (dataType === 'date' && item.value && (item.value.start || item.value.end)) {
                const format = item.format;
                formData.operator = '介于';
                if (format === 'YMDhms' || format === 'YMD') {
                    const start = item.value.start ? dateFormat(item.value.start, DateFormatMapping[format]) : null;
                    const end = item.value.end ? dateFormat(item.value.end, DateFormatMapping[format]) : null;
                    formData.value = [start, end];
                    formDataList.push(formData);
                } else if (format === 'MD') {
                    const range = getMDRange(item.value);
                    if (range.start || range.end) {
                        formData.value = [range.start, range.end];
                        formDataList.push(formData);
                    }
                } else if (format === 'Dhms') {
                    const range = getDhmsRange(item.value);
                    if (range.start || range.end) {
                        formData.value = [range.start, range.end];
                        formDataList.push(formData);
                    }
                } else if (format === 'hms') {
                    const range = getHmsRange(item.value);
                    if (range.start || range.end) {
                        formData.value = [range.start, range.end];
                        formDataList.push(formData);
                    }
                }
            }
        });

        this.fetch({
            page: 1,
            isMeet: true,
            conditions: formDataList.length > 0 ? [formDataList] : []
        }, true);
    }
}


function isValidation(v) {
    return v !== undefined && v !== null;
}

const TypeMapping = {
    text: 'INPUT',
    enum: 'Enum',
    dict: 'Dict',
    number: 'Number',
    boolean: 'Boolean'
};

function getFormDataType(dataType, format) {
    if (dataType !== 'date') {
        return TypeMapping[dataType];
    }

    return format;
}


function genNumberText(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

function getHmsText(time) {
    return `${genNumberText(time.h)}:${genNumberText(time.m)}:${genNumberText(time.s)}`;
}

function getDhmsText(time) {
    return `${genNumberText(time.D)} ${getHmsText(time)}`;
}

function getMDRange(value) {
    const ostart = value.start;
    const oend = value.end;
    const start = ostart && DateValidation.MD(ostart) ? `${genNumberText(ostart.M)}-${genNumberText(ostart.D)}` : null;
    const end = oend && DateValidation.MD(oend) ? `${genNumberText(oend.M)}-${genNumberText(oend.D)}` : null;
    return { start, end };
}

function getDhmsRange(value) {
    const ostart = value.start;
    const oend = value.end;
    const start = ostart && DateValidation.Dhms(ostart) ? getDhmsText(ostart) : null;
    const end = oend && DateValidation.Dhms(oend) ? getDhmsText(oend) : null;
    return { start, end };
}

function getHmsRange(value) {
    const ostart = value.start;
    const oend = value.end;
    const start = ostart && DateValidation.hms(ostart) ? getHmsText(ostart) : null;
    const end = oend && DateValidation.hms(oend) ? getHmsText(oend) : null;
    return { start, end };
}
