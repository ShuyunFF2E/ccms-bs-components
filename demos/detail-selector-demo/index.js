function genCondition(c) {
	return {
		...c,
		name: c.displayName,
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
		name: field.displayName,
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

				const Resource = $resource($scope.host + '/detailSelector/search', {}, {
					post: {
						method: 'POST',
						withCredentials: true,
						headers: {
							Authorization: $scope.token
						}
					}
				});

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
							description: config.helpText,
							conditions: config.commonConditionConfig.map(genCondition),
							extendConditions: config.moreConditionConfig.map(genCondition),
							columns: config.displayColumnConfig.map((c) => genColumns(c, fields)),
							search(params) {
								return Resource.post({
									id: 13,
									...params,
									conditions: params.conditions.map(item => ({ childCond: item }))
								}).$promise;
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
