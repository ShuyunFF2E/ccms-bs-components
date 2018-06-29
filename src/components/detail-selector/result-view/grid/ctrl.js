import classes from './index.scss';

import BaseGrid from './../../grid';
import { Inject } from 'angular-es-utils';

@Inject('$scope', '$ccGrid', '$timeout', '$element')
export default class DetailSelectorResultGrid extends BaseGrid {
    styles = classes;


    get totalPages() {
        const size = this.size;
        const total = this.total;

        return Math.ceil(total / size);
    }

    excludes = [];
    includes = [];

    $onInit() {
        this.isAllSelected = true;
        this.initGridOpts(this.columns);
        this.gridOpts.emptyTipTpl = `<div class="${classes.tips}">暂无数据</div>`;
        this.gridOpts.externalData = this.data.map(this.genDataItem);
    }

    $onChanges(changes) {
        if (changes.data) {
            this.gridOpts.externalData = changes.data.currentValue.map(this.genDataItem);
            this._$ccGrid.refresh(this.gridOpts);
        }
    }

    // 计算数据的选中状态
    genDataItem = (item) => {
        const key = item[this.primaryKey];
        if (this.isAllSelected) {
            item.selected = this.excludes.includes(key) ? false : true;
        } else {
            item.selected = this.includes.includes(key) ? true : false;
        }
        return item;
    }

    pageChange(page, size) {
        this.onPageChange({ page, size });
    }

    refresh() {
        this.onRefresh();
    }

    // 全选
    switchAllSelect() {
        this.includes = [];
        this.excludes = [];

        this.data.forEach(v => v.selected = this.isAllSelected);

        this.calculateSelectedCount();
    }

    // 切换选择
    switchSelect(item) {
        const key = item[this.primaryKey];
        const selected = item.selected;
        if (this.isAllSelected) {
            if (selected) {
                removeFromArr(this.excludes, key);
            } else {
                addToArr(this.excludes, key);
            }
        } else {
            if (selected) {
                addToArr(this.includes, key);
            } else {
                removeFromArr(this.includes, key);
            }
        }

        this.calculateSelectedCount();
    }

    // 计算已选中的数量
    calculateSelectedCount() {
        const selected = this.isAllSelected ? (this.total - this.excludes.length) :
            this.includes.length;

        this.setStatisticState({
            state: selected
        });
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
