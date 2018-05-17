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
		this.search({
			isMeet: true,
			offset: 0,
			limit: 10,
			conditions: []
		});
	}

	setGridData = data => {
		Object.assign(this.opts, data);
		// this.opts = { ...this.opts, ...data };
	}

	search = (params = {}) => {
		this.opts.isLoading = true;
		return this.config.search(params).then(res => {
			this.opts.isLoading = false;
			this.setGridData(res);
		}).catch(err => {
			this.opts.isLoading = false;
			throw err;
		});
	}

}
