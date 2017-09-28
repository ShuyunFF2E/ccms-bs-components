(function(angular) {
	angular
		.module('app', ['bs.components'])
		.controller('ctrl', function($scope, $bsDetailSelector) {

			$scope.open = function() {
				$bsDetailSelector.open();
			};

		});
})(window.angular);
