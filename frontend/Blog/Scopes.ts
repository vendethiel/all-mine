namespace Blog.Scopes {
    export interface ListScope extends ng.IScope {
        articles: ng.resource.IResourceArray<Models.Article>;
        showForm: boolean;
        removeArticle: (idx: Number) => void;
    }

    export interface FormScope<T> extends ng.IScope {
        save: () => void;
        reset: () => void;
        new: T;
    }

    export interface ShowScope extends ng.IScope {
        article: Models.Article;
        comments: ng.resource.IResourceArray<Models.Comment>;
        deleteComment: (idx: number) => void;
    }
}