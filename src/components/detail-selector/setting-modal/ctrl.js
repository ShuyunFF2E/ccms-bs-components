import styles from './index.scss';

import { Inject } from 'angular-es-utils';
// import { getPureCondition } from '../utils';

@Inject('$ccTips', '$element', 'modalInstance')
export default class DetailSelectorSetterCtrl {
	styles = styles;

	constructor() {
		this.body = this._$element[0].querySelector('.modal-body');
	}

	ok() {
		this._modalInstance.ok();
	}
}
