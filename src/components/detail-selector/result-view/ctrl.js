import classes from './index.scss';
import { Inject } from 'angular-es-utils';

@Inject('$scope', '$ccTips')
export default class DetailSelectorResultViewCtrl {
    classes = classes;

    params = {
        page: 1,
        size: 10
    };

    total = 0;
    data = [];

    $onInit() {
        this.fetch({ page: 1, size: 10 });
    }

    fetch(params = {}) {
        this.isLoading = true;
        const fetchResult = this.config.fetchResult;
        fetchResult({ ...this.params, ...params }).then(res => {
            this.data = res.data;
            this.total = res.total;
            this.isLoading = false;
            Object.assign(this.params, params);
            this.opts.GlobalConditionObj.statistic = res.total;
        }).catch(err => {
            this.isLoading = false;
            this._$ccTips.error(err.message, {
                duration: 3000,
                container: this._$element[0].querySelector('.modal_body')
            });
        });
    }

    refresh() {
        this.fetch();
    }

    pageChange(page, size) {
        this.fetch({ page, size });
    }

    setStatisticState(statistic) {
        this.opts.statistic = statistic;
    }
}
