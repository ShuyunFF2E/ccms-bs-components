import classes from './index.scss';

export default class DTimeCtrl {
    classes = classes;


    dates = genNumberOptions(31);
    hours = genNumberOptions(24);
    minutes = genNumberOptions(60);
    seconds = genNumberOptions(60);

    placeholders = {
        D: '日',
        h: '时',
        m: '分',
        s: '秒'
    };

    constructor() {
        this.value = this.value || {
            D: undefined,
            h: undefined,
            m: undefined,
            s: undefined
        };
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
