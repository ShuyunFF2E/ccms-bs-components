(function(angular) {
	angular
		.module('app', ['ccms.bs.components'])
		.controller('ctrl', function($scope, $timeout) {
			const datalist1 = ['ABC', 'BCD', 'CDE', 'DEF'];

			$scope.dropdown1 = {
				datalist: datalist1,
				loading: false,
				search: function(keyword) {
					this.datalist = datalist1.filter(v => v.includes(keyword));
					this.loading = true;
					$timeout(() => {
						this.loading = false;
					}, 300);
				}
			};
		});
})(window.angular);
