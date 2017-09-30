(function(angular) {
	angular
		.module('app', ['ccms.bs.components'])
		.controller('ctrl', function($scope, $bsDetailSelector) {

			$scope.open = function() {
				$bsDetailSelector.open();
			};

		});
})(window.angular);
