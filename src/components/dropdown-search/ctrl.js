export default class DropdownSearch {
	constructor() {
		this.keyword = '';

		this.isOpen = false;

		!this.mapping && (this.mapping = { value: 'value', name: 'name' });
		!this.datalist && (this.datalist = []);
		!this.emptyMsg && (this.emptyMsg = '没有可选项');
	}

	$onInit() {
		this.generateOptions();
	}

	$onChanges(changes) {
		try {
			if (changes.datalist) {
				this.generateOptions();
			}
		} catch (error) {}
	}

	generateOptions() {
		if (!this.datalist.length) {
			return this.options = [];
		}

		const optionType = Object.prototype.toString.call(this.datalist[0]);

		const isPlain = optionType === '[object String]' || optionType === '[object Number]';

		// 判断选项值是否为简单类型
		this.options = this.datalist.map(v => {
			return isPlain ? {
				value: v,
				name: v
			} : {
				value: v[this.mapping.value],
				name: v[this.mapping.name]
			};
		});
	}

	focus(){

	}

	select(option) {
		this.keyword = option.name;
		this.isOpen = false;
	}
}
