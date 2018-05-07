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


(function(angular) {
	angular
		.module('app', ['ccms.bs.components'])
		.controller('ctrl', function($scope, $bsDetailSelector, $ccTips) {
			$scope.ID = '';
			$scope.host = 'http://ual.dcartoon.saasproj.fenxibao.com';
			$scope.token = '';

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

					const fields = [
						...config.commonConditionConfig,
						...config.moreConditionConfig,
						...config.disableConditionConfig
					];

					$bsDetailSelector.open({
						uid: $scope.ID,
						title: config.displayName,
						conditions: (config.commonConditionConfig || []).map(genCondition),
						extendConditions: (config.moreConditionConfig || []).map(genCondition),
						columns: (config.displayColumnConfig || []).map((c) => genColumns(c, fields))
					});
				});

			};

			function getInstanceConfig() {
				$scope.isLoading = true;
				return fetch($scope.host + '/common-component/v1/detailSelector/config/' + $scope.ID, {
					headers: {
						Authorization: $scope.token
					}
				}).then(res => {
					$scope.isLoading = false;
					return res.json();
				}).catch(err => {
					$scope.isLoading = false;
					$ccTips.error(err.message);
				});
			}

		});
})(window.angular);
