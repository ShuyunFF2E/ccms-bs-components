(function(angular) {
    angular
        .module('app', ['ccms.bs.components'])
        .controller('ctrl', function($scope, $bsSmartDetailSelector) {
            const params = window.Qs.parse(window.location.search.replace('?', ''));

            $scope.ID = params.ID || '';
            $scope.host = params.host || HOSTS.qfish;
            $scope.token = params.token ? decodeURIComponent(params.token) : '';

            $scope.open = function() {

                if (!$scope.ID || !$scope.host || !$scope.token) {
                    return $ccTips.error('参数错误');
                }

                $bsSmartDetailSelector.open({
                    configId: $scope.ID,
                    prefix: $scope.host,
                    token: $scope.token,
                    isPreview: true
                });
            };


            setTimeout(() => {
                $scope.open();
            }, 200);

        });
})(window.angular);
