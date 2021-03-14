import React from 'react';
import Employee from './employee';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';

const columns = [
  {
    id: 'id',
    label: 'ID',
    minWidth: 40
  },
  {
    id: 'firstName',
    label: 'First Name',
    minWidth: 90,
    align: 'right'
  },
  {
    id: 'lastName',
    label: 'Last Name',
    minWidth: 90,
    align: 'right'
  },
  {
    id: 'email',
    label: 'Email',
    minWidth: 90,
    align: 'right'
  },
  {
    id: 'jobTitle',
    label: 'Job Title',
    minWidth: 120,
    align: 'right'
  },
  {
    id: 'manager',
    label: 'Manager',
    minWidth: 120,
    align: 'right'
  },
  {
    id: 'delete',
    minWidth: 40
  },
  {
    id: 'edit',
    minWidth: 40
  }
];

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    minWidth: 400,
  },
});

export default function EmployeeList(props) {

  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const rows = [];
  const filterText = props.filterText;
  const employees = props.employees.map(employee =>
    {
      let fullName = employee.firstName.toLowerCase().concat(' ', employee.lastName.toLowerCase());
      if(
        fullName.indexOf(filterText.toLowerCase()) === -1 &&
        employee.jobTitle.toLowerCase().indexOf(filterText.toLowerCase()) === -1 &&
        employee.email.toLowerCase().indexOf(filterText.toLowerCase()) === -1 &&
        employee.id !== parseInt(filterText.toLowerCase())
      ){
        return;
      }
      rows.push(
        <Employee
          attributes={props.attributes}
          key={employee.id}
          employee={employee}
          onDelete={props.onDelete}
          editEmployee={props.onEdit}
          />
      );
    }
  );

  if(rows.length <= page * rowsPerPage && page !== 0){
    setPage(page-1);
  }

  return (
    <Paper className={classes.root}>

      <TableContainer className={classes.container}>

        <Table stickyHeader aria-label="sticky table">

          <TableHead>


            <TableRow>


              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  >


                  {column.label}
                </TableCell>
              ))}
            </TableRow>


          </TableHead>


          <TableBody>

            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                row
              );
            })}
          </TableBody>

        </Table>

      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
        />

    </Paper>
  );
}
