(function(angular) {
	angular
		.module('app', ['ccms.bs.components'])
		.controller('ctrl', function($scope, $bsConditionSelector) {

			$scope.open = function() {
				$bsConditionSelector.open({
					title: '条件选择器'
				});
			};

		});
})(window.angular);
