var user = angular.module('user', ['ngResource', 'ngRoute']);

user.controller('UserLoginCtrl', User.Controllers.LoginCtrl);
user.controller('UserRegisterCtrl', User.Controllers.RegisterCtrl);
user.config(function ($routeProvider: angular.route.IRouteProvider) {
    $routeProvider.when('/user/login', {
        templateUrl: '/user/login.html',
        controller: 'UserLoginCtrl',
    }).when('/user/register', {
        templateUrl: '/user/register.html',
        controller: 'UserRegisterCtrl',
    });
});

user.run(function (
    $rootScope: User.Scopes.RootScope,
    $http: angular.IHttpService
) {
    $rootScope.loadUser = function () {
        $http.get('/api/user/current', {}).then(function (data:{data?:User.Models.User}) {
            $rootScope.user = data.data;
        });
    }
    $rootScope.$on("$routeChangeStart", function (/*event, currRoute, prevRoute*/) {
        // fetching will return null
        if ($rootScope.user !== undefined) return;
        $rootScope.loadUser();
    })
});