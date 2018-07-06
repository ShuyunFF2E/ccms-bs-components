import classes from './index.scss';
import { Inject } from 'angular-es-utils';


const MinInputWidth = 30;

@Inject('$element', '$timeout')
export default class MultipleSelectCtrl {
    classes = classes;

    constructor() {
        this.ngModel = [];
        this.keyword = '';
        this.containerWidth;
        this.inputWidth;
        this.minHeight = 100;
        this.maxHeight = 400;
    }

    $onInit() {
        document.addEventListener('click', this.click, true);

        this.getComponentElement(classes.container).then($container => {
            this.$container = $container;
            this.containerWidth = $container.getBoundingClientRect().width;
        });

        this.getComponentElement(classes.input).then($input => {
            this.$input = $input;
            $input.addEventListener('compositionstart', this.onCompositionStart, true);
            $input.addEventListener('compositionupdate', this.onCompositionUpdate, true);
            $input.addEventListener('compositionend', this.onCompositionEnd, true);
        });

        this.getComponentElement(classes.mirrorInput).then($mirrorInput => {
            this.$mirrorInput = $mirrorInput;
        });
    }

    $onDestroy() {
        document.removeEventListener('click', this.click, true);
        this.$input.removeEventListener('compositionstart', this.onCompositionStart);
        this.$input.removeEventListener('compositionupdate', this.onCompositionUpdate);
        this.$input.removeEventListener('compositionend', this.onCompositionEnd);
    }

    getElement(className) {
        return this._$element[0].querySelector('.' + className);
    }

    getComponentElement(className) {
        return new Promise((resolve) => {
            const task = () => {
                const element = this.getElement(className);
                if (element) {
                    resolve(element);
                } else {
                    setTimeout(task, 50);
                }
            };
            task();
        });
    }

    setInputFocus() {
        this.getComponentElement(classes.input).then($input => {
            $input.focus();
        });
    }

    click = evt => {
        const targetClassList = [...evt.target.classList];
        if (!this._$element[0].contains(evt.target)) {
            this.pushKeyword();
        } else if (!targetClassList.includes(classes.btnRemove) &&
            !targetClassList.includes(classes.input)) {
            this.$input.focus();
        }
    }

    keydown(event) {
        if (this.lock) return;
        this.calculateInputWidth();
        if (event.code === 'Enter' || event.keyCode === 13) {
            event.preventDefault();
            this.inputWidth = MinInputWidth;
            this.pushKeyword();
            //  this.$input.scrollIntoView(false);
        } else if (event.code === 'Backspace' && !event.target.value) {
            this.ngModel.pop();
            this.updateNgModel();
        }
    }

    // 中文输入法开始
    onCompositionStart = () => {
        this.lock = true;
    }

    // 中文输入法开始
    onCompositionUpdate = () => {
        this._$timeout(() => {
            this.calculateInputWidth();
        }, 50);
    }

    // 中文输入法结束
    onCompositionEnd = () => {
        this.lock = false;
        this._$timeout(() => {
            this.calculateInputWidth();
        }, 50);
    }

    pushKeyword() {
        if (this.lock) return;

        const keyword = this.keyword.trim();
        if (!keyword || this.ngModel.includes(keyword)) {
            return;
        }

        this.ngModel.push(keyword);
        this.updateNgModel();
        this.keyword = '';
    }

    remove(evt, keyword) {
        evt.stopPropagation();
        const index = this.ngModel.indexOf(keyword);
        if (~index) this.ngModel.splice(index, 1);
        this.updateNgModel();
    }

    updateNgModel() {
        this.ngModelController && this.ngModelController.$setViewValue(this.ngModel);
    }

    // 计算INPUT元素的宽度,动态的等于当前输入的input value 的宽度
    calculateInputWidth() {
        const mirror = this.$mirrorInput;
        mirror.innerText = this.$input.value;
        const width = Math.ceil(mirror.getBoundingClientRect().width);
        this.inputWidth = Math.max(MinInputWidth, width + 20);
    }

}
