import classes from './index.scss';

export default class DTimeCtrl {
    classes = classes;

    constructor() {
        this.value = {
            D: undefined,
            h: undefined,
            m: undefined,
            s: undefined
        };
        this.placeholders = {
            D: '日',
            h: '时',
            m: '分',
            s: '秒'
        };
        this.dates = genNumberOptions(31);
        this.hours = genNumberOptions(24);
        this.minutes = genNumberOptions(60);
        this.seconds = genNumberOptions(60);
    }

    $onInit() {}

}


function genNumberOptions(max) {
    return Array(max).fill('').map((v, i) => {
        return {
            title: genNumberText(i + 1),
            value: i + 1
        };
    });
}

function genNumberText(num) {
    return num < 10 ? `0${num}` : `${num}`;
}
