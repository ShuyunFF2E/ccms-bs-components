import { isBoolean } from '@/utils';
import dateFormat from 'common-javascript-utils/src/date';

export default class BaseGridCtrl {
    gridWidth = 920;
    fieldParser = {};

    gridOpts = {
        showPagination: false,
        externalData: []
    };

    initGridOpts(columns) {
        this.gridWidth = columns.length * 100 + 50;
        columns.forEach(item => {
            this.fieldParser[item.code] = this.genFieldParser(item);
        });
        this.generateGridColumns(columns);
    }

    // 计算表格的列（因为列是可配的）
    generateGridColumns(columns) {
        this.generateCheckboxGridColumns(columns);
    }

    // // 无选择框
    // generatePlainGridColumns() {
    //     // const headerTpl = `<tr>
    //     // 	${this.columns.map(item => `<th>${item.name||item.code}</th>`).join('')}
    //     // </tr>`;

    //     const columnsDef = this.columns.map(item => {

    //         // this.fieldParser[item.code] = this.genFieldParser(item);

    //         return {
    //             cellTemplate: `<span ng-bind="$ctrl.fieldParser.${item.code}(entity.${item.code})"></span>`,
    //             field: item.code,
    //             displayName: item.name || item.code,
    //             tooltip: item.tooltip
    //         };
    //     });

    //     // this.gridOpts.headerTpl = headerTpl;
    //     this.gridOpts.columnsDef = columnsDef;
    // }

    // // 单选框
    // generateRadioGridColumns(columns) {
    //     const headerTpl = `<tr>
    // 	<th style="width:30px;"></th>
    // 	${columns.map(item => `<th>${item.name||item.code}</th>`).join('')}
    // </tr>`;

    //     const columnsDef = [{
    //         cellTemplate: `<cc-radio ng-model="$ctrl.singleSelectedValue" ng-value="entity.id"></cc-radio>`,
    //         width: '30px'
    //     }].concat(columns.map(item => {

    //         // this.fieldParser[item.code] = this.genFieldParser(item);

    //         return {
    //             cellTemplate: `<span ng-bind="$ctrl.fieldParser.${item.code}(entity.${item.code})"></span>`,
    //             field: item.code,
    //             displayName: item.name || item.code,
    //             tooltip: item.tooltip
    //         };
    //     }));

    //     this.gridOpts.headerTpl = headerTpl;
    //     this.gridOpts.columnsDef = columnsDef;
    // }

    // 多选框
    generateCheckboxGridColumns(columns) {
        const headerTpl = `<tr>
			<th style="width:30px;">
				<cc-checkbox ng-model="$parent.$ctrl.conditionState.isAllSelected" ng-change="$parent.$ctrl.switchAllSelect()" cc-tooltip="'选中当前条件下所有的数据'" tooltip-placement="bottom-left"></cc-checkbox>
			</th>
			${columns.map((item,index) => {
        const width = (index === columns.length - 1) ? (this.gridWidth > 920 ? '150px' : 'unset') : '150px';
        return `<th style="width:${width}">
                    <div class="bs-ellipsis">${item.name||item.code}</div>
                </th>`;
      }).join('')}
		</tr>`;

        const columnsDef = [{
            cellTemplate: `<cc-checkbox ng-model="entity.selected" ng-change="$ctrl.switchSelect(entity)"></cc-checkbox>`,
            width: '30px'
        }].concat(columns.map((item, index) => {

            // this.fieldParser[item.code] = this.genFieldParser(item);

            return {
                cellTemplate: `<div>
                    <span
                    ng-bind="$ctrl.fieldParser.${item.code}(entity.${item.code})"
                    title="{{$ctrl.fieldParser.${item.code}(entity.${item.code})}}"
                    ></span>
                  </div>`,
                field: item.code,
                displayName: item.name || item.code,
                tooltip: item.tooltip,
                width: (index === columns.length - 1) ? (this.gridWidth > 920 ? '150px' : 'unset') : '150px'
            };
        }));

        this.gridOpts.headerTpl = headerTpl;
        this.gridOpts.columnsDef = columnsDef;
    }

    /**
     * 切换全选
     */
    switchAllSelect() {
        console.warn('请实现 switchAllSelect 方法');
    }

    /**
     * 切换选择
     */
    switchSelect() {
        console.warn('请实现 switchSelect 方法');
    }

    /**
     * 计算已选中的数量
     */
    calculateSelectedCount() {
        console.warn('请实现 calculateSelectedCount 方法');
    }


    genFieldParser(field) {

        return value => {

            if (field.dataType === 'boolean') {
                if (!isBoolean(value)) return '';

                return field.dynamicConfigs.find(v => v.descVal === value.toString()).destVal;
            }

            if (field.dataType === 'enum' || field.dataType === 'dict') {
                if (!value) return '';
                return (field.dynamicConfigs.find(v => v.descVal === value) || {}).destVal || value;
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
