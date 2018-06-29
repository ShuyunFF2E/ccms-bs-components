import styles from './index.scss';

import { Inject } from 'angular-es-utils';
import BaseGrid from './../../grid';

@Inject('$scope', '$ccGrid', '$timeout', '$element')
export default class DetailSelectorGridCtrl extends BaseGrid {
    styles = styles;

    gridWidth = '100%';

    isAllSelected = false;

    includes = [];
    excludes = [];

    get totalPages() {
        const size = this.size;
        const total = this.total;

        return Math.ceil(total / size);
    }

    $onInit() {
        this.initGridOpts(this.columns);
        this.gridOpts.emptyTipTpl = `<div class="${styles.tips}">当前条件未查询到任何数据</div>`;
        this.gridOpts.externalData = this.data.map(this.genDataItem);
    }


    $onChanges(changes) {
        if (changes.data) {
            this.gridOpts.externalData = changes.data.currentValue.map(this.genDataItem);
            this._$ccGrid.refresh(this.gridOpts);
        }
    }


    // 全选
    switchAllSelect() {
        this.conditionState.includes = [];
        this.conditionState.excludes = [];

        this.data.forEach(v => v.selected = this.conditionState.isAllSelected);

        this.calculateSelectedCount();
    }

    // 切换选择
    switchSelect(item) {
        const selected = item.selected;
        const key = item[this.primaryKey];
        if (this.conditionState.isAllSelected) {
            if (selected) {
                removeFromArr(this.conditionState.excludes, key);
            } else {
                addToArr(this.conditionState.excludes, key);
            }
        } else {
            if (selected) {
                addToArr(this.conditionState.includes, key);
            } else {
                removeFromArr(this.conditionState.includes, key);
            }
        }

        this.calculateSelectedCount();
    }

    // 计算已选中的数量
    calculateSelectedCount() {
        // 当前条件已选中数量
        const count = this.conditionState.isAllSelected ?
            (this.total - this.conditionState.excludes.length) :
            this.conditionState.includes.length;

        this.addStatisticCount({ value: count });
    }
    // 计算数据的选中状态
    genDataItem = (item) => {
        const key = item[this.primaryKey];
        if (this.conditionState.isAllSelected) {
            item.selected = this.conditionState.excludes.includes(key) ? false : true;
        } else {
            item.selected = this.conditionState.includes.includes(key) ? true : false;
        }
        return item;
    }

    pageChange(page, size) {
        this.onPageChange({ page, size });
    }

    refresh() {
        this.onRefresh();
    }
}


function addToArr(arr, item) {
    const index = arr.indexOf(item);
    index === -1 && arr.push(item);
}

function removeFromArr(arr, item) {
    const index = arr.indexOf(item);
    index > -1 && arr.splice(index, 1);
}
