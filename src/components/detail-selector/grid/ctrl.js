import styles from './index.scss';
import { isBoolean } from '@/utils';
import dateFormat from 'common-javascript-utils/src/date';

import { Inject } from 'angular-es-utils';

@Inject('$scope', '$ccGrid', '$timeout', '$element')
export default class DetailSelectorGridCtrl {
	styles = styles;

	fieldParser = {};

	constructor() {

		/**
		 * 全选标记（多选）
		 */
		this.isAllSelected = false;

		/**
		 * 当前选中的值（单选）
		 */
		this.singleSelectedValue = '';


		this.gridOpts = {
			showPagination: false,
			emptyTipTpl: `<div class="${styles.gridEmptyMessage}">当前条件未查询到任何数据</div>`
		};
		this._$scope.opts = this.opts;

		this._$scope.$watch('opts', (newValue, oldValue) => {
			if (newValue.data !== oldValue.data) {
				this.gridOpts.externalData = this.opts.data;
				this._$ccGrid.refresh(this.gridOpts);
			}
		}, true);
	}

	$onInit() {
		this.initGridOpts();
		this.config.columns.forEach(item => {
			this.fieldParser[item.code] = this.genFieldParser(item);
		});
	}
	onRefresh(opts) {
		console.log(opts);

	}

	initGridOpts() {
		this.gridOpts.externalData = this.opts.data;

		this.generateGridColumns();

	}

	// 计算表格的列（因为列是可配的）
	generateGridColumns() {
		if (this.config.type === 'multiple') {
			this.generateCheckboxGridColumns();
			// this.generatePlainGridColumns();
		} else if (this.config.type === 'single') {
			this.generateRadioGridColumns();
			// this.generatePlainGridColumns();
		} else {
			this.generatePlainGridColumns();
		}
	}

	// 无选择框
	generatePlainGridColumns() {
		// const headerTpl = `<tr>
		// 	${this.columns.map(item => `<th>${item.name||item.code}</th>`).join('')}
		// </tr>`;

		const columnsDef = this.config.columns.map(item => {

			// this.fieldParser[item.code] = this.genFieldParser(item);

			return {
				cellTemplate: `<span ng-bind="$ctrl.fieldParser.${item.code}(entity.${item.code})"></span>`,
				field: item.code,
				displayName: item.name || item.code,
				tooltip: item.tooltip
			};
		});

		// this.gridOpts.headerTpl = headerTpl;
		this.gridOpts.columnsDef = columnsDef;
	}

	// 单选框
	generateRadioGridColumns() {
		const headerTpl = `<tr>
			<th style="width:30px;"></th>
			${this.config.columns.map(item => `<th>${item.name||item.code}</th>`).join('')}
		</tr>`;

		const columnsDef = [{
			cellTemplate: `<cc-radio ng-model="$ctrl.singleSelectedValue" ng-value="entity.id"></cc-radio>`,
			width: '30px'
		}].concat(this.config.columns.map(item => {

			// this.fieldParser[item.code] = this.genFieldParser(item);

			return {
				cellTemplate: `<span ng-bind="$ctrl.fieldParser.${item.code}(entity.${item.code})"></span>`,
				field: item.code,
				displayName: item.name || item.code,
				tooltip: item.tooltip
			};
		}));

		this.gridOpts.headerTpl = headerTpl;
		this.gridOpts.columnsDef = columnsDef;
	}

	// 多选框
	generateCheckboxGridColumns() {
		const headerTpl = `<tr>
			<th style="width:30px;">
				<cc-checkbox ng-model="$parent.$ctrl.isAllSelected" ng-change="$parent.$ctrl.switchAllSelect()" cc-tooltip="'选中当前条件下所有的数据'"></cc-checkbox>
			</th>
			${this.config.columns.map(item => `<th>${item.name||item.code}</th>`).join('')}
		</tr>`;

		const columnsDef = [{
			cellTemplate: `<cc-checkbox ng-model="entity.selected" ng-change="$ctrl.switchSelect()"></cc-checkbox>`,
			width: '30px'
		}].concat(this.config.columns.map(item => {

			// this.fieldParser[item.code] = this.genFieldParser(item);

			return {
				cellTemplate: `<span ng-bind="$ctrl.fieldParser.${item.code}(entity.${item.code})"></span>`,
				field: item.code,
				displayName: item.name || item.code,
				tooltip: item.tooltip
			};
		}));

		this.gridOpts.headerTpl = headerTpl;
		this.gridOpts.columnsDef = columnsDef;
	}

	/**
	 * 切换全选
	 */
	switchAllSelect() {
		this.gridOpts.externalData.forEach(v => v.selected = this.isAllSelected);

		this.calculateSelectedCount();
	}

	/**
	 * 切换选择
	 */
	switchSelect() {
		this.calculateSelectedCount();
	}

	/**
	 * 计算已选中的数量
	 */
	calculateSelectedCount() {
		// 如果未全选，则选中几条算几条
		if (!this.isAllSelected) {
			return this.opts.statistic.selected = this.gridOpts.externalData.filter(item => !!item.selected).length;
		}

		// 如果全选，则为全部数量减去未选中的数量
		const unselected = this.gridOpts.externalData.filter(item => !item.selected);
		this.opts.statistic.selected = this.opts.statistic.total - unselected.length;
	}


	genFieldParser(field) {

		return value => {

			if (field.dataType === 'boolean') {
				if (!isBoolean(value)) return '';

				return field.dynamicConfigs.find(v => v.descVal === value.toString()).destVal;
			}

			if (field.dataType === 'enum') {
				if (!value) return '';
				return (field.dynamicConfigs.find(v => v.descVal === value) || {}).destVal || '';
			}

			if (field.dataType === 'date') {
				if (!value) return '';

				const format = {
					'YMD': 'yyyy-MM-dd',
					'YMDhms': 'yyyy-MM-dd hh:mm:ss',
					'YMDhm': 'yyyy-MM-dd hh:mm',
				}[field.styleType] || 'yyyy-MM-dd hh:mm:ss';
				return dateFormat(new Date(value), format);
			}

			return value;
		}

	}
}
