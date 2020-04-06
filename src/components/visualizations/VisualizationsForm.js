import React, {Component} from 'react';
import {PropTypes} from "prop-types";
import {observer} from "mobx-react";
import {Select as MuiSelect, withStyles} from "@material-ui/core";
import {Field, Form, Formik} from "formik";
import {CheckboxWithLabel, Select, TextField} from "formik-material-ui";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import {VISUALIZATIONS_PAGE_URL} from "../../configs/application-urls";
import Grid from "@material-ui/core/Grid";
import {VISUALIZATION} from "../../configs/validation-schemas";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import {applicationContext} from "../../services/ApplicationContext";

const css = (theme) => ({
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: theme.spacing(3),
    },
    button: {
        marginLeft: theme.spacing(1),
    }
});

const service = applicationContext.visualizationsService;
const datasetsService = applicationContext.datasetsService;

const DatasetSelect = ({
                           disabled,
                           field,
                           form: {isSubmitting},
                           ...props
                       }) => {

    const originalOnChange = field.onChange;
    const onChange = (...args) => {
        service.loadVisualizationDatasetHeader(args[0].target.value);

        return originalOnChange(...args);
    };

    return <MuiSelect {...{
        disabled: disabled ?? isSubmitting,
        ...props,
        ...field,
        onChange
    }}/>
};

@withStyles(css)
@observer
class VisualizationsForm extends Component {
    static propTypes = {
        handleSubmit: PropTypes.func.isRequired,
        initialValues: PropTypes.object.isRequired,
    };

    componentDidMount() {
        datasetsService.loadAll();

        const {initialValues} = this.props;

        if (initialValues.dataset) {
            service.loadVisualizationDatasetHeader(initialValues.dataset);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        const {initialValues} = this.props;

        if (prevProps.initialValues === initialValues) {
            return;
        }

        if (initialValues.dataset) {
            service.loadVisualizationDatasetHeader(initialValues.dataset);
        }
    }

    render() {
        const {classes, initialValues} = this.props;
        const datasets = datasetsService.all;
        const datasetHeader = service.datasetHeader;

        return <Formik
            initialValues={initialValues}
            validationSchema={VISUALIZATION}
            onSubmit={this.props.handleSubmit}
            enableReinitialize={true}
            validateOnBlur={false}
        >
            {({isSubmitting}) => (
                <Form noValidate>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={4}>
                            <Field component={TextField}
                                   id="name"
                                   label="Name"
                                   name="name"
                                   autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <FormControl>
                                <InputLabel htmlFor="dataset">Dataset</InputLabel>
                                <Field
                                    component={DatasetSelect}
                                    name="dataset"
                                    inputProps={{
                                        id: "dataset",
                                    }}
                                    autoWidth={true}
                                >
                                    {datasets && datasets.map((dataset) => <MenuItem key={dataset.id} value={dataset.id}>{dataset.name}</MenuItem>)}
                                </Field>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Field
                                color="primary"
                                component={CheckboxWithLabel}
                                type="checkbox"
                                name="showOnDashboard"
                                Label={{label: 'Show on Dashboard?'}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                                <InputLabel htmlFor="xAxis">Column for X Axis</InputLabel>
                                <Field
                                    component={Select}
                                    name="xAxis"
                                    inputProps={{
                                        id: "xAxis",
                                    }}
                                    autoWidth={true}
                                >
                                    {datasetHeader && datasetHeader.map((headerCell) => <MenuItem key={headerCell} value={headerCell}>{headerCell}</MenuItem>)}
                                </Field>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <FormControl>
                                <InputLabel htmlFor="yAxis">Column for Y Axis</InputLabel>
                                <Field
                                    component={Select}
                                    name="yAxis"
                                    inputProps={{
                                        id: "yAxis",
                                    }}
                                    autoWidth={true}
                                >
                                    {datasetHeader && datasetHeader.map((headerCell) => <MenuItem key={headerCell} value={headerCell}>{headerCell}</MenuItem>)}
                                </Field>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Field
                                color="primary"
                                component={CheckboxWithLabel}
                                type="checkbox"
                                name="xAxisAggregateSum"
                                Label={{label: 'Aggregate as SUM on X Axis?'}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Field
                                color="primary"
                                component={CheckboxWithLabel}
                                type="checkbox"
                                name="yAxisAggregateSum"
                                Label={{label: 'Aggregate as SUM on Y Axis?'}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Field
                                color="primary"
                                component={CheckboxWithLabel}
                                type="checkbox"
                                name="xAxisAggregateAvg"
                                Label={{label: 'Aggregate as AVG on X Axis?'}}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Field
                                color="primary"
                                component={CheckboxWithLabel}
                                type="checkbox"
                                name="yAxisAggregateAvg"
                                Label={{label: 'Aggregate as AVG on Y Axis?'}}
                            />
                        </Grid>
                    </Grid>
                    <div className={classes.buttons}>
                        <Button
                            type="submit"
                            color="primary"
                            variant="contained"
                            disabled={isSubmitting}
                        >
                            Save
                        </Button>
                        <Button
                            className={classes.button}
                            variant="contained"
                            component={Link}
                            to={VISUALIZATIONS_PAGE_URL}
                            disabled={isSubmitting}
                        >
                            Go to the list
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>;
    }
}

export default VisualizationsForm;
