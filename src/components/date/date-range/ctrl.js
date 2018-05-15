import styles from './index.scss';
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

		this.start = {};
		this.end = {};
	}

	$onInit() {
		if (isDateFormat(this.format)) {
			this.dateRange.start = this.start;
			this.dateRange.end = this.end;
		} else if (this.format === 'MD') {
			this.start = this.start || {};
			this.end = this.end || {};
			this.dateRange.startMonth = this.start.month;
			this.dateRange.startDate = this.start.date;
			this.dateRange.endMonth = this.end.month;
			this.dateRange.endDate = this.end.date;
		} else if (this.format === 'hms') {
			this.dateRange.start = {};
			this.dateRange.end = {};
		} else if (this.format === 'Dhms') {
			this.dateRange.start = {};
			this.dateRange.end = {};
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
		const start = this.start.month && this.start.date ? `${fillMonthDate(this.start.month)}月${fillMonthDate(this.start.date)}日` : '';
		const end = this.end.month && this.end.date ? `${fillMonthDate(this.end.month)}月${fillMonthDate(this.end.date)}日` : '';
		if (!start && !end) return '';
		return start + ' ~ ' + end;
	}

	getTimeRangeText() {
		const start = !validateTime(this.start) ? '' :
			`${genNumberText(this.start.h)}:${genNumberText(this.start.m)}:${genNumberText(this.start.s)}`;
		const end = !validateTime(this.end) ? '' :
			`${genNumberText(this.end.h)}:${genNumberText(this.end.m)}:${genNumberText(this.end.s)}`;

		if (!start && !end) return '';
		return start + ' ~ ' + end;
	}

	getDTimeRangeText() {
		const start = !validateDTime(this.start) ? '' : getDTimeText(this.start);
		const end = !validateDTime(this.end) ? '' : getDTimeText(this.end);
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
				month: this.dateRange.startMonth,
				date: this.dateRange.startDate
			};
			this.end = {
				month: this.dateRange.endMonth,
				date: this.dateRange.endDate
			};
		} else if (this.format === 'hms') {
			if (validateTime(this.dateRange.start)) {
				this.start = this.dateRange.start;
			}
			if (validateTime(this.dateRange.end)) {
				this.end = this.dateRange.end;
			}
		} else if (this.format === 'Dhms') {
			if (validateDTime(this.dateRange.start)) {
				this.start = this.dateRange.start;
			}
			if (validateDTime(this.dateRange.end)) {
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
	// return number >= 10 ? '' + number : '0' + number;
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

function validateDTime(time) {
	return !isUndefined(time.D) && validateTime(time);
}

function getDTimeText(time) {
	return `${time.D}日 ${genNumberText(time.h)}:${genNumberText(time.m)}:${genNumberText(time.s)}`;
}
