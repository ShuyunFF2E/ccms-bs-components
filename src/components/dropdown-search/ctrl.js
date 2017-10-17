import { Inject } from 'angular-es-utils';

@Inject('$timeout')
export default class DropdownSearch {
	constructor() {
		this.keyword = '';

		this.isOpen = false;

		!this.mapping && (this.mapping = { value: 'value', name: 'name' });
		!this.datalist && (this.datalist = []);
		!this.emptyMsg && (this.emptyMsg = '没有可选项');
		!this.width && (this.width = '150px');

		this.__placeholder = this.placeholder || '';
	}

	$onInit() {
		if (!this.ngModelController) {
			console.error('bs-dropdown-search 组件必须指定 ng-model 属性');
		}
		this.generateOptions();
		const activeOption = this.getActiveOption();

		if (activeOption) {
			this.keyword = activeOption.name;
		} else {
			if (typeof this.ngModel !== 'undefined') {
				console.warn('bs-dropdown-search组件由于 datalist 中不存在指定当前 ngModel 的值，因此 ngModel 被重置为 null');
			}

			this.setModelValue(null);
		}
	}

	$onChanges(changes) {
		try {
			if (changes.datalist) {
				this.generateOptions();
			}
		} catch (error) {
			// ignore error
		}
	}

	getActiveOption() {
		return this.options.filter(option => {
			return option.value === this.ngModel;
		})[0];
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

	dropdownOpen() {
		this.isOpen = true;

		if (this.ngModel) {
			const activeOption = this.getActiveOption();
			const keyword = activeOption ? activeOption.name : '';
			this.placeholder = keyword || this.__placeholder;
			this.__keyword = keyword;
			this.keyword = '';
		}

		this.onDropdownOpen && this.onDropdownOpen();
	}

	dropdownClose() {
		this.placeholder = this.__placeholder;
		if (this.isOpen) {
			this.keyword = this.ngModel ? this.__keyword : '';
		}

		this.onDropdownClose && this.onDropdownClose();
	}

	select(option) {
		this.setModelValue(option.value);
		this.keyword = option.name;
		this.isOpen = false;
	}

	clear(event) {
		event.preventDefault();
		this.setModelValue(null);
		this.keyword = '';
		this.__keyword = '';
		this.isOpen = false;
	}

	setModelValue(v) {
		this.ngModelController && this.ngModelController.$setViewValue(v);
	}

	/**
	 * 如果选项的显示文字为DOM标签，则需要获取存文字作为title
	 * @param {string} 选项的显示文字字符串
	 */
	HTML2Text(name) {
		const div = document.createElement('div');
		div.innerHTML = name;

		return div.innerText;
	}
}
