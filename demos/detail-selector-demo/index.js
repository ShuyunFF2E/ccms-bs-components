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
        dataType: field.typeName
    };
}

const HOSTS = {
    dcartoon: 'http://ual.dcartoon.saasproj.fenxibao.com/common-component/v1',
    qfish: 'http://ual.qfish.saasproj.fenxibao.com/common-component/v1'
};

(function(angular) {
    angular
        .module('app', ['ccms.bs.components'])
        .controller('ctrl', function($scope, $bsDetailSelector, $ccTips, $resource) {
            const params = window.Qs.parse(window.location.search.replace('?', ''));

            $scope.ID = params.ID || '';
            $scope.host = params.host || HOSTS.qfish;
            $scope.token = params.token ? decodeURIComponent(params.token) : '';

            const resourceParams = {
                post: {
                    method: 'POST',
                    withCredentials: true,
                    headers: {
                        Authorization: $scope.token
                    }
                }
            };

            $scope.open = function() {

                if (!$scope.ID) {
                    return $ccTips.error('请填写实例ID');
                }
                if (!$scope.host) {
                    return $ccTips.error('请填写接口域名和服务');
                }
                if (!$scope.token) {
                    return $ccTips.error('请填写接口Token');
                }

                const searchResource = $resource($scope.host + '/detailSelector/search', {}, resourceParams);
                const resultResource = $resource($scope.host + '/detailSelector/select/data', {}, resourceParams);
                const submitResource = $resource($scope.host + '/detailSelector/submit', {}, resourceParams);

                getInstanceConfig().then(config => {

                    config.commonConditionConfig = config.commonConditionConfig || [];
                    config.moreConditionConfig = config.moreConditionConfig || [];
                    config.disableConditionConfig = config.disableConditionConfig || [];
                    config.displayColumnConfig = config.displayColumnConfig || [];

                    const fields = [
                        ...config.commonConditionConfig,
                        ...config.moreConditionConfig,
                        ...config.disableConditionConfig
                    ];

                    $bsDetailSelector.open({
                        uid: $scope.ID,
                        title: config.displayName,
                        config: {
                            advanceSearchAble: config.isAdvancedConfig,
                            description: config.helpText,
                            conditions: config.commonConditionConfig.map(genCondition),
                            extendConditions: config.moreConditionConfig.map(genCondition),
                            columns: config.displayColumnConfig.map((c) => genColumns(c, fields)),
                            fetch(params) {
                                params.offset = (params.page - 1) * params.size;
                                params.limit = params.size;
                                delete params.page;
                                delete params.size;
                                return searchResource.post({
                                    id: $scope.ID,
                                    ...params,
                                    conditions: params.conditions.map(item => ({ childCond: item }))
                                }).$promise.catch(err => {
                                    throw new Error(err.data.message);
                                });
                            },
                            fetchResult(params) {
                                return resultResource.post({
                                    id: $scope.ID,
                                    snapshotId: 4,
                                    offset: (params.page - 1) * params.size,
                                    limit: params.size,
                                    searchCondition: params.searchCondition.map(parseSearchCondition),
                                    additionCondition: params.additionCondition.map(parseAddtionCondition)
                                }).$promise.then(res => {
                                    return {
                                        data: res.data,
                                        total: res.total
                                    }
                                }).catch(err => {
                                    throw new Error(err.data.message);
                                });
                            },
                            submit(params) {
                                return submitResource.post({
                                    id: $scope.ID,
                                    searchCondition: params.searchCondition.map(parseSearchCondition),
                                    additionCondition: params.additionCondition.map(parseAddtionCondition)
                                }).$promise.then(res => {
                                    return {
                                        data: res.data,
                                        total: res.total
                                    }
                                }).catch(err => {
                                    throw new Error(err.data.message);
                                });
                            }
                        }
                    });
                });
            };


            if ($scope.ID && $scope.host && $scope.token) {
                setTimeout(() => {
                    $scope.open();
                }, 200);
            }

            function getInstanceConfig() {
                $scope.isLoading = true;
                return fetch($scope.host + '/detailSelector/config/' + $scope.ID, {
                    headers: {
                        Authorization: $scope.token
                    }
                }).then(res => {
                    $scope.isLoading = false;
                    if (res.status === 401) {
                        throw new Error('Token已失效');
                    }
                    if (res.status !== 200) {
                        return res.json().then(err => {
                            throw err;
                        });
                    }
                    return res.json();
                }).catch(err => {
                    $scope.isLoading = false;
                    $ccTips.error(err.message);
                    throw err;
                });
            }

        });
})(window.angular);


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
