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
		this.startDate = this.start;
		this.endDate = this.end;
	}

	get dateRange() {
		const format = DateFormatMapping[this.format];
		const start = this.start ? dateFormat(this.start, format) : '';
		const end = this.end ? dateFormat(this.end, format) : '';

		if (!start && !end) return '';

		return start + ' ~ ' + end;
	}

	// 开始时间的最小值
	get startMinDate() {
		return this.minDate;
	}

	// 开始时间的最大值
	get startMaxDate() {
		return this.endDate;
	}

	// 结束时间的最小值
	get endMinDate() {
		return this.startDate;
	}

	// 结束时间的最大值
	get endMaxDate() {
		return this.maxDate;
	}

	$onInit() {

	}

	ok() {
		this.start = this.startDate;
		this.end = this.endDate;
		this.open = false;
	}

	cancel() {
		this.open = false;
	}

}
