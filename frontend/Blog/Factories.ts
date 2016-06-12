namespace Blog.Factories {
    export function Articles($resource: angular.resource.IResourceService) {
        return $resource<Models.Article>("/api/articles/:id", {"id": "@_id"});
    }

    export function Comments($resource: angular.resource.IResourceService) {
        return $resource<Models.Comment>("/api/articles/:article_id/comments/:id",
            {"article_id": "@article_id", "id": "@_id"}
        );
    }
}