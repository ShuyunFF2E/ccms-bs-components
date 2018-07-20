import classes from './index.scss';
import { Inject } from 'angular-es-utils';


const MinInputWidth = 30;

@Inject('$element', '$timeout', '$ccTips')
export default class MultipleSelectCtrl {
    classes = classes;

    constructor() {
        this.ngModel = [];
        this.keyword = '';
        this.containerWidth;
        this.inputWidth;
        this.minHeight = 100;
        this.maxHeight = 400;

        // 单关键字最大长度
        this.maxKeywordLength = 20;
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

    open() {
        this.setInputFocus();
        this.isOpen = true;
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
            if (this.isOpen) {
                this.isOpen = false;
                this.pushKeyword();
            }
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

        if (!this.keyword.trim().length) return;

        const keywords = this.keyword.split(';');

        if (this.maxKeywordLength && keywords.filter(item => item.trim().length > this.maxKeywordLength).length > 0) {

            return this._$ccTips.error(`单个关键字长度不能超过${this.maxKeywordLength}个字符`, {
                duration: 3000,
                container: getModalBody(this._$element) || document.body
            });

        }

        keywords.forEach(keyword => {
            keyword = keyword.trim();
            if (keyword && !this.ngModel.includes(keyword)) {
                this.ngModel.push(keyword);
            }
        });

        this.updateNgModel();
        this.keyword = '';
        this.inputWidth = MinInputWidth;
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


function getModalBody($element) {
    if ($element[0].tagName.toUpperCase() === 'BODY') {
        return undefined;
    }
    if ($element.hasClass('modal-body')) {
        return $element[0];
    }
    return getModalBody($element.parent());
}
