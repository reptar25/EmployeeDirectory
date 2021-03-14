import React, {useState} from 'react';
import EditDialog from './edit-dialog';
import Button from '@material-ui/core/Button';
import DeleteDialog from './delete-dialog';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

export default function Employee(props){

	const handleDelete = () => {
		props.onDelete(props.employee);
	}

	const handleEdit = (oldEmployee, newEmployee) => {
	    props.editEmployee(oldEmployee, newEmployee);
	}

  return (
		<TableRow>

			<TableCell align="left">
				{props.employee.id}
			</TableCell>

			<TableCell align="right">
				{props.employee.firstName}
			</TableCell>

			<TableCell align="right">
				{props.employee.lastName}
			</TableCell>

			<TableCell align="right">
				{props.employee.email}
			</TableCell>

			<TableCell align="right">
				{props.employee.jobTitle}
			</TableCell>

			<TableCell align="right">
				{props.employee.manager.name}
			</TableCell>

			<TableCell align="center">

				<DeleteDialog
					employee={props.employee}
					onDelete={props.onDelete}
					onClick={handleDelete} />

			</TableCell >

			<TableCell align="center">

				<EditDialog
					attributes={props.attributes}
					edit={handleEdit}
					employee={props.employee}/>

			</TableCell >

		</TableRow>
  )
}
