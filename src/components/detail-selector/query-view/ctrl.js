import styles from './index.scss';
import { Inject } from 'angular-es-utils';
// import { getPureCondition, hasArrayChanged } from './../utils';

@Inject('$scope')
export default class DetailSelectorQueryViewCtrl {
	styles = styles;

	constructor() {
		this.opts.data = this.opts.data || [];
	}

	$onInit() {

	}

}
