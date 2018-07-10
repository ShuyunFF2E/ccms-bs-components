import DateValidation from '@/utils/date';


/**
 * 返回干净有意义的条件对象
 * @param {object} item
 */
export function getPureCondition(item) {
    return {
        code: item.code,
        name: item.name
    };
}

/**
 * 判断配置项是否改变[columns,conditions,extendConditions]
 * @param {array} current
 * @param {array} previous
 */
export function hasArrayChanged(current, previous) {
    const currentStr = current.filter(item => item.selected).map(item => item.code).join(',');
    const previousStr = previous.filter(item => item.selected).map(item => item.code).join(',');

    return currentStr !== previousStr;
}


export function removeItemFromArray(item, array) {
    const index = array.indexOf(item);
    if (~index) {
        array.splice(index, 1);
    }
}

export function genNumberText(num) {
    return num < 10 ? `0${num}` : `${num}`;
}


export function getHmsText(time) {
    return `${genNumberText(time.h)}:${genNumberText(time.m)}:${genNumberText(time.s)}`;
}


export function getDhmsText(time) {
    return `${genNumberText(time.D)} ${getHmsText(time)}`;
}


export function getMDRange(value) {
    const ostart = value.start;
    const oend = value.end;
    const start = ostart && DateValidation.MD(ostart) ? `${genNumberText(ostart.M)}-${genNumberText(ostart.D)}` : null;
    const end = oend && DateValidation.MD(oend) ? `${genNumberText(oend.M)}-${genNumberText(oend.D)}` : null;
    return { start, end };
}

export function getDhmsRange(value) {
    const ostart = value.start;
    const oend = value.end;
    const start = ostart && DateValidation.Dhms(ostart) ? getDhmsText(ostart) : null;
    const end = oend && DateValidation.Dhms(oend) ? getDhmsText(oend) : null;
    return { start, end };
}

export function getHmsRange(value) {
    const ostart = value.start;
    const oend = value.end;
    const start = ostart && DateValidation.hms(ostart) ? getHmsText(ostart) : null;
    const end = oend && DateValidation.hms(oend) ? getHmsText(oend) : null;
    return { start, end };
}
