import { Inject } from 'angular-es-utils';

const InstancesQueue = {};


function genFetch($resource) {
    return (url, token) => {
        return $resource(url, {}, {
            get: {
                method: 'GET',
                withCredentials: true,
                headers: {
                    Authorization: token
                }
            },
            post: {
                method: 'POST',
                withCredentials: true,
                headers: {
                    Authorization: token
                }
            }
        });
    }
}

function genCondition(c) {
    return {
        ...c,
        name: c.displayName || c.columnName,
        code: c.columnName,
        tooltip: c.helpText,
        dataType: c.typeName,
        format: c.styleType
    };
}

function genColumns(c, fields = []) {
    const field = fields.find(f => f.columnName === c.columnName);
    return {
        ...field,
        ...c,
        name: field.displayName || c.columnName,
        code: c.columnName,
        tooltip: c.helpText,
        dataType: field.typeName,
        align: c.align || 'left',
        width: c.width || 150,
        isFullDisplay: c.isFull || false
    };
}


@Inject('$bsDetailSelector', '$resource', '$ccTips')
export default class SmartDetailSelectorService {

    open({
        configId,
        snapshotId,
        isPreview,
        prefix = window.CCMS_INFOS_CONFIG.UAL + '/common-component/v1',
        token
    }) {
        if (!token) {
            const ccmsRequestCredential = JSON.parse(window.localStorage.getItem('ccmsRequestCredential')) || {};
            token = ccmsRequestCredential.token_type + ' ' + ccmsRequestCredential.access_token;
        }

        const fetch = genFetch(this._$resource);

        fetchInstanceConfig({ fetch, token, prefix, configId }).then(res => {

            const fields = [
                ...res.commonConditionConfig,
                ...res.moreConditionConfig,
                ...res.disableConditionConfig
            ];

            this._$bsDetailSelector.open({
                uid: configId,
                title: res.displayName,
                config: {
                    description: res.helpText,
                    advanceSearchAble: res.isAdvancedConfig,
                    primaryKey: res.submitColumn,
                    type: 'multiple',
                    conditions: res.commonConditionConfig.map(genCondition),
                    extendConditions: res.moreConditionConfig.map(genCondition),
                    columns: res.displayColumnConfig.map((c) => genColumns(c, fields)),
                    fetch: genSearchFetch({ fetch, prefix, token, configId }),
                    fetchResult: genResultFetch({ fetch, prefix, token, configId, snapshotId }),
                    submit: genSubmitFetch({ fetch, prefix, token, configId, snapshotId, isPreview })
                }
            });

        }).catch(err => {
            this._$ccTips.error(err.data.message);
        });
    }
}


function fetchInstanceConfig({ fetch, prefix, token, configId }) {
    if (InstancesQueue[configId]) {
        return InstancesQueue[configId];
    }

    const url = `${prefix}/detailSelector/config/${configId}`;
    return InstancesQueue[configId] = fetch(url, token).get().$promise.then(res => {
        res.commonConditionConfig = res.commonConditionConfig || [];
        res.moreConditionConfig = res.moreConditionConfig || [];
        res.disableConditionConfig = res.disableConditionConfig || [];
        res.displayColumnConfig = res.displayColumnConfig || [];
        return res;
    });
}


function genSearchFetch({ fetch, prefix, token, configId }) {
    const url = prefix + '/detailSelector/search';
    return (params) => {
        params.offset = (params.page - 1) * params.size;
        params.limit = params.size;
        delete params.page;
        delete params.size;

        return fetch(url, token).post({
            id: configId,
            ...params,
            conditions: params.conditions.map(item => ({ childCond: item }))
        }).$promise.catch(err => {
            throw new Error(err.data.message);
        });
    };
}


function genResultFetch({ fetch, prefix, token, configId, snapshotId }) {
    const url = prefix + '/detailSelector/select/data';
    return (params) => {
        return fetch(url, token).post({
            id: configId,
            snapshotId,
            offset: (params.page - 1) * params.size,
            limit: params.size,
            searchCondition: params.searchCondition.map(parseSearchCondition),
            additionCondition: params.additionCondition.map(parseAddtionCondition)
        }).$promise.catch(err => {
            throw new Error(err.data.message);
        });
    };
}


function genSubmitFetch({ fetch, prefix, token, configId, snapshotId, isPreview }) {
    if (isPreview) {
        return () => {
            return Promise.reject({ message: '查看模式不能提交查询结果' });
        }
    }

    const url = prefix + '/detailSelector/submit';
    return params => {

        return fetch(url, token).post({
            id: configId,
            snapshotId,
            searchCondition: params.searchCondition.map(parseSearchCondition),
            additionCondition: params.additionCondition.map(parseAddtionCondition)
        }).$promise.catch(err => {
            throw new Error(err.data.message);
        });
    }
}


function parseSearchCondition(item) {
    const condition = {
        isMeet: item.isMeet,
        conditions: item.conditions.map(v => ({ childCond: v }))
    };
    if (item.isAllSelected) {
        condition.isExclude = true;
        condition.ids = item.excludes;
    } else {
        condition.isExclude = false;
        condition.ids = item.includes;
    }
    return condition;
}

function parseAddtionCondition(item) {
    const condition = {};
    if (item.isAllSelected) {
        condition.isExclude = true;
        condition.ids = item.excludes;
    } else {
        condition.isExclude = false;
        condition.ids = item.includes;
    }
    return condition;
}
