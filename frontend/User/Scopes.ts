namespace User.Scopes {
    export interface Login extends ng.IScope {
        username: string;
        password: string;

        submit: () => void;
    }

    export interface Register extends ng.IScope {
        username: string;
        password: string;
        admin: boolean;

        submit: () => void;
    }

    export interface RootScope extends angular.IRootScopeService {
        user?: Models.User;

        loadUser: () => void;
    }
}