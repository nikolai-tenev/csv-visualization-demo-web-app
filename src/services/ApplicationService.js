import {action, computed, observable} from "mobx";
import localforage from "localforage";
import {isEmpty, isPlainObject} from "lodash";
import {BaseService} from "./BaseService";
import {API_URL, USER_LOGIN_URL, USER_REG_URL} from "../configs/api-urls";

/**
 * Class for extended support for HTTP errors.
 */
class HttpError extends Error {
    response;

    constructor(response) {
        super(response.message);
        this.response = response;
    }

    /**
     * Usually thrown when user is not logged in.
     * @returns {boolean}
     */
    get isUnauthorized() {
        return this.response.status === 401 || this.response.status === 403;
    };
}

export class ApplicationService extends BaseService {

    /**
     * User profile.
     * @type {{}}
     */
    @observable
    user = null;

    async init() {
        this.setLoading(true);

        try {
            const user = await localforage.getItem("user");

            this.setUser(user);
        } finally {
            this.setLoading(false);
        }
    }

    @computed
    get accessToken() {
        if (!isEmpty(this.user)) {
            return this.user.jwt;
        }
        return null;
    }

    @computed
    get isAuthenticated() {
        return !isEmpty(this.accessToken);
    }

    @action
    setUser = (user) => {
        this.user = user;
    };

    /**
     * Try to login a user.
     * @param email
     * @param password
     * @returns {Promise<void>}
     */
    login = async ({email, password}) => {
        this.setLoading(true);

        try {
            const response = await this.fetchResource(USER_LOGIN_URL, {
                method: "POST",
                body: {
                    email, password
                }
            });
            const user = await response.json();

            localforage.setItem("user", user);
            this.setUser(user);
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Try to register new user with the platform.
     * @param email
     * @param password
     * @param firstName
     * @param lastName
     * @returns {Promise<Response>}
     */
    register = ({email, password, firstName, lastName}) => {
        this.setLoading(true);

        try {
            return this.fetchResource(USER_REG_URL, {
                method: "POST",
                body: {
                    firstName, lastName, email, password
                }
            });
        } finally {
            this.setLoading(false);
        }
    };

    logout = async () => {
        this.setLoading(true);

        try {
            await localforage.removeItem("user");

            this.setUser(null);
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Perform http request.
     * @param url
     * @param opts
     * @returns {Promise<Response>}
     */
    fetchResource = async (url, opts = {}) => {
        if (!opts.headers) {
            opts.headers = {};
        }

        if (!opts.headers["Authorization"] && this.isAuthenticated) {
            opts.headers["Authorization"] = `Bearer ${this.accessToken}`;
        }

        if (isPlainObject(opts.body)) {
            if (!opts.headers["Content-Type"]) {
                opts.headers["Content-Type"] = "application/json;charset=utf-8";
            }

            opts.body = JSON.stringify(opts.body);
        }

        opts.mode = 'cors';

        const result = await fetch(`${API_URL}${url}`, opts);

        if (result.ok) {
            return result;
        } else {
            const err = new HttpError(await result.json());

            if (err.isUnauthorized) {
                this.logout();
            } else {
                throw err;
            }
        }
    };
}
