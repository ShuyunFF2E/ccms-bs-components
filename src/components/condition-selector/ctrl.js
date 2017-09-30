import { Inject } from 'angular-es-utils';

@Inject('$scope', '$ccTips', '$element', 'modalInstance', 'resources')
export default class ConditionSelectorCtrl {

	constructor() {
		this.body = this._$element[0].querySelector('.modal-body');

		// console.log(this._resources);

	}
}
