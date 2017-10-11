export default function throttle(func, delay, context = null) {
	let recent;
	return (...args) => {
		const now = Date.now();

		if (!recent || (now - recent > (delay || 10))) {
			func.apply(context, args);
			recent = now;
		}
	};
}
