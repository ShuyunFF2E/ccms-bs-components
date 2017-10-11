(function(angular) {
	angular
		.module('app', ['ccms.bs.components'])
		.controller('ctrl', function($scope, $bsDetailSelector) {

			$scope.open = function() {
				$bsDetailSelector.open({
					uid: 'zdyx2',
					title: '🙂 我就要叫商品选择器怎么了',
					setter: {
						title: '我想叫什么就叫什么',
						offsetLeft: '210px'
					}
				});
			};

			$scope.open2 = function() {
				$bsDetailSelector.open({
					uid: 'zdyx3',
					title: '🙂 我就要叫商品选择器怎么了',
					setter: false,
					advanceSearch: false
				});
			};

			setTimeout(function() {
				$bsDetailSelector.open({
					uid: 'zdyx1'
				});
			}, 200);
		});
})(window.angular);
