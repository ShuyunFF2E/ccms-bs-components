import classes from './index.scss';
import { Inject } from 'angular-es-utils';

@Inject('$scope', '$ccTips', '$element')
export default class DetailSelectorResultViewCtrl {
    classes = classes;

    params = {
        page: 1,
        size: 10
    };

    total = 0;
    data = [];

    conditionObj = {
        result: {
            isAllSelected: true,
            includes: [],
            excludes: []
        }
    };

    $onInit() {
        const conditions = this.opts.GlobalConditionObj.conditions;
        this.conditionObj = conditions[conditions.length - 1] || this.conditionObj;
        this.fetch({ page: 1, size: 10 });
    }

    fetch(params = {}) {
        this.isLoading = true;
        const fetchResult = this.config.fetchResult;
        const conditionObj = this.opts.GlobalConditionObj.conditions.reduce((v, next) => {
            if (!next.search.isAllSelected && !next.search.includes.length) {
                return v;
            }
            v.search.push(next.search);
            v.result.push(next.result);
            return v;
        }, { search: [], result: [] });

        fetchResult({
            ...this.params,
            ...params,
            searchCondition: conditionObj.search,
            additionCondition: conditionObj.result
        }).then(res => {
            this.data = res.data;
            this.total = res.total;
            this.isLoading = false;
            Object.assign(this.params, params);
            this.opts.GlobalConditionObj.statistic = res.total;
        }).catch(err => {
            this.isLoading = false;
            this._$ccTips.error(err.message, {
                duration: 3000,
                container: this._$element[0].querySelector('.' + classes.container)
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
        this.opts.GlobalConditionObj.statistic = statistic;
    }
}
