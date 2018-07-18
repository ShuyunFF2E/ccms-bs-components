const HOSTS = {
    dcartoon: 'http://ual.dcartoon.saasproj.fenxibao.com/common-component/v1',
    qfish: 'http://ual.qfish.saasproj.fenxibao.com/common-component/v1'
};

(function(angular) {
    angular
        .module('app', ['ccms.components', 'ccms.selector.components'])
        .controller('ctrl', function($scope, $ccTips, $bsSmartDetailSelector) {

            const params = window.Qs.parse(window.location.search.replace('?', ''));

            $scope.id = params.id || '';
            $scope.host = params.host || HOSTS.qfish;
            $scope.token = params.token ? decodeURIComponent(params.token) : '';

            $scope.quickOpen = function() {
                if (!$scope.id) {
                    return $ccTips.error('请填写实例ID');
                }
                if (!$scope.host) {
                    return $ccTips.error('请填写接口域名和服务');
                }
                if (!$scope.token) {
                    return $ccTips.error('请填写接口Token');
                }

                $bsSmartDetailSelector.open({
                    configId: $scope.id,
                    prefix: $scope.host,
                    token: $scope.token
                });
            }

            if ($scope.id && $scope.host && $scope.token) {
                setTimeout(() => {
                    $scope.quickOpen();
                }, 200);
            }


        });
})(window.angular);
