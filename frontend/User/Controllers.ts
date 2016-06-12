namespace User.Controllers {
    export class LoginCtrl {
        constructor(private $scope: Scopes.Login,
                    private $location: angular.ILocationService,
                    private $http: angular.IHttpService,
                    private $rootScope: User.Scopes.RootScope) {
            $scope.submit = function () {
                $http.post("/api/user/login", {username: $scope.username, password: $scope.password})
                    .then(function () {
                        $rootScope.loadUser();
                        $location.path('/');
                    }, function (data) {
                        alert("Cannot login; " + data.statusText + ".");
                    });
            };
        }
    }

    export class RegisterCtrl {
        constructor(private $scope: Scopes.Register,
                    private $location: angular.ILocationService,
                    private $http: angular.IHttpService,
                    private $rootScope: User.Scopes.RootScope) {
            $scope.submit = function () {
                var user = {username: $scope.username, password: $scope.password, admin: $scope.admin};
                $http.post("/api/user/register", user)
                    .then(function () {
                        alert('Utilisateur inscrit ! Vous pouvez vous connecter.');
                        $rootScope.user = user;
                        $location.path('/');
                    }, function (data) {
                        alert("Imposible de s'inscrire; " + data.statusText + ".");
                    });
            };
        }
    }
}