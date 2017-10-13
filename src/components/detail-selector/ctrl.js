import { Inject } from 'angular-es-utils';

import setterCtrl from './setting-modal/ctrl';
import setterTemp from './setting-modal/index.html';

const CONFIG_KEY_PREFIX = 'CCMS_BS_DETAIL_SELECTOR_CONFIG';


@Inject('$rootScope', '$scope', '$ccModal', '$ccTips', '$element', '$timeout', '$q', 'modalInstance', 'resources')
export default class DetailSelectorCtrl {

	constructor() {

		this.cacheKey = `${CONFIG_KEY_PREFIX} - ${this.uid}`;

		this.body = this._$element[0].querySelector('.modal-body');

		// 当前选择器的模式 [QUERY:查询模式, VIEW:查看模式]
		this.model = 'QUERY';

		this.opts = {
			statistic: { selected: 0, total: 0 },
			params: { keyword: '' }
		};

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

		this.isFetchingConfig = true;

		this.fetchSelectorConfig().then();
	}

	$onInit() {
		this.opts.selectType = this.selectType;
		this.opts.advanceSearch = this.advanceSearch;
	}


	// 获取选择器的初始配置
	fetchSelectorConfig() {
		// 优先从本地缓存中读取配置信息，如果没有则远程获取
		const config = getConfigFromSessionStorage(this.cacheKey);
		if (config) {
			this.config = config;
			this.isFetchingConfig = false;
			return this._$q.resolve();
		}

		// return this._resources.config.get().then(res => {
		// 	this.config.conditions = res.conditions;
		// 	this.config.extendConditions = res.extendConditions;
		// 	this.config.columns = res.columns;
		// 	setConfigToSessionStorage(this.cacheKey,this.config);
		// }).catch(error => {
		// 	this._$ccTips.error(error.message, this.body);
		// }).finally(() => {
		// 	this.isFetchingConfig = false;
		// });

		return this._$q(resolve => {
			this._$timeout(() => {
				this.config = { conditions, extendConditions, columns };

				setConfigToSessionStorage(this.cacheKey, this.config);
				this.isFetchingConfig = false;
				resolve();
			}, 2000);
		});
	}

	// 设置选择器搜索条件以及显示的列表字段
	openSelectorSetter() {
		const scope = this._$rootScope.$new();
		scope.conditions = this.config.conditions.map(getPureItem);
		scope.extendConditions = this.config.extendConditions.map(getPureItem);
		scope.columns = this.config.columns.map(getPureItem);

		this._$ccModal.modal({
			scope,
			bindings: scope,
			__body: setterTemp,
			controller: setterCtrl,
			title: this.setter.title,
			style: this.setter.style
		}).open().result.then(({ columns, conditions, extendConditions }) => {

			this.config = {
				columns: columns.map(getPureItem),
				conditions: conditions.map(getPureItem),
				extendConditions: extendConditions.map(getPureItem)
			};

			setConfigToSessionStorage(this.cacheKey, this.config);
		});
	}
}


/**
 * 从缓存中获取历史配置
 */
function getConfigFromSessionStorage(key) {
	const configStr = window.sessionStorage.getItem(key);

	return configStr ? JSON.parse(configStr) : configStr;
}

/**
 * 将配置存储只本地缓存
 */
function setConfigToSessionStorage(key, config) {
	window.sessionStorage.setItem(key, JSON.stringify(config));
}

/**
 * 返回干净的条件/字段数据
 */
function getPureItem(item) {
	return {
		code: item.code,
		name: item.name,
		selected: !!item.selected
	};
}

const conditions = [{
	code: 'goodsName',
	name: '商品名称',
	selected: true
}, {
	code: 'shopName',
	name: '店铺',
	selected: true
}, {
	code: 'price',
	name: '价格',
	selected: true
}];

const extendConditions = [{
	code: 'condition1',
	name: '自定义类目1',
	selected: true
}, {
	code: 'condition2',
	name: '自定义类目2',
	selected: true
}, {
	code: 'condition3',
	name: '自定义类目3',
	selected: true
}, {
	code: 'condition4',
	name: '自定义类目4',
	selected: true
}, {
	code: 'condition5',
	name: '自定义类目5',
	selected: true
}, {
	code: 'condition6',
	name: '名字很长很长很长的自定义类目6',
	selected: true
}];

const columns = [{
	code: 'goodsName',
	name: '商品名称',
	selected: true
}, {
	code: 'shopName',
	name: '店铺',
	selected: true
}, {
	code: 'price',
	name: '价格',
	selected: true
}, {
	code: 'size',
	name: '尺寸',
	selected: true
}, {
	code: 'color',
	name: '颜色',
	selected: true
}];
