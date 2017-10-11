const noop = () => {};

export default class SearchInputCtrl {

	$onInit() {
		!this.search && (this.search = noop);

		if (typeof this.ngModel === 'undefined') {
			console.warn('bs-search-input have to used with ng-model');
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
