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
		}
	}

	// 文本框中显示的值
	get dateRangeText() {
		if (isDateFormat(this.format)) {
			return this.getDateTimeRangeText();
		} else if (this.format === 'MD') {
			return this.getMonthDateRangeText();
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
