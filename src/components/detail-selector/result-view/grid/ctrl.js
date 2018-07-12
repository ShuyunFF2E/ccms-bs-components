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

    $onInit() {
        this.initGridOpts(this.columns, 'result');
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
        const { isAllSelected, includes, excludes } = this.condition.result;
        if (isAllSelected) {
            item.selected = excludes.includes(key) ? false : true;
        } else {
            item.selected = includes.includes(key) ? true : false;
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
        const { isAllSelected, includes, excludes } = this.condition.result;
        includes.length = 0;
        excludes.length = 0;

        this.data.forEach(v => v.selected = isAllSelected);

        this.calculateSelectedCount();
    }

    // 切换选择
    switchSelect(item) {
        const { isAllSelected, includes, excludes } = this.condition.result;

        const key = item[this.primaryKey];
        const selected = item.selected;
        if (isAllSelected) {
            if (selected) {
                removeFromArr(excludes, key);
            } else {
                addToArr(excludes, key);
            }
        } else {
            if (selected) {
                addToArr(includes, key);
            } else {
                removeFromArr(includes, key);
            }
        }

        this.calculateSelectedCount();
    }

    // 计算已选中的数量
    calculateSelectedCount() {
        const { isAllSelected, includes, excludes } = this.condition.result;

        const statistic = isAllSelected ?
            (this.total - excludes.length) :
            includes.length;

        this.setStatisticState({ statistic });
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
