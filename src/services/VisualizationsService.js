import {VISUALIZATIONS_CHART_DATA_URL, VISUALIZATIONS_DASHBOARD_URL, VISUALIZATIONS_DATASET_HEADER_URL, VISUALIZATIONS_URL} from "../configs/api-urls";
import {BaseCrudService} from "./BaseCrudService";
import {action, observable} from "mobx";

export class VisualizationsService extends BaseCrudService {

    @observable
    datasetHeader;

    @observable
    chartData = {};

    @observable
    dashboardVisualizations = [];

    /**
     * Sets the url for the resource this service works with.
     * @param applicationContext
     */
    constructor(applicationContext) {
        super(applicationContext);

        this.resourceUrl = VISUALIZATIONS_URL;
    }

    @action
    setDatasetHeader = (datasetHeader) => {
        this.datasetHeader = datasetHeader;
    };

    @action
    setChartData = (id, chartData) => {
        this.chartData[id] = chartData;
    };

    @action
    setDashboardVisualizations = (dashboardVisualizations) => {
        this.dashboardVisualizations = dashboardVisualizations;
    };

    /**
     * Load the dataset's header row.
     * @param datasetId
     * @returns {Promise<void>}
     */
    loadVisualizationDatasetHeader = async (datasetId) => {
        this.setLoading(true);

        try {
            const response = await this.applicationContext.applicationService.fetchResource(`${this.resourceUrl}${VISUALIZATIONS_DATASET_HEADER_URL.replace("{id}", datasetId)}`);
            const header = await response.json();

            this.setDatasetHeader(header);
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Load chart data for a visualization.
     * @param id
     * @returns {Promise<void>}
     */
    loadVisualizationChartData = async (id) => {
        this.setLoading(true);

        try {
            const response = await this.applicationContext.applicationService.fetchResource(`${this.resourceUrl}/${id}${VISUALIZATIONS_CHART_DATA_URL}`);
            const chartData = await response.json();

            this.setChartData(id, chartData);
        } finally {
            this.setLoading(false);
        }
    };

    /**
     * Loads a list of all visualizations to be shown on the dashboard.
     * @returns {Promise<void>}
     */
    loadDashboardVisualizations = async () => {
        this.setLoading(true);

        try {
            const response = await this.applicationContext.applicationService.fetchResource(`${this.resourceUrl}${VISUALIZATIONS_DASHBOARD_URL}`);
            const results = await response.json();

            this.setDashboardVisualizations(results);
        } finally {
            this.setLoading(false);
        }
    };
}
