var blog = angular.module('blog', ['ngResource', 'ngRoute']);

blog.factory('Article', Blog.Factories.Articles);
blog.factory('Comment', Blog.Factories.Comments);
blog.controller('BlogListCtrl', Blog.Controllers.ListCtrl);
blog.controller('BlogFormCtrl', Blog.Controllers.FormCtrl);
blog.controller('BlogCommentFormCtrl', Blog.Controllers.CommentFormCtrl);
blog.controller('BlogShowCtrl', Blog.Controllers.ShowCtrl);
blog.config(function ($routeProvider: angular.route.IRouteProvider) {
    $routeProvider.when('/blog', {
        templateUrl: '/blog/list.html',
        controller: 'BlogListCtrl',
    }).when('/blog/:id', {
        templateUrl: '/blog/show.html',
        controller: 'BlogShowCtrl',
    });
});