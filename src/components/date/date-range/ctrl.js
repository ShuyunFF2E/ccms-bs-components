import styles from './index.scss';
import DateValidation from '@/utils/date';
import dateFormat from 'common-javascript-utils/src/date';

const DateFormatMapping = {
    YMD: 'yyyy/MM/dd',
    YMDhms: 'yyyy/MM/dd hh:mm:ss'
};

export default class DateRangeCtrl {
    styles = styles;

    constructor() {
        this.open = false;

        this.dateRange = {};
    }

    $onInit() {
        this.calculateDateRangeValue();
    }

    onDropdownOpen() {
        this.calculateDateRangeValue();
    }

    calculateDateRangeValue() {
        if (isDateFormat(this.format)) {
            this.dateRange.start = this.start;
            this.dateRange.end = this.end;
        } else if (this.format === 'MD') {
            this.start = this.start || {};
            this.end = this.end || {};
            this.dateRange.startMonth = this.start.M;
            this.dateRange.startDate = this.start.D;
            this.dateRange.endMonth = this.end.M;
            this.dateRange.endDate = this.end.D;
        } else if (this.format === 'hms') {
            this.dateRange.start = { ...this.start };
            this.dateRange.end = { ...this.end };
        } else if (this.format === 'Dhms') {
            this.dateRange.start = { ...this.start };
            this.dateRange.end = { ...this.end };
        }
    }

    // 文本框中显示的值
    get dateRangeText() {
        if (isDateFormat(this.format)) {
            return this.getDateTimeRangeText();
        } else if (this.format === 'MD') {
            return this.getMonthDateRangeText();
        } else if (this.format === 'hms') {
            return this.getTimeRangeText();
        } else if (this.format === 'Dhms') {
            return this.getDTimeRangeText();
        }
    }

    getDateTimeRangeText() {
        const format = DateFormatMapping[this.format];
        const start = this.start ? dateFormat(this.start, format) : '';
        const end = this.end ? dateFormat(this.end, format) : '';
        if (!start && !end) return '';
        return start + ' ~ ' + end;
    }

    getMonthDateRangeText() {
        const ostart = this.start || {};
        const oend = this.end || {};

        const start = ostart.M && ostart.D ? `${fillMonthDate(ostart.M)}月${fillMonthDate(ostart.D)}日` : '';
        const end = oend.M && oend.D ? `${fillMonthDate(oend.M)}月${fillMonthDate(oend.D)}日` : '';
        if (!start && !end) return '';
        return start + ' ~ ' + end;
    }

    getTimeRangeText() {
        const ostart = this.start || {};
        const oend = this.end || {};
        const start = !DateValidation.hms(ostart) ? '' :
            `${genNumberText(this.start.h)}:${genNumberText(this.start.m)}:${genNumberText(this.start.s)}`;
        const end = !DateValidation.hms(oend) ? '' :
            `${genNumberText(this.end.h)}:${genNumberText(this.end.m)}:${genNumberText(this.end.s)}`;

        if (!start && !end) return '';
        return start + ' ~ ' + end;
    }

    getDTimeRangeText() {
        const ostart = this.start || {};
        const oend = this.end || {};
        const start = !DateValidation.Dhms(ostart) ? '' : getDTimeText(ostart);
        const end = !DateValidation.Dhms(oend) ? '' : getDTimeText(oend);
        if (!start && !end) return '';
        return start + ' ~ ' + end;
    }


    ok() {
        this.open = false;

        if (isDateFormat(this.format)) {
            this.start = this.dateRange.start;
            this.end = this.dateRange.end;
        } else if (this.format === 'MD') {
            this.start = {
                M: this.dateRange.startMonth,
                D: this.dateRange.startDate
            };
            this.end = {
                M: this.dateRange.endMonth,
                D: this.dateRange.endDate
            };
        } else if (this.format === 'hms') {
            if (DateValidation.hms(this.dateRange.start)) {
                this.start = this.dateRange.start;
            }
            if (DateValidation.hms(this.dateRange.end)) {
                this.end = this.dateRange.end;
            }
        } else if (this.format === 'Dhms') {
            if (DateValidation.Dhms(this.dateRange.start)) {
                this.start = this.dateRange.start;
            }
            if (DateValidation.Dhms(this.dateRange.end)) {
                this.end = this.dateRange.end;
            }
        }

    }

    cancel() {
        this.open = false;
    }

}

function isDateFormat(format) {
    return format === 'YMD' || format === 'YMDhms';
}

function fillMonthDate(number) {
    return number + '';
}

function genNumberText(num) {
    return num < 10 ? `0${num}` : `${num}`;
}

function getDTimeText(time) {
    return `${time.D}日 ${genNumberText(time.h)}:${genNumberText(time.m)}:${genNumberText(time.s)}`;
}
