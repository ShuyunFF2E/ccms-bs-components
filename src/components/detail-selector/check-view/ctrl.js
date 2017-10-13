import { Inject } from 'angular-es-utils';

@Inject('$scope')
export default class DetailSelectorCheckViewCtrl {
	constructor() {
		this.gridExternalData = [];
	}

	$onInit() {
		// 查看模式不支持选择
		this.opts = { ...this.opts, selectType: false };
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
			} catch (err) {}
		}
	}

	/**
	 * 计算当前需要显示的数据项
	 */
	refreshGridColumns() {
		this.gridColumns = this.config.columns.filter(item => item.selected);
	}

	/**
	 * 请求数据
	 */
	fetchResourceData = () => {
		const extendData = generateResourceData(this.gridExternalData.length, false);
		this.gridExternalData = this.gridExternalData.concat(extendData);

		this.opts.statistic.total = 1000;
	}
}

/**
 * 判断配置项是否改变[columns,conditions,extendConditions]
 * @param {array} current
 * @param {array} previous
 */
function hasArrayChanged(current, previous) {
	const currentStr = current.filter(item => item.selected).map(item => item.code).join(',');
	const previousStr = previous.filter(item => item.selected).map(item => item.code).join(',');

	return currentStr !== previousStr;
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
