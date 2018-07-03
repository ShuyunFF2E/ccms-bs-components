import styles from './index.scss';
import { Inject } from 'angular-es-utils';
import uuidv4 from 'uuid/v4';

function genDefaultConditionObj(conditions = []) {
    return {
        search: {
            isMeet: true,
            isAllSelected: false,
            conditions,
            includes: [],
            excludes: [],
            statistic: 0
        },
        result: {
            isAllSelected: true,
            includes: [],
            excludes: []
        }
    };
}

@Inject('$scope', '$element')
export default class DetailSelectorQueryViewCtrl {
    styles = styles;

    params = {
        page: 1,
        size: 10,
        isMeet: true,
        conditions: []
    };

    total = 0;
    data = [];

    conditionObj = genDefaultConditionObj();

    $onInit() {
        this.fetch({ page: 1, size: 10 }, true);
    }

    fetch = (params, isNewCondition) => {
        const { GlobalConditionObj } = this.opts;
        const query = { ...this.params, ...params };

        this.isLoading = true;
        return this.config.fetch(query).then(res => {
            this.data = res.data;
            this.total = res.total;
            this.isLoading = false;
            Object.assign(this.params, params);

            if (isNewCondition) {
                this.conditionKey = uuidv4();
                const conditions = query.conditions.map(item => ({ ...item }));
                const conditionObj = genDefaultConditionObj(conditions);
                this.conditionObj = conditionObj;
                GlobalConditionObj.conditions.push(conditionObj);
                this.lastStatisticValue = GlobalConditionObj.statistic;
            }
            window.GlobalConditionObj = GlobalConditionObj.conditions;
        }).catch(err => {
            this.isLoading = false;
            this._$ccTips.error(err.message, {
                container: this._$element[0].querySelector('.' + styles.container),
                duration: 3000
            });
            throw err;
        });
    }

    refresh() {
        this.fetch();
    }

    pageChange(page, size) {
        this.fetch({ page, size });
    }

    // 计算已选中数量
    addStatisticCount(count) {
        const { GlobalConditionObj } = this.opts;
        GlobalConditionObj.statistic = this.lastStatisticValue + count;
    }

}
