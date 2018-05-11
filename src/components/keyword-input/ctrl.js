import classes from './index.scss';
import { Inject } from 'angular-es-utils';

@Inject('$element')
export default class KeywordInputCtrl {
	classes = classes;

	constructor() {
		this.ngModel = [];
		this.keyword = '';
		this.wrapWidth = 1000;
		this.containerWidth;
		this.inputWidth;
	}

	get $input() {
		return this._$element[0].querySelector('.' + classes.input);
	}
	get $container() {
		return this._$element[0].querySelector('.' + classes.container);
	}

	$onInit() {
		setTimeout(() => {
			this.containerWidth = this.$container.getBoundingClientRect().width;
			this.calculateWidth();
		}, 200);
	}

	focusInput() {
		this.$input.focus();
	}

	enter(event) {
		if (event.code === 'Enter' || event.keyCode === 13) {
			event.preventDefault();
			this.pushKeyword();
		} else if (event.code === 'Backspace' && !this.keyword) {
			this.ngModel.pop();
			this.updateNgModel();
		}
	}

	pushKeyword() {
		const keyword = this.keyword.trim();
		if (!keyword || this.ngModel.includes(keyword)) return;

		this.ngModel.push(keyword);
		this.updateNgModel();
		this.keyword = '';

		this.calculateWidth();
		setTimeout(() => {
			this.$container.scrollLeft = this.wrapWidth;
		}, 100);
	}

	updateNgModel() {
		this.ngModelController && this.ngModelController.$setViewValue(this.ngModel);
	}

	// 计算DOM元素的宽度
	calculateWidth() {
		const $div = document.createElement('div');
		$div.className = classes.virContainer;
		this.ngModel.forEach(keyword => {
			const $span = document.createElement('span');
			$span.className = classes.keyword;
			$span.innerText = keyword;
			$div.appendChild($span);
		});

		document.body.appendChild($div);
		const keywordWidth = $div.getBoundingClientRect().width;

		const offWidth = this.containerWidth - keywordWidth;
		this.inputWidth = offWidth > this.containerWidth / 2 ? offWidth : this.containerWidth / 2;

		this.wrapWidth = keywordWidth + this.inputWidth + 10;


		document.body.removeChild($div);
	}
}
