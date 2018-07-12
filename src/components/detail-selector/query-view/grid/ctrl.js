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
        this.initGridOpts(this.columns, 'search');
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
        const searchObj = this.condition.search;
        searchObj.includes = [];
        searchObj.excludes = [];

        this.data.forEach(v => v.selected = searchObj.isAllSelected);

        this.calculateSelectedCount();
    }

    // 切换选择
    switchSelect(item) {
        const searchObj = this.condition.search;
        const resultObj = this.condition.result;
        const selected = item.selected;
        const key = item[this.primaryKey];
        if (searchObj.isAllSelected) {
            if (selected) {
                removeFromArr(searchObj.excludes, key);
                removeFromArr(resultObj.excludes, key);
            } else {
                addToArr(searchObj.excludes, key);
            }
        } else {
            if (selected) {
                addToArr(searchObj.includes, key);
                removeFromArr(resultObj.excludes, key);
            } else {
                removeFromArr(searchObj.includes, key);
            }
        }

        this.calculateSelectedCount();
    }

    // 计算已选中的数量
    calculateSelectedCount() {
        // 当前条件已选中数量
        const searchObj = this.condition.search;
        const count = searchObj.isAllSelected ?
            (this.total - searchObj.excludes.length) :
            searchObj.includes.length;

        this.addStatisticCount({ value: count });
    }

    // 计算数据的选中状态
    genDataItem = (item) => {
        // const searchObj = this.condition.search;
        // const key = item[this.primaryKey];
        // if (searchObj.isAllSelected) {
        //     item.selected = searchObj.excludes.includes(key) ? false : true;
        // } else {
        //     item.selected = searchObj.includes.includes(key) ? true : false;
        // }
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
