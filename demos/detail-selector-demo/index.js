const HOSTS = {
    dcartoon: 'http://ual.dcartoon.saasproj.fenxibao.com/common-component/v1',
    qfish: 'http://ual.qfish.saasproj.fenxibao.com/common-component/v1'
};

(function(angular) {
    angular
        .module('app', ['ccms.components', 'ccms.bs.components'])
        .controller('ctrl', function($scope, $ccTips, $bsSmartDetailSelector) {

            const params = window.Qs.parse(window.location.search.replace('?', ''));

            $scope.ID = params.ID || '';
            $scope.host = params.host || HOSTS.qfish;
            $scope.token = params.token ? decodeURIComponent(params.token) : '';

            $scope.quickOpen = function() {
                if (!$scope.ID) {
                    return $ccTips.error('请填写实例ID');
                }
                if (!$scope.host) {
                    return $ccTips.error('请填写接口域名和服务');
                }
                if (!$scope.token) {
                    return $ccTips.error('请填写接口Token');
                }

                $bsSmartDetailSelector.open({
                    configId: $scope.ID,
                    prefix: $scope.host,
                    token: $scope.token
                });
            }

            if ($scope.ID && $scope.host && $scope.token) {
                setTimeout(() => {
                    $scope.quickOpen();
                }, 200);
            }


        });
})(window.angular);
