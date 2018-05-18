function isAvailable(v) {
	return v !== undefined && v !== null;
}

function genNumberText(num) {
	return num < 10 ? `0${num}` : `${num}`;
}

function MD(time) {
	return isAvailable(time.M || time.month) && isAvailable(time.D || time.month);
}

function hms(time) {
	return isAvailable(time.h) && isAvailable(time.m) && isAvailable(time.s);
}

function Dhms(time) {
	return isAvailable(time.D) && hms(time);
}

export default {
	genNumberText,
	isAvailable,
	MD,
	hms,
	Dhms
};
