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
import {Delete, Edit} from "@material-ui/icons";
import {Link} from "react-router-dom";
import {DATASETS_EDIT_PAGE_URL} from "../../configs/application-urls";

const css = (theme) => ({
    root: {
        padding: theme.spacing(4),
    }
});

function createData(id, name, rows, createdAt, modifiedAt) {
    return {id, name, rows, createdAt, modifiedAt};
}

const rows = [
    createData(1, 'Dataset 1', 100, "2020-04-01T14:16:41.031Z", "2020-04-01T14:16:41.031Z"),
    createData(2, 'Dataset 2', 500, "2020-04-01T14:16:41.031Z", "2020-04-01T14:16:41.031Z"),
    createData(3, 'Dataset 3', 3000, "2020-04-01T14:16:41.031Z", "2020-04-01T14:16:41.031Z"),
    createData(4, 'Dataset 4', 690, "2020-04-01T14:16:41.031Z", "2020-04-01T14:16:41.031Z"),
    createData(5, 'Dataset 5', 888, "2020-04-01T14:16:41.031Z", "2020-04-01T14:16:41.031Z"),
];

@withStyles(css)
@observer
class DatasetsListPage extends Component {
    render() {
        const {classes} = this.props;

        return <UserLayout>
            <TableContainer className={classes.root} component={Paper}>
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
        </UserLayout>;
    }

    handleDatasetDeleteClick = (id) => {
        alert(id);
    }
}

export default DatasetsListPage;
