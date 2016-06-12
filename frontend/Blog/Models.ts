namespace Blog.Models {
    export class Article {
        constructor(
            public title: string,
            public content: string,
            public date: number,
            public user_id: string,
            public _id?: string
    ) {}
    }

    export class Comment {
        constructor(
            content: String,
            user_id: String,
            article_id: String
        ) {}
    }

    export class FormArticle {
        constructor(
            public title: string,
            public content: string
        ) {}
    }

    export class FormComment {
        constructor(
            public content: string,
            public article_id: string
        ) {}
    }
}