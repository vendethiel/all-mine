/// <reference path='../typings/index.d.ts' />

var app = angular.module('app', ['blog', 'user']);
app.config(function ($routeProvider: angular.route.IRouteProvider, $locationProvider: angular.ILocationProvider) {
    // default route
    $routeProvider.otherwise({redirectTo: '/blog'});

    $locationProvider.html5Mode(true);
});