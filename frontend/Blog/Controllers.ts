namespace Blog.Controllers {
    export class ListCtrl {
        constructor(private $scope:Scopes.ListScope,
                    private Article:angular.resource.IResourceClass<Models.Article>) {
            function load() {
                $scope.showForm = false;
                Article.query(function (articles:ng.resource.IResourceArray<Models.Article>) {
                    $scope.articles = articles;
                });
            }

            load();
            $scope.$on('new-article', load);
            $scope.removeArticle = function (idx:number) {
                if ($scope.articles[idx]) {
                    $scope.articles[idx].$delete().then(load);
                } else load();
            };
        }
    }

    export class FormCtrl {
        constructor(private $scope: Scopes.FormScope<Models.FormArticle>,
                    private Article: angular.resource.IResourceClass<Models.Article>) {
            $scope.reset = function () {
                $scope.new = {
                    title: '',
                    content: '',
                };
            };
            $scope.save = function () {
                var article = new Article($scope.new);
                article.$save().then(function () {
                    $scope.reset();
                    $scope.$emit('new-article');
                }, function (data) {
                    alert("Impossible de creer l'article. Raison : " + data.statusText + ".");
                });
            };
        }
    }

    export class ShowCtrl {
        constructor(private $scope: Scopes.ShowScope,
                    private $routeParams: angular.route.IRouteParamsService,
                    private Article: angular.resource.IResourceClass<Models.Article>,
                    private Comment: angular.resource.IResourceClass<Models.Comment>) {
            var id: string = $routeParams['id'];
            function loadComments(cb?: () => void) {
                Comment.query({article_id: id}, function (comments:ng.resource.IResourceArray<Models.Comment>) {
                    $scope.comments = comments;
                    if (cb) {
                        cb();
                    }
                });
            }
            Article.get({id: id}, function (article: Models.Article) {
                $scope.article = article;
                loadComments(function () {
                    $scope.$broadcast('show-loaded');
                });
            });
            $scope.deleteComment = function (idx: number) {
                if ($scope.comments[idx]) {
                    $scope.comments[idx].$delete().then(function () { loadComments(); });
                } else loadComments();
            };
            $scope.$on('reload-comments', function () { loadComments(); });
        }
    }

    export class CommentFormCtrl {
        public constructor(private $scope: Scopes.FormScope<Models.FormComment> & Scopes.ShowScope,
                           private Comment: angular.resource.IResourceClass<Models.Comment>) {
            $scope.reset = function () {
                $scope.new = {
                    content: '',
                    article_id: '',
                };
            };
            $scope.save = function () {
                $scope.new.article_id = $scope.article._id;
                var comment = new Comment($scope.new);
                comment.$save().then(function () {
                    $scope.reset();
                    $scope.$emit('reload-comments');
                });
            };
            $scope.$on('show-loaded', $scope.reset);
        }
    }
}