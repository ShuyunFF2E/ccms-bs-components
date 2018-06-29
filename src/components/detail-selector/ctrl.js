import styles from './index.scss';

import { Inject } from 'angular-es-utils';

import setterCtrl from './setting-modal/ctrl';
import setterTemp from './setting-modal/index.html';

import { getPureCondition } from './utils';

const CONFIG_KEY_PREFIX = 'CCMS_BS_DETAIL_SELECTOR_CONFIG';


@Inject('$rootScope', '$scope', '$ccModal', '$ccTips', '$element', '$timeout', '$q', 'modalInstance')
export default class DetailSelectorCtrl {
    styles = styles;

    constructor() {

        this.cacheKey = `${CONFIG_KEY_PREFIX} - ${this.uid}`;

        this.body = this._$element[0].querySelector('.modal-body');

        // 当前选择器的模式 [QUERY:查询模式, CHECK:查看模式]
        this.model = 'QUERY';
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
                conditions: Object.create(null),
                checkModel: {
                    isAllSelected: false,
                    includes: [],
                    excludes: []
                }
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

    // 切换至查看视图
    switchToCheckView = () => {
        this.model = 'CHECK';
    }

    // 切换至查询视图
    switchToQueryView = () => {
        this.model = 'QUERY';
    }
}
