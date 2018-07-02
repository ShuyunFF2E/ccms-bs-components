import classes from './index.scss';
import {
  Inject
} from 'angular-es-utils';

@Inject('$element')
export default class MultipleSelectCtrl {
  classes = classes;

  constructor() {
    this.ngModel = [];
    this.keyword = '';
    this.containerWidth;
    this.inputWidth;
    this.height = 50;
    this.width = 200;
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
    this.calculateInputWidth();
    if (event.code === 'Enter' || event.keyCode === 13) {
      event.preventDefault();
      this.inputWidth = 10;
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
    const mirror = document.getElementById('mirrorInput');
    mirror.innerText = this.$input.value;
    const width = Math.ceil(mirror.getBoundingClientRect().width);
    this.inputWidth = width + 10;
  }
}
