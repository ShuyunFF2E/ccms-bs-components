import styles from './index.scss';

import { Inject } from 'angular-es-utils';

import setterCtrl from './setting-modal/ctrl';
import setterTemp from './setting-modal/index.html';

import { getPureCondition } from './utils';

const CONFIG_KEY_PREFIX = 'CCMS_BS_DETAIL_SELECTOR_CONFIG';


@Inject('$rootScope', '$scope', '$ccModal', '$ccTips', '$element', '$timeout', '$q', 'modalInstance')
export default class DetailSelectorCtrl {
    styles = styles;

    MODELS = {
        QUERY: 'QUERY',
        CHECK: 'CHECK'
    };

    constructor() {

        this.cacheKey = `${CONFIG_KEY_PREFIX} - ${this.uid}`;

        this.body = this._$element[0].querySelector('.modal-body');

        // 当前选择器的模式 [QUERY:查询模式, CHECK:查看模式]
        this.model = this.MODELS.QUERY;
    }

    $onInit() {
        const conditionConfig = this.matchLocalConfig();
        // 常用条件
        this.config.conditions = conditionConfig.conditions;
        // 可用搜索条件
        this.config.extendConditions = conditionConfig.extendConditions;

        this.opts = {
            GlobalConditionObj: {
                statistic: 0,
                conditions: []
            }
        };
    }

    matchLocalConfig() {
        // 如果本地缓存中没有配置过则返回原配置
        const localConditionSet = JSON.parse(window.localStorage.getItem(this.cacheKey));
        if (!localConditionSet) {
            return {
                conditions: this.config.conditions,
                extendConditions: this.config.extendConditions
            };
        }

        // 如果本地缓存中的配置项与传入组件的配置不匹配，则返回传入的配置
        const conditionSet = [...this.config.conditions, ...this.config.extendConditions];
        if (conditionSet.map(v => v.code).sort().join(',') !== [...localConditionSet.conditions, ...localConditionSet.extendConditions].sort().join(',')) {
            return {
                conditions: this.config.conditions,
                extendConditions: this.config.extendConditions
            };
        }

        return {
            conditions: localConditionSet.conditions.map(code => conditionSet.find(item => item.code === code)),
            extendConditions: localConditionSet.extendConditions.map(code => conditionSet.find(item => item.code === code))
        };
    }


    // 设置选择器搜索条件以及显示的列表字段
    openSelectorSetter() {
        const scope = this._$rootScope.$new();
        scope.commonZoneMax = this.config.commonZoneMax;
        scope.conditions = this.config.conditions.map(getPureCondition);
        scope.extendConditions = this.config.extendConditions.map(getPureCondition);

        this._$ccModal.modal({
            scope,
            bindings: scope,
            __body: setterTemp,
            controller: setterCtrl,
            title: '搜索条件偏好设置',
            style: { width: '600px', maxWidth: '600px', height: '455px' },
            uid: 'CCMS_BS_DETAIL_SETTING'
        }).open().result.then(({ conditions, extendConditions }) => {
            const conditionSet = [...this.config.conditions, ...this.config.extendConditions];

            this.config.conditions = conditions.map(c => conditionSet.find(v => v.code === c.code));
            this.config.extendConditions = extendConditions.map(c => conditionSet.find(v => v.code === c.code));

            // 将偏好设置保存在本地
            window.localStorage.setItem(this.cacheKey, JSON.stringify({
                conditions: conditions.map(v => v.code),
                extendConditions: extendConditions.map(v => v.code)
            }));
        });
    }


    // 从搜索模式切换到查看已选模式
    // 将最后一次之前的条件做有效性排查
    // 最后一次不处理是因为组件需要保留最后一次的条件状态
    fromQueryToCheck() {
        const { conditions } = this.opts.GlobalConditionObj;
        this.opts.GlobalConditionObj.conditions = conditions.filter((item, index) => {
            if (index === !conditions.length - 1) {
                return true;
            }
            const { search, result } = item;
            if (!search.isAllSelected &&
                !search.includes.length &&
                !result.isAllSelected &&
                !result.includes.length
            ) {
                return false;
            }

            return true;
        });
    }


    // 从查看已选模式切换到搜索模式
    // 如果最后一次查看已选中的全选为非选中值，则之前的条件全部删除
    fromCheckToQuery() {
        const { conditions } = this.opts.GlobalConditionObj;
        if (!conditions.length) return;

        const lastCondition = conditions[conditions.length - 1];

        if (!lastCondition.result.isAllSelected) {
            lastCondition.search.isAllSelected = false;
            conditions.splice(0, conditions.length - 1);


            if (!lastCondition.result.includes.length) {
                lastCondition.search.includes = [];
                lastCondition.search.excludes = [];
            } else {
                lastCondition.search.includes = [...lastCondition.result.includes];
                lastCondition.search.excludes = [];

                lastCondition.result.isAllSelected = true;
                lastCondition.result.includes.length = 0;
            }
        }
    }

    // 组件模式（搜索/查看已选）切换
    onModelChange() {
        if (this.model === this.MODELS.QUERY) {
            this.fromCheckToQueryCallback();
            this.fromCheckToQuery();
        } else {
            this.fromQueryToCheck();
        }
    }

    // 注册组件从查看已选模式到搜索模式的回调
    registerFromCheckToQuery = (callback) => {
        this.fromCheckToQueryCallback = callback;
    }


    submit() {
        this.isSubmiting = false;
        const conditionObj = this.opts.GlobalConditionObj.conditions.reduce((v, next) => {
            v.search.push(next.search);
            v.result.push(next.result);
            return v;
        }, {
            search: [],
            result: []
        });
        return this.config.submit({
            searchCondition: conditionObj.search,
            additionCondition: conditionObj.result
        }).then(res => {
            this.isSubmiting = false;
            return res;
        }).catch(err => {
            this.isSubmiting = false;
            this._$ccTips.error(err.message, {
                duration: 3000,
                container: this._$element[0].querySelector('.' + styles.container)
            });
        });
    }

    ok() {
        this.submit().then(res => {
            this._modalInstance.ok(res);
        });
    }
}
