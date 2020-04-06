import {action, observable} from "mobx";
import {BaseService} from "./BaseService";
import {PAGINATION_ROWS_PER_PAGE_OPTIONS} from "../configs/ui";

export class BaseCrudService extends BaseService {

    resourceUrl;

    /**
     * How many rows per page will the table show.
     * @type {number}
     */
    @observable
    rowsPerPage = PAGINATION_ROWS_PER_PAGE_OPTIONS[0];

    /**
     * How many rows are there in total.
     * @type {number}
     */
    @observable
    totalRows = 0;

    /**
     * Zero-based index of the current shown page.
     * @type {number}
     */
    @observable
    currentPage = 0;

    /**
     * All items.
     * @type {Array}
     */
    @observable
    all = [];

    /**
     * List of items loaded in a CRUD list.
     * @type {Array}
     */
    @observable
    list = [];

    /**
     * Single item, used in create/edit forms.
     * @type {{}}
     */
    @observable
    single = {};

    @action
    setRowsPerPage = (rowsPerPage) => {
        this.rowsPerPage = rowsPerPage;
    };

    @action
    setTotalRows = (totalRows) => {
        this.totalRows = totalRows;
    };

    @action
    setCurrentPage = (currentPage) => {
        this.currentPage = currentPage;
    };

    @action
    setAll = (all) => {
        this.all = all;
    };

    @action
    setList = (list) => {
        this.list = list;
    };

    @action
    setSingle = (single) => {
        this.single = single;
    };

    /**
     * Load all items.
     * @returns {Promise<void>}
     */
    loadAll = async () => {
        this.setLoading(true);

        try {
            const response = await this.applicationContext.applicationService.fetchResource(this.resourceUrl);
            const results = await response.json();

            this.setAll(results.content);
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Load list of items. Takes into account pagination.
     * @returns {Promise<void>}
     */
    loadList = async () => {
        this.setLoading(true);

        try {
            const response = await this.applicationContext.applicationService.fetchResource(`${this.resourceUrl}?page=${this.currentPage}&size=${this.rowsPerPage}`);
            const pagedResults = await response.json();

            this.setTotalRows(pagedResults.totalElements);
            this.setList(pagedResults.content);
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Load single item by passed id.
     * @param id
     * @returns {Promise<void>}
     */
    loadSingle = async (id) => {
        this.setLoading(true);

        try {
            const response = await this.applicationContext.applicationService.fetchResource(`${this.resourceUrl}/${id}`);
            const item = await response.json();

            this.setSingle(item);
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Save (create or update) a single item.
     * @param values
     * @returns {Promise<any>}
     */
    save = async (values) => {
        this.setLoading(true);
        const id = values.id;
        const url = !!id ? `${this.resourceUrl}/${id}` : `${this.resourceUrl}`;

        try {
            const response = await this.applicationContext.applicationService.fetchResource(url, {
                method: !!id ? "PUT" : "POST",
                body: this.buildBody(values),
            });
            return await response.json();
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Delete a single item.
     * @param id
     * @returns {Promise<void>}
     */
    delete = async (id) => {
        this.setLoading(true);

        try {
            await this.applicationContext.applicationService.fetchResource(`${this.resourceUrl}/${id}`, {
                method: "DELETE"
            });
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * To be overriden if some modifications to the values are needed.
     * @param values
     * @returns {*}
     */
    buildBody(values) {
        return values;
    }
}
