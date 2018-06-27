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
        this.initGridOpts(this.columns);
        this.gridOpts.emptyTipTpl = `<div class="${classes.tips}">暂无数据</div>`;
        this.gridOpts.externalData = this.data;
    }

    $onChanges(changes) {
        if (changes.data) {
            this.gridOpts.externalData = changes.data.currentValue;
            this._$ccGrid.refresh(this.gridOpts);
        }
    }

    pageChange(page, size) {
        console.log(page, size);
        console.log(this.onPageChange({ page, size }));

    }
}
