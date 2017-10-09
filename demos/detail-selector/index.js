(function(angular) {
	angular
		.module('app', ['ccms.bs.components'])
		.controller('ctrl', function($scope, $bsDetailSelector) {

			$scope.open = function() {
				$bsDetailSelector.open({
					uid: 'zdyx2',
					title: '🙂 我就要叫商品选择器怎么了',
					settingModalTitle: '我想叫什么就叫什么',
					settingIconOffsetLeft: '210px'
				});
			};

			setTimeout(function() {
				$bsDetailSelector.open({
					uid: 'zdyx1'
				});
			}, 200);
		});
})(window.angular);
