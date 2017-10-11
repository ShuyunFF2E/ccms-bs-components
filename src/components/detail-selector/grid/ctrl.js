import jQuery from 'jquery';

import throttle from '@/utils/throttle';

import { Inject } from 'angular-es-utils';

@Inject('$scope', '$ccGrid', '$timeout', '$element')
export default class DetailSelectorGridCtrl {

	constructor() {
		/**
		 * 是否显示表格
		 * 当需要显示的表格列变化之后重新设置headerTpl不起效果
		 * 所以做一次重新渲染grid组件
		 */
		this.showGrid = true;

		/**
		 * 全选标记（多选）
		 */
		this.isAllSelected = false;

		/**
		 * 当前选中的值（单选）
		 */
		this.singleSelectedValue = '';

		/**
		 * 正在加载下一页数据
		 */
		this.isLazyLoading = false;


		this.gridOpts = {
			showPagination: false,
			emptyTipTpl: `<div class="grid-empty-message">当前条件未查询到任何数据</div>`
		};
	}

	$onInit() {
		this.initGridOpts();

		this.initLazyLoad();

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
		if (this.type === 'multiple') {
			this.generateCheckboxGridColumns();
		} else if (this.type === 'single') {
			this.generateRadioGridColumns();
		} else {
			this.generatePlainGridColumns();
		}
	}

	// 无选择框
	generatePlainGridColumns() {
		const headerTpl = `<tr>
			${this.columns.map(item => `<th>${item.name}</th>`).join('')}
		</tr>`;

		const columnsDef = this.columns.map(item => {
			return { cellTemplate: `<span ng-bind="entity.${item.code}"></span>` };
		});

		this.gridOpts.headerTpl = headerTpl;
		this.gridOpts.columnsDef = columnsDef;
	}

	// 单选框
	generateRadioGridColumns() {
		const headerTpl = `<tr>
			<th style="width:30px;"></th>
			${this.columns.map(item => `<th>${item.name}</th>`).join('')}
		</tr>`;

		const columnsDef = [{
			cellTemplate: `<cc-radio ng-model="$ctrl.singleSelectedValue" ng-value="entity.id"></cc-radio>`,
			width: '30px'
		}].concat(this.columns.map(item => {
			return { cellTemplate: `<span ng-bind="entity.${item.code}"></span>` };
		}));

		this.gridOpts.headerTpl = headerTpl;
		this.gridOpts.columnsDef = columnsDef;
	}

	// 多选框
	generateCheckboxGridColumns() {
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

	/**
	 * 滚动至底部自动加载下一页数据
	 */
	initLazyLoad() {
		const $element = jQuery(this._$element[0]);

		function mousewheel(event) {
			const $this = jQuery(event.currentTarget);
			// 可见高度
			const viewH = $this.height();
			// 内容高度
			const contentH = $this.get(0).scrollHeight;
			// 滚动高度
			const scrollTop = $this.scrollTop();

			if (contentH - viewH - scrollTop <= 100) {
				if (this.isLazyLoading) return;

				this._$timeout(() => {
					this.isLazyLoading = true;
					this.gridOpts.loading = true;

					this._$timeout(() => {
						this.isLazyLoading = false;
						this.gridOpts.externalData = this.gridOpts.externalData.concat(generateResourceData(this.gridOpts.externalData.length));
						this._$ccGrid.refresh(this.gridOpts);
					}, 500);

				});
			}
		}

		$element.on('mousewheel', '.datalist', throttle(mousewheel, 50, this));
	}
}


const mockExternalData = generateResourceData(0);

function generateResourceData(skip) {
	return Array(20).fill().map((v, i) => {
		const ii = skip + i + 1;
		return {
			id: 'ID' + ii,
			goodsName: 'A ' + ii,
			shopName: '小叮当之家',
			price: 100.00 + ii,
			size: ii + ' inch',
			color: ii % 2 ? '原谅绿' : '自然黑'
		};
	});
}
