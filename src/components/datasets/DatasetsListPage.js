import React, {Component} from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {observer} from "mobx-react";
import UserLayout from "../shared/UserLayout";
import {withStyles} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {Add, Delete, Edit} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {DATASETS_CREATE_PAGE_URL, DATASETS_EDIT_PAGE_URL} from "../../configs/application-urls";
import Button from "@material-ui/core/Button";
import {applicationContext} from "../../services/ApplicationContext";
import TablePagination from "@material-ui/core/TablePagination";
import {PAGINATION_ROWS_PER_PAGE_OPTIONS} from "../../configs/ui";

const css = (theme) => ({
    root: {
        padding: theme.spacing(4),
    }
});

const service = applicationContext.datasetsService;
const uiService = applicationContext.uiService;

@withStyles(css)
@observer
class DatasetsListPage extends Component {
    componentDidMount() {
        service.loadList();
    }

    render() {
        const {classes} = this.props;
        const rows = service.list;

        return <UserLayout>
            <Paper className={classes.root}>
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Add/>}
                    component={Link}
                    to={DATASETS_CREATE_PAGE_URL}
                >
                    Add new
                </Button>
                <TableContainer>
                    <Table aria-label="Datasets list">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Rows</TableCell>
                                <TableCell align="right">Created at</TableCell>
                                <TableCell align="right">Modified at</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow key={row.id}
                                          hover
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.rows}</TableCell>
                                    <TableCell align="right">{new Date(row.createdAt).toLocaleDateString()}</TableCell>
                                    <TableCell align="right">{new Date(row.modifiedAt).toLocaleDateString()}</TableCell>
                                    <TableCell align="center">
                                        <IconButton
                                            component={Link}
                                            to={DATASETS_EDIT_PAGE_URL.replace(":id", row.id)}
                                            aria-label="edit"
                                            color="primary">
                                            <Edit/>
                                        </IconButton>
                                        <IconButton
                                            onClick={() => this.handleDatasetDeleteClick(row.id)}
                                            aria-label="delete"
                                            color="secondary">
                                            <Delete/>
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={PAGINATION_ROWS_PER_PAGE_OPTIONS}
                    component="div"
                    count={service.totalRows}
                    rowsPerPage={service.rowsPerPage}
                    page={service.currentPage}
                    onChangePage={this.handleChangePage}
                    onChangeRowsPerPage={this.handleChangeRowsPerPage}
                />
            </Paper>
        </UserLayout>;
    }

    handleDatasetDeleteClick = async (id) => {
        try {
            await service.delete(id);
            uiService.showSuccessSnackbar({message: "Record successfully deleted!"});
        } catch (e) {
            uiService.showErrorSnackbar({message: "There was a problem while trying to delete record!"});
            console.error(e);
        }

        service.loadList();
    };

    handleChangePage = (event, page) => {
        service.setCurrentPage(page);
        service.loadList();
    };

    handleChangeRowsPerPage = (event) => {
        service.setRowsPerPage(event.target.value);
        service.loadList();
    };
}

export default DatasetsListPage;
