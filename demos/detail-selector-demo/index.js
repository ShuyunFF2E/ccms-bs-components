function genCondition(c) {
	return {
		...c,
		name: c.displayName,
		code: c.columnName,
		tooltip: c.helpText,
		dataType: c.typeName
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
	dcartoon: 'http://ual.dcartoon.saasproj.fenxibao.com',
	qfish: 'http://ual.qfish.saasproj.fenxibao.com'
};

(function(angular) {
	angular
		.module('app', ['ccms.bs.components'])
		.controller('ctrl', function($scope, $bsDetailSelector, $ccTips) {
			const params = window.Qs.parse(window.location.search.replace('?', ''));

			$scope.ID = params.ID;
			$scope.host = HOSTS[params.env];
			$scope.token = params.token ? decodeURIComponent(params.token) : '';

			$scope.open = function() {

				if (!$scope.ID) {
					return $ccTips.error('请填写实例ID');
				}
				if (!$scope.host) {
					return $ccTips.error('请填写接口域名');
				}
				if (!$scope.token) {
					return $ccTips.error('请填写接口Token');
				}

				getInstanceConfig().then(config => {

					config.commonConditionConfig = config.commonConditionConfig || [];
					config.moreConditionConfig = config.moreConditionConfig || [];
					config.disableConditionConfig = config.disableConditionConfig || [];

					const fields = [
						...config.commonConditionConfig,
						...config.moreConditionConfig,
						...config.disableConditionConfig
					];

					$bsDetailSelector.open({
						uid: $scope.ID,
						title: config.displayName,
						conditions: config.commonConditionConfig.map(genCondition),
						extendConditions: config.moreConditionConfig.map(genCondition),
						columns: config.displayColumnConfig.map((c) => genColumns(c, fields))
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
				return fetch($scope.host + '/common-component/v1/detailSelector/config/' + $scope.ID, {
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
