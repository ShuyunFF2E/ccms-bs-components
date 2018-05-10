import styles from './index.scss';


export default class MonthDateCtrl {
	styles = styles;

	constructor() {
		this.monthList = genMonthList();
		this.dateList = genDateList(this.month);
	}

	onMonthChange() {
		this.dateList = genDateList(this.month);
	}
}


function genMonthList() {
	return new Array(12).fill('').map((v, i) => {
		const value = i + 1;
		return { value, title: value + '月' };
	});
}

function genDateList(month) {
	let length = 30;
	if (month === 2) {
		length = 29;
	} else if (~[1, 3, 5, 7, 8, 10, 12].indexOf(month)) {
		length = 31;
	}

	return new Array(length).fill('').map((v, i) => {
		const value = i + 1;
		return { value, title: value + '日' };
	});
}
