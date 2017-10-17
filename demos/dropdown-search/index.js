(function(angular) {
	angular
		.module('app', ['ccms.bs.components'])
		.controller('ctrl', function($scope, $timeout, $interval) {
			const datalist = ['ABC', 'BCD', 'CDE', 'DEF'];

			$scope.dropdown1 = {
				value: 'ABC',
				datalist: datalist.concat('G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'p', 'Q'),
				loading: false,
				clearable: true,
				search(keyword) {
					this.datalist = datalist.filter(v => v.includes(keyword));
					this.loading = true;
					$timeout(() => {
						this.loading = false;
					}, 300);
				}
			};

			$scope.dropdown2 = {
				value: 'BCDE',
				datalist: datalist,
				loading: false,
				search(keyword) {
					this.datalist = datalist.filter(v => v.toLowerCase().includes(keyword.toLowerCase()));
					this.loading = true;
					$timeout(() => {
						this.loading = false;
					}, 300);
				},
				onDropdownOpen() {
					this.datalist = datalist;
				},
				change() {
					console.log(this.value);
				}
			};

			$scope.dropdown3 = {
				value: undefined,
				datalist: datalist,
				disabled: true
			};

			$interval(function() {
				$scope.dropdown3.disabled = !$scope.dropdown3.disabled;
			}, 5000);
		});
})(window.angular);
