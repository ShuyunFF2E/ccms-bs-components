import styles from './index.scss';

import { Inject } from 'angular-es-utils';

import setterCtrl from './setting-modal/ctrl';
import setterTemp from './setting-modal/index.html';

import { getPureCondition } from './utils';

const CONFIG_KEY_PREFIX = 'CCMS_BS_DETAIL_SELECTOR_CONFIG';


@Inject('$rootScope', '$scope', '$ccModal', '$ccTips', '$element', '$timeout', '$q', 'modalInstance', 'resources')
export default class DetailSelectorCtrl {
	styles = styles;

	constructor() {

		this.cacheKey = `${CONFIG_KEY_PREFIX} - ${this.uid}`;

		this.body = this._$element[0].querySelector('.modal-body');

		// 当前选择器的模式 [QUERY:查询模式, CHECK:查看模式]
		this.model = 'QUERY';

		this.config = {
			// 常用条件
			conditions: [],
			// 可用搜索条件
			extendConditions: [],
			// 列表显示字段
			columns: []
		};

		// 当前需要显示的搜索条件集合
		// this.conditions;
		// 当前列表需要显示的数据项
		// this.gridColumns;

	}

	$onInit() {
		this.config = {
			// 常用条件
			conditions: this.conditions,
			// 可用搜索条件
			extendConditions: this.extendConditions,
			// 列表显示字段
			columns: this.columns
		};
		this.opts = {
			/**
			 * 条件模式[BASE:简单查找,ADVANCE:高级查找]
			 */
			conditionModel: 'BASE',
			statistic: { selected: 0, total: 0 },
			params: { keyword: '' },
			// 单选/多选
			selectType: this.selectType,
			// 是否开启高级搜索
			advanceSearch: this.advanceSearch
		};
	}


	// 设置选择器搜索条件以及显示的列表字段
	openSelectorSetter() {
		const scope = this._$rootScope.$new();
		scope.conditions = this.config.conditions.map(getPureCondition);
		scope.extendConditions = this.config.extendConditions.map(getPureCondition);
		// scope.columns = this.config.columns.map(getPureCondition);

		this._$ccModal.modal({
			scope,
			bindings: scope,
			__body: setterTemp,
			controller: setterCtrl,
			title: '搜索条件偏好设置',
			style: this.setter.style,
			uid: 'CCMS_BS_DETAIL_SETTING'
		}).open().result.then(({ conditions, extendConditions }) => {
			const conditionSet = [...this.config.conditions, ...this.config.extendConditions];

			this.config.conditions = conditions.map(c => conditionSet.find(v => v.code === c.code));
			this.config.extendConditions = extendConditions.map(c => conditionSet.find(v => v.code === c.code));
		});
	}

	/**
	 * 切换至查看视图
	 */
	switchToCheckView = () => {
		this.model = 'CHECK';
	}

	/**
	 * 切换至查询视图
	 */
	switchToQueryView = () => {
		this.model = 'QUERY';
	}
}
