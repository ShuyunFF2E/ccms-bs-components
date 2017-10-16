const noop = () => {};

export default class SearchInputCtrl {

	$onInit() {
		!this.search && (this.search = noop);
		!this.width && (this.width = '150px');

		if (!this.ngModelController) {
			console.error('bs-search-input 组件需要指定 ng-model 属性');
		}
	}

	// 回车搜索
	enterToSearch(event) {
		if (event.code === 'Enter' || event.keyCode === 13) {
			event.preventDefault();
			this.search({ value: this.ngModel });
		}
	}

	updateNgModel() {
		this.ngModelController && this.ngModelController.$setViewValue(this.ngModel);
	}
}
