import { Inject } from 'angular-es-utils';
import { getPureCondition, hasArrayChanged } from './../utils';

@Inject('$scope')
export default class DetailSelectorQueryViewCtrl {

	constructor() {
		this.gridExternalData = [];
	}

	$onInit() {
		this.refreshConditions();
		this.refreshGridColumns();

		this.fetchResourceData(false);
	}

	$onChanges(changes) {
		if (changes.config) {

			const { currentValue, previousValue } = changes.config;

			/**
			 * 第一次渲染组件的时候也会触发$onChanges事件
			 * 但此时 changes.config.previousValue 为一个特殊的空值
			 * 在执行下面代码时会报错，所以使用 try catch 语句包裹一下
			 */
			try {
				// 如果需要显示的列数据修改了则重新重新渲染Grid组件
				if (hasArrayChanged(currentValue.columns, previousValue.columns)) {
					this.refreshGridColumns();
				}
				// 如果条件配置修改了则重新计算需要显示的条件值
				if (hasArrayChanged(currentValue.conditions, previousValue.conditions) ||
					hasArrayChanged(currentValue.extendConditions, previousValue.extendConditions)) {
					this.refreshConditions();
				}
			} catch (err) {
				// ignore error
			}
		}
	}

	// 当前显示的搜索条件集合
	refreshConditions() {
		// 常用条件在`配置商品选择器`中选中（selected=true）就显示
		const conditions = this.config.conditions.filter(item => item.selected).map(getPureCondition);

		// 可用搜索条件必须在更多里面选中（selected=true && active=true）才显示
		const extendConditions = this.config.extendConditions.filter(item => item.selected && item.active).map(item => ({ ...item, isExtend: true /** 可选条件标记 **/ }));

		this.conditions = conditions.concat(extendConditions);
	}

	// 删除指定的可选条件
	removeExtendCondition(condition) {
		this.config.extendConditions.find(item => item.code === condition.code).active = false;
		this.refreshConditions();
	}

	// 当前需要显示的数据项
	refreshGridColumns() {
		this.gridColumns = this.config.columns.filter(item => item.selected);
	}

	search() {
		console.log(this.opts.params.keyword);
	}

	fetchResourceData = selected => {
		const extendData = generateResourceData(this.gridExternalData.length, selected);
		this.gridExternalData = this.gridExternalData.concat(extendData);

		this.opts.statistic.total = 1000;
	}
}


function generateResourceData(skip = 0, selected = false) {
	return Array(20).fill().map((v, i) => {
		const ii = skip + i + 1;
		return {
			id: 'ID' + ii,
			goodsName: 'A ' + ii,
			shopName: '小叮当之家',
			price: 100.00 + ii,
			size: ii + ' inch',
			color: ii % 2 ? '原谅绿' : '自然黑',
			selected
		};
	});
}
