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
		document.addEventListener('click', this.click, true);

		setTimeout(() => {
			this.containerWidth = this.$container.getBoundingClientRect().width;
			this.calculateWidth();

			this.$input.addEventListener('compositionstart', this.onCompositionStart.bind(this), true);
			this.$input.addEventListener('compositionend', this.onCompositionEnd.bind(this), true);

		}, 50);
	}

	$onDestroy() {
		document.removeEventListener('click', this.blur, true);
	}

	click = evt => {
		const targetClassList = [...evt.target.classList];
		if (!this._$element[0].contains(evt.target)) {
			this.pushKeyword();
			this.$container.scrollLeft = 0;
		} else if (!targetClassList.includes(classes.btnRemove) &&
			!targetClassList.includes(classes.input)) {
			this.$input.focus();
		}
	}

	keydown(event) {
		if (this.lock) return;

		if (event.code === 'Enter' || event.keyCode === 13) {
			event.preventDefault();
			this.pushKeyword();
		} else if (event.code === 'Backspace' && !event.target.value) {
			this.ngModel.pop();
			this.updateNgModel();
		}
	}

	// 中文输入法开始
	onCompositionStart() {
		this.lock = true;
	}

	// 中文输入法结束
	onCompositionEnd() {
		this.lock = false;
	}

	pushKeyword() {
		if (this.lock) return;

		const keyword = this.keyword.trim();
		if (!keyword || this.ngModel.includes(keyword)) return;

		this.ngModel.push(keyword);
		this.updateNgModel();
		this.keyword = '';

		this.calculateWidth();
		setTimeout(() => {
			if (this.wrapWidth > this.containerWidth * 1.5) {
				this.$container.scrollLeft = this.wrapWidth;
			}
		}, 100);
	}

	remove(evt, keyword) {
		evt.stopPropagation();

		const index = this.ngModel.indexOf(keyword);
		if (~index) this.ngModel.splice(index, 1);
		this.updateNgModel();
		this.calculateWidth();
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

		const diffWidth = this.containerWidth - keywordWidth;
		this.inputWidth = diffWidth > this.containerWidth / 2 ? diffWidth : this.containerWidth / 2;

		this.wrapWidth = keywordWidth + this.inputWidth + 10;


		document.body.removeChild($div);
	}
}
