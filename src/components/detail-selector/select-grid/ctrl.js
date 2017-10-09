import { Inject } from 'angular-es-utils';

@Inject('$scope', '$ccGrid', '$timeout')
export default class DetailSelectorSelectGridCtrl {

	constructor() {
		/**
		 * 是否显示表格
		 * 当需要显示的表格列变化之后重新设置headerTpl不起效果
		 * 所以做一次重新渲染grid组件
		 */
		this.showGrid = true;

		// 全选标记
		this.isAllSelected = false;
		this.gridOpts = {
			showPagination: false,
			emptyTipTpl: `<div class="grid-empty-message">当前条件未查询到任何数据</div>`
		};
	}

	$onInit() {
		this.initGridOpts();
	}

	$onChanges(changes) {
		if (changes.columns) {
			this.generateGridColumns();

			this.rerenderGrid();
		}
	}

	initGridOpts() {
		this.gridOpts.externalData = mockExternalData;

		this.generateGridColumns();
	}

	// 重新渲染 grid 组件
	rerenderGrid() {
		this.showGrid = false;
		this._$timeout(() => {
			this.showGrid = true;
		});
	}

	// 计算表格的列（因为列是可配的）
	generateGridColumns() {
		const headerTpl = `<tr>
			<th style="width:30px;">
				<cc-checkbox ng-model="$parent.$ctrl.isAllSelected" ng-change="$parent.$ctrl.toggleAllSelect()" cc-tooltip="'选中当前条件下所有的数据'"></cc-checkbox>
			</th>
			${this.columns.map(item => `<th>${item.name}</th>`).join('')}
		</tr>`;

		const columnsDef = [{
			cellTemplate: `<cc-checkbox ng-model="entity.selected"></cc-checkbox>`,
			width: '30px'
		}].concat(this.columns.map(item => {
			return { cellTemplate: `<span ng-bind="entity.${item.code}"></span>` };
		}));

		this.gridOpts.headerTpl = headerTpl;
		this.gridOpts.columnsDef = columnsDef;
	}

	// 切换全选
	toggleAllSelect() {
		if (this.isAllSelected) {
			this.gridOpts.externalData.forEach(v => v.selected = true);
		}
	}
}


const mockExternalData = Array(30).fill().map((v, i) => {
	const ii = i + 1;
	return {
		goodsName: 'A ' + ii,
		shopName: '小叮当之家',
		price: 100.00 + ii,
		size: ii + ' inch',
		color: ii % 2 ? '原谅绿' : '自然黑'
	};
});
