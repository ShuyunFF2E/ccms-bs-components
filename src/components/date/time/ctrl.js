import classes from './index.scss';

export default class TimeCtrl {
    classes = classes;

    hours = genNumberOptions(24);
    minutes = genNumberOptions(60);
    seconds = genNumberOptions(60);

    placement = 'bottom-left';

    placeholders = {
        time: 'hh:mm:ss',
        h: '时',
        m: '分',
        s: '秒'
    };

    constructor() {
        this.time = this.time || {
            h: undefined,
            m: undefined,
            s: undefined
        };
    }

    $onInit() {}

    get timeText() {
        if (!validateTime(this.time)) return '';

        return `${genNumberText(this.time.h)}:${genNumberText(this.time.m)}:${genNumberText(this.time.s)}`;
    }

}


function genNumberOptions(max) {
    return Array(max).fill('').map((v, i) => {
        return {
            title: genNumberText(i),
            value: i
        };
    });
}

function genNumberText(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

function isUndefined(v) {
    return v === undefined || v === null;
}

function validateTime(time) {
    return !isUndefined(time.h) && !isUndefined(time.m) && !isUndefined(time.s);
}
