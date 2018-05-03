
export function isBoolean(v) {
	return Object.prototype.toString.call(v) === '[object Boolean]';
}
