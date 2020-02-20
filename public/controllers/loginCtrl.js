app.controller('loginCtrl', function ($scope, $http) {

    $scope.generateCaptcha = function () {
        $scope.captcha = 'http://localhost:3000/captcha';
    };

});